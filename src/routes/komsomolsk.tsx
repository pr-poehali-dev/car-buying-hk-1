import { createFileRoute } from "@tanstack/react-router";
import Komsomolsk from "@/pages/cities/Komsomolsk";

const TITLE = "Выкуп авто Комсомольск-на-Амуре - Срочный выкуп за 15 минут | +7(984)177-15-88";
const DESCRIPTION = "Срочный выкуп автомобилей в Комсомольске-на-Амуре за 15 минут. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88";

export const Route = createFileRoute("/komsomolsk")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Komsomolsk,
});
