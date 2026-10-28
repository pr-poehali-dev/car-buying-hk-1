"""Poehali function for OptiAI's custom connector and public blog storage.

The only public POST entry point is proxied by the site's /api/optiai route.
All writes require a channel-specific secret. GET exposes only published data.
"""

import base64
import hashlib
import hmac
import http.client
import ipaddress
import json
import os
import re
import socket
import ssl
from urllib.parse import urlsplit
from urllib.request import build_opener, HTTPRedirectHandler, Request

import bleach
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import Json, RealDictCursor


SCHEMA = "t_p43245144_car_buying_hk_1"
SITE = "https://avtovykupkhb27.ru"
SLUG = re.compile(r"^[a-z0-9](?:[a-z0-9-]{0,118}[a-z0-9])?$")
CAPABILITIES = [
    "seo_meta", "canonical", "open_graph", "schema_org", "inline_images",
    "cover_images", "seo_event_repair", "seo_head_runtime",
    "seo_runtime_diagnostics", "picture_alt", "article_content_api", "dry_run",
]
ALLOWED_TAGS = set(bleach.sanitizer.ALLOWED_TAGS) | {
    "article", "section", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr", "img", "figure", "figcaption", "table", "thead",
    "tbody", "tr", "th", "td", "ul", "ol", "li", "blockquote", "pre",
    "code", "strong", "em", "b", "i", "small", "sup", "sub", "mark",
    "details", "summary", "a",
}
ALLOWED_ATTRIBUTES = {
    "*": ["class", "id", "title", "aria-label", "data-benefits-block", "data-case-block"],
    "a": ["href", "title", "rel", "target", "class", "id"],
    "img": ["src", "alt", "width", "height", "loading", "class", "id"],
    "th": ["scope", "colspan", "rowspan", "class", "id"],
    "td": ["colspan", "rowspan", "class", "id"],
}


def response(status, data):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"},
        "body": json.dumps(data, ensure_ascii=False, default=str),
        "isBase64Encoded": False,
    }


def read_body(event):
    body = event.get("body") or ""
    if event.get("isBase64Encoded"):
        body = base64.b64decode(body, validate=True)
    if isinstance(body, str):
        body = body.encode("utf-8")
    if len(body) > 6 * 1024 * 1024:
        raise ValueError("request_too_large")
    value = json.loads(body)
    if not isinstance(value, dict):
        raise ValueError("invalid_json")
    return value


def require_auth(data):
    token = data.get("token")
    configured = os.environ.get("OPTIAI_CONNECTOR_TOKEN", "")
    if not isinstance(token, str) or not configured or not hmac.compare_digest(token, configured):
        return False
    return data.get("iblock_id") == "blog"


def validate(data):
    slug = data.get("slug")
    if not isinstance(slug, str) or not SLUG.fullmatch(slug):
        raise ValueError("invalid_slug")
    for key, maxlen in (("title", 300), ("html", 4 * 1024 * 1024), ("excerpt", 1000), ("image_alt", 500)):
        value = data.get(key, "")
        if not isinstance(value, str) or len(value.encode("utf-8")) > maxlen:
            raise ValueError("invalid_" + key)
    if not data.get("title") or not data.get("html"):
        raise ValueError("missing_article")
    seo = data.get("seo") or {}
    if not isinstance(seo, dict):
        raise ValueError("invalid_seo")
    for key in ("title", "description", "focus_keyword", "robots", "image"):
        if key in seo and (not isinstance(seo[key], str) or len(seo[key]) > 1000):
            raise ValueError("invalid_seo")
    images = data.get("inline_images") or []
    if not isinstance(images, list) or len(images) > 30 or any(not isinstance(u, str) for u in images):
        raise ValueError("invalid_images")
    html_images = [tag.get("src") for tag in BeautifulSoup(data["html"], "html.parser").find_all("img")]
    if len(html_images) > 30 or any(not isinstance(u, str) for u in html_images):
        raise ValueError("invalid_html_images")
    images = list(dict.fromkeys([*images, *html_images]))
    cover = data.get("image_url") or seo.get("image")
    if not isinstance(cover, str) or not cover:
        raise ValueError("missing_cover")
    for url in [cover, *images]:
        validate_media_url(url)
    return slug, seo, cover, images


