import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS } from "@/lib/constants";
import { AdminVendorsTable } from "@/components/dashboard/admin-vendors-table";

export default function AdminVendorsPage() {
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Vendors">
      <AdminVendorsTable />
    </DashboardShell>
  );
}
