import { createFileRoute } from "@tanstack/react-router";
import Amursk from "@/pages/cities/Amursk";

const TITLE = "Выкуп авто Амурск - Срочный выкуп автомобилей за 15 минут | +7(984)177-15-88";
const DESCRIPTION = "Срочный выкуп автомобилей в Амурске за 15 минут. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88";

export const Route = createFileRoute("/amursk")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Amursk,
});
