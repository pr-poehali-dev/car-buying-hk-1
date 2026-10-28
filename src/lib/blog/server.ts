import {createServerFn} from '@tanstack/react-start';
import functions from '../../../backend/func2url.json';

export const SITE = 'https://avtovykupkhb27.ru';
const FUNCTION_HOST = 'functions.poehali.dev';
const SLUG = /^[a-zа-яё0-9](?:[a-zа-яё0-9-]{0,118}[a-zа-яё0-9])?$/u;

export type BlogSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  seo: Record<string, string>;
  cover_media_id: number;
  image_alt: string;
  created_at: string;
  updated_at: string;
};

export type BlogArticle = BlogSummary & {
  render_html: string;
  faq: {q: string; a: string}[];
  schema_json: Array<Record<string, any>>;
};

function functionUrl(): string {
  const configured = process.env.OPTIAI_BLOG_FUNCTION_URL ||
    (functions as Record<string, string>)['optiai-blog'];
  if (!configured) throw new Error('blog_function_not_configured');
  const parsed = new URL(configured);
  if (parsed.protocol !== 'https:' || parsed.hostname !== FUNCTION_HOST || parsed.username || parsed.password) {
    throw new Error('blog_function_invalid_url');
  }
  return configured;
}

export async function functionRequest(params: Record<string, string>, init?: RequestInit): Promise<Response> {
  const url = new URL(functionUrl());
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, {
    ...init,
    redirect: 'manual',
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  if (response.status >= 300 && response.status < 400) throw new Error('blog_function_redirect');
  return response;
}

export const getBlogList = createServerFn({method: 'GET'})
  .validator((page: number) => Math.max(1, Math.min(1000, Math.floor(page) || 1)))
  .handler(async ({data: page}) => {
    const response = await functionRequest({mode: 'list', page: String(page)});
    if (!response.ok) throw new Error('blog_list_unavailable');
    const data = await response.json() as {success: boolean; articles: BlogSummary[]; total: number; page: number};
    if (!data.success || !Array.isArray(data.articles)) throw new Error('blog_list_invalid');
    return data;
  });

export const getBlogArticle = createServerFn({method: 'GET'})
  .validator((slug: string) => {
    let decoded: string;
    try { decoded = decodeURIComponent(slug); }
    catch { throw new Error('invalid_slug'); }
    if (!SLUG.test(decoded)) throw new Error('invalid_slug');
    return decoded;
  })
  .handler(async ({data: slug}) => {
    const response = await functionRequest({mode: 'article', slug});
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('blog_article_unavailable');
    const data = await response.json() as {success: boolean; article: BlogArticle};
    if (!data.success || !data.article) throw new Error('blog_article_invalid');
    return data.article;
  });