def validate_media_url(url):
    if any(ord(char) < 32 or ord(char) == 127 for char in url):
        raise ValueError("invalid_media_url")
    parsed = urlsplit(url)
    hosts = {h.strip().lower() for h in os.environ.get("OPTIAI_MEDIA_HOSTS", "optiai.ru").split(",") if h.strip()}
    if (parsed.scheme != "https" or not parsed.hostname or parsed.hostname.lower() not in hosts
            or parsed.port not in (None, 443) or parsed.username or parsed.password
            or parsed.fragment or len(url) > 2000):
        raise ValueError("untrusted_media_url")
    return parsed


def download_media(url):
    parsed = validate_media_url(url)
    answers = socket.getaddrinfo(parsed.hostname, 443, type=socket.SOCK_STREAM)
    ips = list(dict.fromkeys(answer[4][0] for answer in answers))
    if not ips or any(not ipaddress.ip_address(ip).is_global for ip in ips):
        raise ValueError("unsafe_media_dns")
    conn = http.client.HTTPSConnection(parsed.hostname, timeout=10, context=ssl.create_default_context())
    chosen = ips[0]

    def pinned_connect():
        raw = socket.create_connection((chosen, 443), timeout=10)
        conn.sock = conn._context.wrap_socket(raw, server_hostname=parsed.hostname)

    conn.connect = pinned_connect
    try:
        path = parsed.path or "/"
        if parsed.query:
            path += "?" + parsed.query
        conn.request("GET", path, headers={"Host": parsed.hostname, "Accept-Encoding": "identity"})
        res = conn.getresponse()
        if res.status != 200:
            raise ValueError("media_unavailable")
        mime = (res.getheader("Content-Type") or "").split(";", 1)[0].lower()
        if mime not in ("image/jpeg", "image/png", "image/webp"):
            raise ValueError("invalid_media_type")
        content = res.read(8 * 1024 * 1024 + 1)
        if len(content) > 8 * 1024 * 1024 or not content:
            raise ValueError("invalid_media_size")
        signatures = {
            "image/jpeg": content.startswith(b"\xff\xd8\xff"),
            "image/png": content.startswith(b"\x89PNG\r\n\x1a\n"),
            "image/webp": content.startswith(b"RIFF") and content[8:12] == b"WEBP",
        }
        if not signatures[mime]:
            raise ValueError("invalid_media_bytes")
        return content, mime
    finally:
        conn.close()


def store_media(cur, url):
    content, mime = download_media(url)
    digest = hashlib.sha256(content).hexdigest()
    cur.execute(
        f"INSERT INTO {SCHEMA}.optiai_blog_media (sha256, mime, bytes) VALUES (%s, %s, %s) "
        "ON CONFLICT (sha256) DO UPDATE SET sha256=EXCLUDED.sha256 RETURNING id",
        (digest, mime, psycopg2.Binary(content)),
    )
    return cur.fetchone()[0]


def render_article(source, media_urls):
    soup = BeautifulSoup(source, "html.parser")
    for tag in soup.find_all("img"):
        src = tag.get("src")
        if src in media_urls:
            tag["src"] = f"/blog/media/{media_urls[src]}"
            if not tag.get("alt"):
                tag["alt"] = "Иллюстрация к статье"
        else:
            tag.decompose()
    cleaner = bleach.Cleaner(tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES,
                             protocols=["https", "http", "mailto", "tel"],
                             strip=True, strip_comments=False)
    return cleaner.clean(str(soup))


def extract_faq(source):
    soup = BeautifulSoup(source, "html.parser")
    result = []
    heading = soup.find(lambda tag: tag.name in ("h2", "h3") and "частые вопросы" in tag.get_text(" ", strip=True).lower())
    if heading:
        for node in heading.next_elements:
            if getattr(node, "name", None) == "h2":
                break
            if getattr(node, "name", None) in ("h3", "h4"):
                answer = node.find_next_sibling(["p", "div"])
                if answer:
                    result.append({"q": node.get_text(" ", strip=True)[:300], "a": answer.get_text(" ", strip=True)[:2000]})
            if len(result) >= 20:
                break
    return result


