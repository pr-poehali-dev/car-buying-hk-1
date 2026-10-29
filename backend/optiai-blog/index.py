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
import uuid
from urllib.parse import quote, urlsplit
from urllib.request import build_opener, HTTPRedirectHandler, Request

from bleach._vendor import html5lib
from bs4 import BeautifulSoup
import psycopg2
from psycopg2.extras import Json, RealDictCursor


SCHEMA = "t_p43245144_car_buying_hk_1"
SITE = "https://avtovykupkhb27.ru"
CONNECTOR_VERSION = "2.5.4"
SLUG = re.compile(r"^[a-zа-яё0-9](?:[a-zа-яё0-9-]{0,118}[a-zа-яё0-9])?$")
CAPABILITIES = [
    "seo_meta", "canonical", "open_graph", "schema_org", "inline_images",
    "cover_images", "seo_event_repair", "seo_head_runtime",
    "seo_runtime_diagnostics", "picture_alt", "article_content_api", "dry_run",
    "safe_errors_v1",
]
ALLOWED_TAGS = {
    "article", "section", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr", "img", "figure", "figcaption", "table", "thead",
    "tbody", "tr", "th", "td", "ul", "ol", "li", "blockquote", "pre",
    "code", "strong", "em", "b", "i", "small", "sup", "sub", "mark",
    "details", "summary", "a", "time", "meta", "abbr", "dl", "dt", "dd",
}
GLOBAL_ATTRIBUTES = {
    "class", "id", "title", "aria-label", "data-benefits-block", "data-case-block",
    "data-optiai-authorship", "data-social-proof", "data-social-proof-kind",
    "data-social-proof-quote", "data-social-proof-attribution",
    "itemprop", "itemscope", "itemtype", "itemid", "style",
}
TAG_ATTRIBUTES = {
    "a": {"href", "rel", "target"},
    "img": {"src", "alt", "width", "height", "loading", "decoding"},
    "th": {"scope", "colspan", "rowspan"},
    "td": {"colspan", "rowspan"},
    "time": {"datetime"},
    "blockquote": {"cite"},
    "details": {"open"},
    "meta": {"content"},
}
ITEMPROP = re.compile(r"^[A-Za-z][A-Za-z0-9:_-]*(?:\s+[A-Za-z][A-Za-z0-9:_-]*)*$")
SAFE_LENGTH = re.compile(r"^(?:auto|0|-?\d+(?:\.\d+)?(?:px|em|rem|%|vw|vh)?)(?:\s+(?:auto|0|-?\d+(?:\.\d+)?(?:px|em|rem|%|vw|vh)?)){0,3}$", re.I)
STYLE_LENGTHS = {"width", "max-width", "height", "margin", "margin-left", "margin-right", "margin-top", "margin-bottom", "padding", "padding-left", "padding-right", "padding-top", "padding-bottom", "font-size", "line-height", "border-radius"}
STYLE_KEYWORDS = {
    "float": {"none", "left", "right"},
    "clear": {"none", "both", "left", "right"},
    "display": {"block", "inline", "inline-block", "flow-root", "flex", "inline-flex"},
    "text-align": {"left", "right", "center", "justify"},
    "font-weight": {"normal", "bold", "400", "500", "600", "700"},
    "font-style": {"normal", "italic"},
    "border-collapse": {"collapse"},
    "list-style": {"none"},
    "cursor": {"pointer"},
    "align-items": {"center"},
    "flex-wrap": {"wrap", "nowrap"},
    "justify-content": {"center"},
    "text-decoration": {"none", "underline"},
}
SAFE_COLOR = r"(?:#[0-9a-f]{3,8}|rgba\(\s*(?:\d{1,3}\s*,\s*){3}(?:0|1|0?\.\d+)\s*\))"
SAFE_BORDER = re.compile(r"^(?:0|\d+(?:\.\d+)?px)\s+(?:solid|dashed|dotted)\s+" + SAFE_COLOR + r"$", re.I)
SAFE_SHADOW = re.compile(r"^(?:(?:0|-?\d+(?:\.\d+)?px)\s+){3}" + SAFE_COLOR + r"$", re.I)
SAFE_BACKGROUND = re.compile(r"^(?:" + SAFE_COLOR + r"|linear-gradient\(\d{1,3}deg,#[0-9a-f]{3,8},#[0-9a-f]{3,8}\))$", re.I)
SAFE_COLOR_VALUE = re.compile(r"^" + SAFE_COLOR + r"$", re.I)
SAFE_STYLE_HASHES = {
    "7b3f8b63400fea208d8a6e4337f17607a79864b40b68ab7d8c1049ebf7ebe67b",
    "8d5a717eac3349881b7fcd60ba78bc7014db09a8b7644f89c76fd492f2a8a2ac",
}


