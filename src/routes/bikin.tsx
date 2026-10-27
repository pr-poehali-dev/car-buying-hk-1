import { createFileRoute } from "@tanstack/react-router";
import Bikin from "@/pages/cities/Bikin";

const TITLE = "Выкуп авто Бикин - Срочный выкуп автомобилей за 15 минут | +7(984)177-15-88";
const DESCRIPTION = "Срочный выкуп автомобилей в Бикине за 15 минут. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88";

export const Route = createFileRoute("/bikin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Bikin,
});