def log_error(stage, exc):
    print("optiai-blog error stage=%s type=%s pgcode=%s" % (stage, type(exc).__name__, getattr(exc, "pgcode", None)))


def connect():
    return psycopg2.connect(os.environ["DATABASE_URL"], connect_timeout=5)


def table_ready(cur):
    try:
        cur.execute(f"SELECT 1 FROM {SCHEMA}.optiai_blog_media LIMIT 1")
        cur.fetchall()
        cur.execute(f"SELECT 1 FROM {SCHEMA}.optiai_blog_articles LIMIT 1")
        cur.fetchall()
    except psycopg2.Error as exc:
        log_error("table_ready", exc)
        cur.connection.rollback()
        return False
    return True


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, msg, headers, newurl):
        return None


def public_check(path, expected):
    try:
        with build_opener(NoRedirect).open(Request(SITE + path, headers={"Accept-Encoding": "identity"}), timeout=5) as res:
            return res.status == 200 and expected in res.read(100000).decode("utf-8", errors="replace")
    except Exception:
        return False


def article_url(slug):
    return f"{SITE}/blog/{slug}"


def handle_post(data):
    if not require_auth(data):
        return response(403, {"success": False})
    action = data.get("action") or "publish"
    if action == "capabilities":
        return response(200, {"success": True, "connector_version": "2.5.0",
                              "seo_module": True, "seo_module_version": "1.4.0",
                              "seo_event_ready": True, "capabilities": CAPABILITIES})
    if action == "diagnostics":
        try:
            with connect() as conn, conn.cursor() as cur:
                ready = table_ready(cur)
            robots = public_check("/robots.txt", "/blog/sitemap.xml")
            sitemap = public_check("/sitemap.xml", "<urlset") and public_check("/blog/sitemap.xml", "<urlset")
            blog = public_check("/blog", "Блог")
            return response(200, {"success": True, "https": True,
                                  "data_root_ready": ready, "blog_root_ready": ready and blog,
                                  "robots_ready": robots, "sitemap_ready": sitemap})
        except Exception as exc:
            log_error("diagnostics", exc)
            return response(503, {"success": False, "error": "storage_unavailable"})
    if action in ("publish", "dry_run"):
        slug, seo, cover, images = validate(data)
        if action == "dry_run":
            with connect() as conn, conn.cursor() as cur:
                if not table_ready(cur):
                    return response(503, {"success": False, "error": "storage_unavailable"})
            return response(200, {"success": True, "dry_run": True, "accepted": True, "stored": False})
        with connect() as conn, conn.cursor() as cur:
            if not table_ready(cur):
                return response(503, {"success": False, "error": "storage_unavailable"})
            ids = {url: store_media(cur, url) for url in dict.fromkeys([cover, *images])}
            rendered = render_article(data["html"], ids)
            digest = hashlib.sha256(data["html"].encode("utf-8")).hexdigest()
            cur.execute(
                f"INSERT INTO {SCHEMA}.optiai_blog_articles "
                "(slug, title, excerpt, html, render_html, html_sha256, seo, cover_media_id, image_alt, media_map, faq) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) ON CONFLICT (slug) DO UPDATE SET "
                "title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, html=EXCLUDED.html, "
                "render_html=EXCLUDED.render_html, html_sha256=EXCLUDED.html_sha256, "
                "seo=EXCLUDED.seo, cover_media_id=EXCLUDED.cover_media_id, "
                "image_alt=EXCLUDED.image_alt, media_map=EXCLUDED.media_map, "
                "faq=EXCLUDED.faq, updated_at=now() RETURNING id",
                (slug, data["title"], data.get("excerpt", ""), data["html"], rendered,
                 digest, Json(seo), ids[cover], data.get("image_alt", ""), Json(ids),
                 Json(extract_faq(data["html"]))),
            )
            article_id = cur.fetchone()[0]
        return response(200, {"success": True, "id": article_id, "url": article_url(slug),
                              "cover_ready": True, "preview_picture_id": ids[cover],
                              "detail_picture_id": ids[cover]})
    if action in ("get_article", "update_article"):
        article_id = data.get("element_id") or data.get("id") or None
        if isinstance(article_id, str) and article_id.isdigit():
            article_id = int(article_id)
        slug = data.get("slug") or None
        if not (isinstance(article_id, int) and article_id > 0) and not (isinstance(slug, str) and SLUG.fullmatch(slug)):
            raise ValueError("invalid_article")
        with connect() as conn, conn.cursor() as cur:
            cur.execute(f"SELECT id, slug, html, media_map FROM {SCHEMA}.optiai_blog_articles "
                        "WHERE (%s IS NULL OR id=%s) AND (%s IS NULL OR slug=%s)",
                        (article_id, article_id, slug, slug))
            row = cur.fetchone()
            if not row:
                return response(404, {"success": False, "error": "not_found"})
            if action == "update_article":
                new_html = data.get("html")
                if not isinstance(new_html, str) or not new_html or len(new_html.encode("utf-8")) > 4 * 1024 * 1024:
                    raise ValueError("invalid_html")
                rendered = render_article(new_html, row[3] or {})
                cur.execute(f"UPDATE {SCHEMA}.optiai_blog_articles SET html=%s, render_html=%s, "
                            "html_sha256=%s, updated_at=now() WHERE id=%s",
                            (new_html, rendered, hashlib.sha256(new_html.encode("utf-8")).hexdigest(), row[0]))
                row = (row[0], row[1], new_html)
        return response(200, {"success": True, "id": row[0], "url": article_url(row[1]), "html": row[2]})
    return response(400, {"success": False, "error": "unknown_action"})