def response(status, data):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store"},
        "body": json.dumps(data, ensure_ascii=False, default=str),
        "isBase64Encoded": False,
    }


def safe_error(status, error_code, field, reason_code):
    """Return only protocol-defined error details, never request content."""
    request_id = str(uuid.uuid4())
    print("optiai-blog rejected status=%s code=%s field=%s reason=%s request_id=%s" %
          (status, error_code, field, reason_code, request_id))
    return response(status, {"success": False, "error_code": error_code,
                             "field": field, "reason_code": reason_code,
                             "request_id": request_id})


def validation_error(exc):
    code = str(exc)
    fields = {
        "invalid_slug": ("slug", "invalid_slug"),
        "invalid_title": ("title", "invalid_title"),
        "missing_article": ("title", "invalid_title"),
        "invalid_seo": ("seo", "invalid_seo"),
        "invalid_excerpt": ("excerpt", "invalid_request"),
        "invalid_image_alt": ("image_alt", "invalid_request"),
        "invalid_images": ("inline_images", "invalid_request"),
        "missing_cover": ("image_url", "invalid_media_url"),
        "invalid_media_url": ("image_url", "invalid_media_url"),
        "untrusted_media_url": ("image_url", "invalid_media_url"),
        "invalid_article": ("article", "invalid_request"),
    }
    if code in fields:
        field, reason = fields[code]
        return safe_error(400, "validation_failed", field, reason)
    if code in {"unsafe_media_dns", "media_unavailable", "invalid_media_type",
                "invalid_media_size", "invalid_media_bytes"}:
        return safe_error(422, "media_failed", "media", "media_download_failed")
    if code in {"invalid_html", "invalid_html_images", "missing_local_media"}:
        return safe_error(400, "validation_failed", "html", "invalid_html")
    if code in {"unsafe_style", "invalid_style", "unsupported_style", "invalid_link",
                "unsafe_link", "schema_too_complex", "unsafe_script", "invalid_jsonld",
                "duplicate_article_schema", "unsupported_html_tag", "unsafe_html_attribute",
                "invalid_microdata_meta", "invalid_itemprop", "invalid_itemscope",
                "invalid_itemtype", "invalid_itemid", "invalid_microdata_content",
                "oversized_html_attribute"}:
        return safe_error(400, "validation_failed", "html", "unsupported_html_markup")
    return safe_error(400, "validation_failed", "request", "invalid_request")


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


