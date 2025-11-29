import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS } from "@/lib/constants";
import { AdminCustomersTable } from "@/components/dashboard/admin-customers-table";

export default function AdminCustomersPage() {
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Customers">
      <AdminCustomersTable />
    </DashboardShell>
  );
}
