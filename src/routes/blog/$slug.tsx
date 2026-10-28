import {createFileRoute, notFound} from '@tanstack/react-router';
import BlogShell from '@/components/blog/BlogShell';
import {getBlogArticle, SITE} from '@/lib/blog/server';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({params}) => {
    const article = await getBlogArticle({data: params.slug});
    if (!article) throw notFound();
    return article;
  },
  head: ({loaderData: article}) => {
    if (!article) return {};
    const title = article.seo?.title || article.title;
    const description = article.seo?.description || article.excerpt;
    const url = `${SITE}/blog/${article.slug}`;
    const cover = `${SITE}/blog/media/${article.cover_media_id}`;
    const articleSchema = {
      '@context': 'https://schema.org', '@type': 'Article', headline: article.title,
      description, image: cover, mainEntityOfPage: url,
      datePublished: article.created_at, dateModified: article.updated_at,
      publisher: {'@type': 'Organization', name: 'АвтоВыкуп Хабаровск', url: SITE},
    };
    const breadcrumb = {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Главная', item: SITE},
        {'@type': 'ListItem', position: 2, name: 'Блог', item: `${SITE}/blog`},
        {'@type': 'ListItem', position: 3, name: article.title, item: url},
      ],
    };
    const faq = article.faq?.length ? [{
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: article.faq.map(({q, a}) => ({'@type': 'Question', name: q,
        acceptedAnswer: {'@type': 'Answer', text: a}})),
    }] : [];
    return {
      links: [{rel: 'canonical', href: url}],
      meta: [
        {title}, {name: 'description', content: description},
        {name: 'robots', content: article.seo?.robots || 'index, follow, max-image-preview:large'},
        {property: 'og:type', content: 'article'},
        {property: 'og:title', content: title},
        {property: 'og:description', content: description},
        {property: 'og:url', content: url},
        {property: 'og:image', content: cover},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description},
        {name: 'twitter:image', content: cover},
      ],
      scripts: [articleSchema, breadcrumb, ...faq].map((schema, index) => ({
        id: index === 0 ? 'optiai-seo-schema' : undefined,
        type: 'application/ld+json', children: JSON.stringify(schema).replace(/</g, '\\u003c'),
      })),
    };
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const article = Route.useLoaderData();
  return (
    <BlogShell>
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-4xl">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Навигация">
          <a className="hover:underline" href="/">Главная</a> <span aria-hidden="true">/</span>{' '}
          <a className="hover:underline" href="/blog">Блог</a> <span aria-hidden="true">/</span> {article.title}
        </nav>
        <article>
          <time className="text-sm text-gray-500" dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString('ru-RU')}
          </time>
          {!/<h1[\s>]/i.test(article.render_html) && <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-7">{article.title}</h1>}
          <div className="blog-content" dangerouslySetInnerHTML={{__html: article.render_html}}/>
        </article>
        <a href="/blog" className="inline-block mt-12 text-blue-700 font-semibold hover:underline">← Все статьи</a>
      </div>
    </BlogShell>
  );
}
