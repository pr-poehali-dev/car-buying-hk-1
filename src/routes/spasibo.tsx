import { createFileRoute } from "@tanstack/react-router";
import ThankYou from "@/pages/ThankYou";

const TITLE = "Спасибо за обращение! | Автовыкуп Хабаровск";
const DESCRIPTION = "Ваша заявка принята! Мы свяжемся с вами в течение 15 минут.";

export const Route = createFileRoute("/spasibo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ThankYou,
});
