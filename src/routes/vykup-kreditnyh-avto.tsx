import { createFileRoute } from "@tanstack/react-router";
import CreditCars from "@/pages/articles/CreditCars";

const TITLE = "Выкуп кредитных авто Хабаровск - Поможем закрыть кредит | +7(984)177-15-88";
const DESCRIPTION = "Выкуп автомобилей в кредите в Хабаровске. Поможем закрыть кредит в банке. Деньги сразу. Все вопросы берем на себя. Звоните +7(984)177-15-88";

export const Route = createFileRoute("/vykup-kreditnyh-avto")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: CreditCars,
});