def validate_style(value):
    if len(value) > 1000 or any(ord(ch) < 32 for ch in value) or any(
            bad in value.lower() for bad in ("url(", "expression", "@import", "var(", "\\", "/*", "*/")):
        raise ValueError("unsafe_style")
    for part in value.split(";"):
        if not part.strip():
            continue
        if ":" not in part:
            raise ValueError("invalid_style")
        name, raw = part.split(":", 1)
        name, raw = name.strip().lower(), raw.strip().lower()
        if raw.endswith("!important"):
            raw = raw[:-10].strip()
        if name in STYLE_LENGTHS:
            if not SAFE_LENGTH.fullmatch(raw):
                raise ValueError("invalid_style")
        elif name in STYLE_KEYWORDS:
            if raw not in STYLE_KEYWORDS[name]:
                raise ValueError("invalid_style")
        elif name in {"color", "text-decoration-color"}:
            if not SAFE_COLOR_VALUE.fullmatch(raw):
                raise ValueError("invalid_style")
        elif name == "background":
            if not SAFE_BACKGROUND.fullmatch(raw):
                raise ValueError("invalid_style")
        elif name in {"border", "border-left", "border-top"}:
            if not SAFE_BORDER.fullmatch(raw):
                raise ValueError("invalid_style")
        elif name == "box-shadow":
            if not SAFE_SHADOW.fullmatch(raw):
                raise ValueError("invalid_style")
        elif name in {"letter-spacing", "text-underline-offset", "gap"}:
            if not SAFE_LENGTH.fullmatch(raw):
                raise ValueError("invalid_style")
        elif name == "opacity":
            if not re.fullmatch(r"(?:0(?:\.\d+)?|1(?:\.0+)?)", raw):
                raise ValueError("invalid_style")
        elif name == "transition":
            if raw != "text-decoration-color .2s ease":
                raise ValueError("invalid_style")
        else:
            raise ValueError("unsupported_style")


def validate_link(value):
    if not value or value.strip() != value or any(ord(ch) < 33 or ord(ch) == 127 for ch in value):
        raise ValueError("invalid_link")
    if value.startswith(("/", "#", "?")) and not value.startswith("//"):
        return
    parsed = urlsplit(value)
    if not parsed.scheme and not parsed.netloc and ":" not in value.split("/", 1)[0]:
        return
    if parsed.scheme.lower() not in ("https", "http", "mailto", "tel"):
        raise ValueError("unsafe_link")
    if parsed.scheme.lower() in ("https", "http") and (not parsed.hostname or parsed.username or parsed.password):
        raise ValueError("unsafe_link")


def schema_types(value):
    pending = [value]
    types = set()
    seen = 0
    while pending:
        node = pending.pop()
        seen += 1
        if seen > 10000:
            raise ValueError("schema_too_complex")
        if isinstance(node, dict):
            kind = node.get("@type")
            if isinstance(kind, str):
                types.add(kind)
            elif isinstance(kind, list):
                types.update(x for x in kind if isinstance(x, str))
            pending.extend(node.values())
        elif isinstance(node, list):
            pending.extend(node)
    return types


def article_schemas_for_html(source, schemas):
    """Use validated authorship microdata when the article has no JSON-LD."""
    soup = BeautifulSoup(source, "html.parser")
    card = soup.find(attrs={"data-optiai-authorship": "1"})
    if not card:
        return schemas
    if card.get("itemtype") != "https://schema.org/Article":
        raise ValueError("invalid_itemtype")

    def entity(prop, allowed_types):
        node = card.find(lambda tag: tag.has_attr("itemscope") and prop in (tag.get("itemprop") or "").split())
        if node is None:
            raise ValueError("invalid_article")
        itemtype = node.get("itemtype") or ""
        kind = itemtype.removeprefix("https://schema.org/")
        if kind not in allowed_types or itemtype != "https://schema.org/" + kind:
            raise ValueError("invalid_itemtype")
        name_tag = node.find(lambda tag: "name" in (tag.get("itemprop") or "").split())
        if name_tag is None:
            raise ValueError("invalid_article")
        name = (name_tag.get("content") or name_tag.get_text(" ", strip=True)).strip()
        if not name or len(name) > 200:
            raise ValueError("invalid_article")
        value = {"@type": kind, "name": name}
        url_tag = node.find(lambda tag: "url" in (tag.get("itemprop") or "").split())
        if url_tag is not None:
            url = (url_tag.get("content") or url_tag.get("href") or "").strip()
            parsed = urlsplit(url)
            if (parsed.scheme == "https" and parsed.hostname == urlsplit(SITE).hostname
                    and not parsed.username and not parsed.password and not parsed.fragment):
                value["url"] = url
        return value

    author = entity("author", {"Person", "Organization"})
    publisher = entity("publisher", {"Organization"})
    for schema in schemas:
        if isinstance(schema, dict) and schema.get("@type") in ("Article", "BlogPosting", "NewsArticle"):
            schema.setdefault("author", author)
            schema.setdefault("publisher", publisher)
            return schemas
    if not any("Article" in schema_types(s) or "BlogPosting" in schema_types(s)
               or "NewsArticle" in schema_types(s) for s in schemas):
        schemas.insert(0, {"@context": "https://schema.org", "@type": "Article",
                           "author": author, "publisher": publisher})
    return schemas


