import { createFileRoute } from "@tanstack/react-router";
import Reviews from "@/pages/Reviews";

const TITLE = "Отзывы о выкупе авто Хабаровск - 127 реальных отзывов клиентов | Рейтинг 4.9";
const DESCRIPTION = "Реальные отзывы клиентов о выкупе автомобилей в Хабаровске. 127 отзывов, рейтинг 4.9 на Яндекс Картах. Читайте мнения людей, которые продали авто через нас";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Reviews,
});
