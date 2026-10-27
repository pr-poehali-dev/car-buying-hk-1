import { createFileRoute } from "@tanstack/react-router";
import UrgentBuyout from "@/pages/articles/UrgentBuyout";

const TITLE = "Срочный выкуп авто за наличные Хабаровск - Деньги за 15 минут | +7(984)177-15-88";
const DESCRIPTION = "Срочный выкуп автомобилей за наличные в Хабаровске за 15 минут. Приезжаем, оцениваем, платим сразу. Любое состояние. Звоните +7(984)177-15-88";

export const Route = createFileRoute("/srochnyj-vykup-avto")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: UrgentBuyout,
});