def parse_article_html(source):
    """Validate the browser's HTML5 parse tree; keep safe markup and JSON-LD."""
    try:
        tree = html5lib.HTMLParser(strict=True, namespaceHTMLElements=False).parseFragment(source)
    except Exception as exc:
        raise ValueError("invalid_html") from exc
    schemas = []
    images = []
    article_schemas = 0
    for node in tree.iter():
        if node is tree or not isinstance(node.tag, str):
            continue
        tag = node.tag.lower()
        attrs = {name.lower(): value for name, value in node.attrib.items()}
        if tag == "style":
            css = node.text or ""
            if (attrs or len(css.encode("utf-8")) > 8192 or
                    hashlib.sha256(css.encode("utf-8")).hexdigest() not in SAFE_STYLE_HASHES):
                raise ValueError("unsafe_style")
            continue
        if tag == "script":
            if (not {"type"} <= set(attrs) or set(attrs) - {"type", "id"}
                    or attrs["type"].strip().lower() != "application/ld+json"
                    or ("id" in attrs and not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]{0,99}", attrs["id"]))
                    or len((node.text or "").encode("utf-8")) > 256 * 1024):
                raise ValueError("unsafe_script")
            try:
                schema = json.loads(node.text or "")
            except (ValueError, TypeError) as exc:
                raise ValueError("invalid_jsonld") from exc
            if not isinstance(schema, (dict, list)):
                raise ValueError("invalid_jsonld")
            types = schema_types(schema)
            if "Article" in types or "BlogPosting" in types or "NewsArticle" in types:
                article_schemas += 1
            if article_schemas > 1:
                raise ValueError("duplicate_article_schema")
            schemas.append(schema)
            continue
        if tag not in ALLOWED_TAGS:
            raise ValueError("unsupported_html_tag")
        allowed = GLOBAL_ATTRIBUTES | TAG_ATTRIBUTES.get(tag, set())
        if any(name not in allowed or name.startswith("on") for name in attrs):
            raise ValueError("unsafe_html_attribute")
        if tag == "meta" and (set(attrs) - {"itemprop", "content"} or
                               not attrs.get("itemprop") or "content" not in attrs):
            raise ValueError("invalid_microdata_meta")
        if "itemprop" in attrs and (len(attrs["itemprop"]) > 300 or not ITEMPROP.fullmatch(attrs["itemprop"])):
            raise ValueError("invalid_itemprop")
        if "itemscope" in attrs and attrs["itemscope"] not in ("", "itemscope"):
            raise ValueError("invalid_itemscope")
        if "itemtype" in attrs and (not attrs["itemtype"].startswith("https://schema.org/") or
                                    any(ch.isspace() for ch in attrs["itemtype"])):
            raise ValueError("invalid_itemtype")
        if "itemid" in attrs and not (attrs["itemid"].startswith("#") or
                                     attrs["itemid"].startswith(SITE + "/")):
            raise ValueError("invalid_itemid")
        if "content" in attrs and (len(attrs["content"]) > 5000 or
                                   any(ord(ch) < 32 for ch in attrs["content"])):
            raise ValueError("invalid_microdata_content")
        if "style" in attrs:
            validate_style(attrs["style"])
        if "href" in attrs:
            validate_link(attrs["href"])
        if "src" in attrs:
            validate_media_url(attrs["src"])
            images.append(attrs["src"])
        for name, value in attrs.items():
            if len(value) > 2000 and name not in ("content", "style"):
                raise ValueError("oversized_html_attribute")
    return tree, images, article_schemas_for_html(source, schemas)


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
    _, html_images, schemas = parse_article_html(data["html"])
    if len(html_images) > 30:
        raise ValueError("invalid_html_images")
    images = list(dict.fromkeys([*images, *html_images]))
    cover = data.get("image_url") or seo.get("image")
    if not isinstance(cover, str) or not cover:
        raise ValueError("missing_cover")
    for url in [cover, *images]:
        validate_media_url(url)
    return slug, seo, cover, images, schemas


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
    tree, _, _ = parse_article_html(source)

    def rewrite(parent):
        for node in list(parent):
            if isinstance(node.tag, str) and node.tag.lower() == "script":
                previous = list(parent)
                index = previous.index(node)
                if index:
                    previous[index - 1].tail = (previous[index - 1].tail or "") + (node.tail or "")
                else:
                    parent.text = (parent.text or "") + (node.tail or "")
                parent.remove(node)
                continue
            if isinstance(node.tag, str) and node.tag.lower() == "img":
                source_url = node.get("src")
                if source_url not in media_urls:
                    raise ValueError("missing_local_media")
                node.set("src", f"/blog/media/{media_urls[source_url]}")
                if not node.get("alt"):
                    node.set("alt", "Иллюстрация к статье")
            rewrite(node)

    rewrite(tree)
    return html5lib.serialize(tree, tree="etree", quote_attr_values="always",
                              omit_optional_tags=False)


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
    return f"{SITE}/blog/{quote(slug, safe='-')}"


