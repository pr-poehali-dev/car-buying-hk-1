import { createFileRoute, notFound } from "@tanstack/react-router";
import SeoLanding from "@/pages/SeoLanding";
import { getSeoPage } from "@/data/seoPages";

const SITE = "https://avtovykupkhb27.ru";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const page = getSeoPage(params.slug);
    if (!page) throw notFound();
    return { slug: page.slug };
  },
  head: ({ loaderData }) => {
    const page = loaderData ? getSeoPage(loaderData.slug) : undefined;
    if (!page) return {};
    const url = `${SITE}/${page.slug}`;
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: page.name, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.h1,
        serviceType: "Выкуп автомобилей",
        areaServed: { "@type": "AdministrativeArea", name: page.kind === "city" ? page.name : "Хабаровский край" },
        provider: { "@type": "AutoDealer", name: "АвтоВыкуп Хабаровск", telephone: "+79841771588", url: `${SITE}/` },
      },
    ];
    return {
      meta: [
        { title: page.title },
        { name: "description", content: page.description },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:url", content: url },
      ],
      scripts: jsonLd.map((data) => ({ type: "application/ld+json", children: JSON.stringify(data) })),
    };
  },
  component: SeoLandingRoute,
});

function SeoLandingRoute() {
  const { slug } = Route.useLoaderData();
  return <SeoLanding slug={slug} />;
}
