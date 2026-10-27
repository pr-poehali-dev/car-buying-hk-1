import { createFileRoute } from "@tanstack/react-router";
import SovetskayaGavan from "@/pages/cities/SovetskayaGavan";

const TITLE = "Выкуп авто Советская Гавань - Срочный выкуп за 15 минут | +7(984)177-15-88";
const DESCRIPTION = "Срочный выкуп автомобилей в Советской Гавани за 15 минут. Битые, кредитные, без документов. Деньги сразу. Рейтинг 4.9 ⭐ Звоните +7(984)177-15-88";

export const Route = createFileRoute("/sovetskaya-gavan")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: SovetskayaGavan,
});
