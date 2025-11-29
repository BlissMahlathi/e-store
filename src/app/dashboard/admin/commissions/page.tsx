import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS } from "@/lib/constants";
import { AdminCommissions } from "@/components/dashboard/admin-commissions";

export default function AdminCommissionsPage() {
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Commissions">
      <AdminCommissions />
    </DashboardShell>
  );
}
