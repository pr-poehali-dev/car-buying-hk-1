import { createFileRoute } from "@tanstack/react-router";
import DamagedCars from "@/pages/articles/DamagedCars";

const TITLE = "Выкуп битых авто Хабаровск - Срочный выкуп после ДТП | +7(984)177-15-88";
const DESCRIPTION = "Выкуп битых автомобилей после ДТП в Хабаровске. Оценка за 15 минут, деньги сразу. Не на ходу, с повреждениями — выкупаем любые. Звоните +7(984)177-15-88";

export const Route = createFileRoute("/vykup-bityh-avto")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: DamagedCars,
});
