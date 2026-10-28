import {createFileRoute} from '@tanstack/react-router';
import {functionRequest, SITE} from '@/lib/blog/server';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[char] || char);

export const Route = createFileRoute('/blog/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const entries: {slug: string; updated_at: string}[] = [];
          for (let page = 1; page <= 100; page++) {
            const upstream = await functionRequest({mode: 'list', page: String(page)});
            if (!upstream.ok) throw new Error('upstream');
            const data = await upstream.json() as {articles: {slug: string; updated_at: string}[]; total: number};
            entries.push(...data.articles);
            if (entries.length >= data.total || data.articles.length === 0) break;
          }
          const urls = [
            `<url><loc>${SITE}/blog</loc></url>`,
            ...entries.map((entry) => `<url><loc>${SITE}/blog/${escapeXml(entry.slug)}</loc><lastmod>${escapeXml(entry.updated_at.slice(0, 10))}</lastmod></url>`),
          ];
          return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, {
            headers: {'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300'},
          });
        } catch {
          return new Response('Sitemap unavailable', {status: 503});
        }
      },
    },
  },
});