def handle_post(data):
    if not require_auth(data):
        return safe_error(403, "authentication_failed", "token", "invalid_token")
    action = data.get("action") or "publish"
    if action == "capabilities":
        return response(200, {"success": True, "connector_version": CONNECTOR_VERSION,
                              "seo_module": True, "seo_module_version": "1.4.0",
                              "seo_event_ready": True, "capabilities": CAPABILITIES})
    if action == "diagnostics":
        try:
            with connect() as conn, conn.cursor() as cur:
                ready = table_ready(cur)
            robots = public_check("/robots.txt", "/blog/sitemap.xml")
            sitemap = (public_check("/sitemap.xml", "<urlset")
                       and public_check("/blog/sitemap.xml", "<urlset")
                       and public_check("/blog-sitemap", "<urlset"))
            blog = public_check("/blog?page=1", "Блог")
            return response(200, {"success": True, "https": True,
                                  "data_root_ready": ready, "blog_root_ready": ready and blog,
                                  "robots_ready": robots, "sitemap_ready": sitemap})
        except Exception as exc:
            log_error("diagnostics", exc)
            return safe_error(503, "storage_failed", "storage", "article_storage_failed")
    if action in ("publish", "dry_run"):
        slug, seo, cover, images, schemas = validate(data)
        if action == "dry_run":
            with connect() as conn, conn.cursor() as cur:
                if not table_ready(cur):
                    return safe_error(503, "storage_failed", "storage", "article_storage_failed")
            return response(200, {"success": True, "dry_run": True, "accepted": True, "stored": False})
        with connect() as conn, conn.cursor() as cur:
            if not table_ready(cur):
                return safe_error(503, "storage_failed", "storage", "article_storage_failed")
            ids = {url: store_media(cur, url) for url in dict.fromkeys([cover, *images])}
            rendered = render_article(data["html"], ids)
            digest = hashlib.sha256(data["html"].encode("utf-8")).hexdigest()
            cur.execute(
                f"INSERT INTO {SCHEMA}.optiai_blog_articles "
                "(slug, title, excerpt, html, render_html, html_sha256, seo, cover_media_id, image_alt, media_map, faq, schema_json) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) ON CONFLICT (slug) DO UPDATE SET "
                "title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, html=EXCLUDED.html, "
                "render_html=EXCLUDED.render_html, html_sha256=EXCLUDED.html_sha256, "
                "seo=EXCLUDED.seo, cover_media_id=EXCLUDED.cover_media_id, "
                "image_alt=EXCLUDED.image_alt, media_map=EXCLUDED.media_map, "
                "faq=EXCLUDED.faq, schema_json=EXCLUDED.schema_json, updated_at=now() RETURNING id",
                (slug, data["title"], data.get("excerpt", ""), data["html"], rendered,
                 digest, Json(seo), ids[cover], data.get("image_alt", ""), Json(ids),
                 Json(extract_faq(data["html"])), Json(schemas)),
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
                return safe_error(404, "validation_failed", "article", "invalid_request")
            if action == "update_article":
                new_html = data.get("html")
                if not isinstance(new_html, str) or not new_html or len(new_html.encode("utf-8")) > 4 * 1024 * 1024:
                    raise ValueError("invalid_html")
                _, _, schemas = parse_article_html(new_html)
                rendered = render_article(new_html, row[3] or {})
                cur.execute(f"UPDATE {SCHEMA}.optiai_blog_articles SET html=%s, render_html=%s, "
                            "html_sha256=%s, schema_json=%s, faq=%s, updated_at=now() WHERE id=%s",
                            (new_html, rendered, hashlib.sha256(new_html.encode("utf-8")).hexdigest(),
                             Json(schemas), Json(extract_faq(new_html)), row[0]))
                row = (row[0], row[1], new_html)
        return response(200, {"success": True, "id": row[0], "url": article_url(row[1]), "html": row[2]})
    return safe_error(400, "unsupported_action", "request", "unsupported_action")


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
                return safe_error(404, "validation_failed", "slug", "invalid_slug")
            cur.execute(f"SELECT id, slug, title, excerpt, render_html, seo, cover_media_id, image_alt, faq, schema_json, "
                        f"created_at, updated_at FROM {SCHEMA}.optiai_blog_articles WHERE slug=%s", (slug,))
            row = cur.fetchone()
            return response(200, {"success": True, "article": row}) if row else safe_error(404, "validation_failed", "article", "invalid_request")
        if mode == "media":
            media_id = query.get("id", "")
            if not str(media_id).isdigit():
                return safe_error(404, "validation_failed", "media", "invalid_request")
            cur.execute(f"SELECT bytes, mime FROM {SCHEMA}.optiai_blog_media WHERE id=%s", (int(media_id),))
            row = cur.fetchone()
            if not row:
                return safe_error(404, "validation_failed", "media", "invalid_request")
            return {"statusCode": 200, "headers": {"Content-Type": row["mime"],
                    "Cache-Control": "public, max-age=31536000, immutable",
                    "X-Content-Type-Options": "nosniff"},
                    "body": base64.b64encode(bytes(row["bytes"])).decode("ascii"),
                    "isBase64Encoded": True}
    return safe_error(404, "validation_failed", "request", "invalid_request")


def handler(event, context):
    try:
        method = event.get("httpMethod", "GET")
        if method == "POST":
            return handle_post(read_body(event))
        if method == "GET":
            return handle_get(event)
        return safe_error(405, "unsupported_action", "request", "unsupported_action")
    except (ValueError, TypeError) as exc:
        return validation_error(exc)
    except Exception as exc:
        log_error("handler", exc)
        return safe_error(503, "temporary_unavailable", "request", "upstream_unavailable")
