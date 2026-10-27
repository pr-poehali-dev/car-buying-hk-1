import { createFileRoute } from "@tanstack/react-router";
import AdminLeads from "@/pages/AdminLeads";

export const Route = createFileRoute("/admin-leads")({
  ssr: false,
  pendingComponent: AdminLeadsPending,
  component: AdminLeads,
});

function AdminLeadsPending() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Загрузка панели заявок…</p>
    </div>
  );
}