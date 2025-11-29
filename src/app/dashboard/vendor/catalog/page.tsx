import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CatalogTable } from "@/components/dashboard/catalog-table";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";

export default function VendorCatalogPage() {
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Catalog">
      <CatalogTable />
    </DashboardShell>
  );
}
