import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS } from "@/lib/constants";
import { AdminVendorsTable } from "@/components/dashboard/admin-vendors-table";
import { fetchAdminVendorSummaries } from "@/lib/data/dashboard";

export default async function AdminVendorsPage() {
  const vendors = await fetchAdminVendorSummaries();
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Vendors">
      <AdminVendorsTable vendors={vendors} />
    </DashboardShell>
  );
}
