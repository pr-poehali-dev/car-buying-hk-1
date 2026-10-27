import { createFileRoute } from "@tanstack/react-router";
import Evaluation from "@/pages/Evaluation";

const TITLE = "Онлайн оценка автомобиля Хабаровск - Узнайте стоимость авто за 2 минуты";
const DESCRIPTION = "Бесплатная онлайн оценка автомобиля в Хабаровске. Узнайте стоимость вашего авто за 2 минуты. Оставьте заявку и получите звонок эксперта. Честная цена";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Evaluation,
});
