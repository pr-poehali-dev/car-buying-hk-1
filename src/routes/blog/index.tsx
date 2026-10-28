import {createFileRoute} from '@tanstack/react-router';
import BlogShell from '@/components/blog/BlogShell';
import {getBlogList, SITE} from '@/lib/blog/server';

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Math.max(1, Math.min(1000, Math.floor(Number(search.page) || 1))),
  }),
  loaderDeps: ({search}) => ({page: search.page}),
  loader: ({deps}) => getBlogList({data: deps.page}),
  head: () => ({links: [{rel: 'canonical', href: `${SITE}/blog`}], meta: [
    {title: 'Блог об автовыкупе в Хабаровске | АвтоВыкуп'},
    {name: 'description', content: 'Советы по продаже автомобиля, оценке и оформлению сделки в Хабаровске и Хабаровском крае.'},
    {name: 'robots', content: 'index, follow, max-image-preview:large'},
    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: 'Блог об автовыкупе в Хабаровске'},
    {property: 'og:url', content: `${SITE}/blog`},
  ]}),
  component: BlogIndex,
});

function BlogIndex() {
  const {articles, total, page} = Route.useLoaderData();
  const pages = Math.max(1, Math.ceil(total / 20));
  return (
    <BlogShell>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Навигация">
          <a className="hover:underline" href="/">Главная</a> <span aria-hidden="true">/</span> Блог
        </nav>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Блог</h1>
        <p className="text-gray-600 mb-10 max-w-2xl">Полезные материалы о продаже и выкупе автомобилей в Хабаровске и крае.</p>
        {articles.length === 0 ? (
          <p className="rounded-xl bg-gray-50 border border-gray-200 p-8 text-gray-600">Статьи скоро появятся.</p>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.id} className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                <a href={`/blog/${article.slug}`}>
                  <img src={`/blog/media/${article.cover_media_id}`} alt={article.image_alt || article.title}
                    className="w-full aspect-[16/9] object-cover" loading="lazy"/>
                </a>
                <div className="p-6">
                  <time className="text-xs text-gray-500" dateTime={article.created_at}>
                    {new Date(article.created_at).toLocaleDateString('ru-RU')}
                  </time>
                  <h2 className="text-xl font-bold mt-2 mb-3 leading-snug">
                    <a href={`/blog/${article.slug}`} className="hover:text-blue-700">{article.title}</a>
                  </h2>
                  <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                  <a href={`/blog/${article.slug}`} className="inline-block mt-5 text-blue-700 font-semibold hover:underline">Читать статью →</a>
                </div>
              </article>
            ))}
          </div>
        )}
        {pages > 1 && <nav className="flex gap-4 mt-10" aria-label="Страницы блога">
          {page > 1 && <a className="text-blue-700 hover:underline" href={`/blog?page=${page - 1}`}>← Назад</a>}
          <span className="text-gray-500">Страница {page} из {pages}</span>
          {page < pages && <a className="text-blue-700 hover:underline" href={`/blog?page=${page + 1}`}>Вперёд →</a>}
        </nav>}
      </div>
    </BlogShell>
  );
}
