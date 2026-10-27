import { createFileRoute } from "@tanstack/react-router";
import SeoSettings from "@/pages/SeoSettings";

export const Route = createFileRoute("/seo-settings")({
  component: SeoSettings,
});
