import { createFileRoute } from "@tanstack/react-router";
import HowItWorks from "@/pages/HowItWorks";

const TITLE = "Как мы покупаем автомобили - Процесс выкупа авто за 4 шага | Хабаровск";
const DESCRIPTION = "Узнайте как проходит выкуп автомобилей в Хабаровске: заявка → осмотр → договор → деньги. Весь процесс за 15-30 минут. Прозрачная схема работы";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: HowItWorks,
});