def handle_get(event):
    query = event.get("queryStringParameters") or {}
    mode = query.get("mode", "")
    with connect() as conn, conn.cursor(cursor_factory=RealDictCursor) as cur:
        if mode == "list":
            page = max(1, min(int(query.get("page", 1)), 1000))
            cur.execute(f"SELECT id, slug, title, excerpt, seo, cover_media_id, image_alt, created_at, updated_at "
                        f"FROM {SCHEMA}.optiai_blog_articles ORDER BY created_at DESC LIMIT 20 OFFSET %s", ((page - 1) * 20,))
            rows = cur.fetchall()
            cur.execute(f"SELECT COUNT(*) AS count FROM {SCHEMA}.optiai_blog_articles")
            count = cur.fetchone()["count"]
            return response(200, {"success": True, "articles": rows, "total": count, "page": page})
        if mode == "article":
            slug = query.get("slug", "")
            if not SLUG.fullmatch(slug):
                return response(404, {"success": False})
            cur.execute(f"SELECT id, slug, title, excerpt, render_html, seo, cover_media_id, image_alt, faq, "
                        f"created_at, updated_at FROM {SCHEMA}.optiai_blog_articles WHERE slug=%s", (slug,))
            row = cur.fetchone()
            return response(200, {"success": True, "article": row}) if row else response(404, {"success": False})
        if mode == "media":
            media_id = query.get("id", "")
            if not str(media_id).isdigit():
                return response(404, {"success": False})
            cur.execute(f"SELECT bytes, mime FROM {SCHEMA}.optiai_blog_media WHERE id=%s", (int(media_id),))
            row = cur.fetchone()
            if not row:
                return response(404, {"success": False})
            return {"statusCode": 200, "headers": {"Content-Type": row["mime"],
                    "Cache-Control": "public, max-age=31536000, immutable",
                    "X-Content-Type-Options": "nosniff"},
                    "body": base64.b64encode(bytes(row["bytes"])).decode("ascii"),
                    "isBase64Encoded": True}
    return response(404, {"success": False})


def handler(event, context):
    try:
        method = event.get("httpMethod", "GET")
        if method == "POST":
            return handle_post(read_body(event))
        if method == "GET":
            return handle_get(event)
        return response(405, {"success": False})
    except (ValueError, TypeError, json.JSONDecodeError):
        return response(400, {"success": False, "error": "invalid_request"})
    except Exception as exc:
        log_error("handler", exc)
        return response(503, {"success": False, "error": "temporarily_unavailable"})
