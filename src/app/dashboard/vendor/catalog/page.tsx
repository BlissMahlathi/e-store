import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { CatalogTable } from "@/components/dashboard/catalog-table";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";
import { fetchVendorCatalogProducts } from "@/lib/data/dashboard";

export default async function VendorCatalogPage() {
  const products = await fetchVendorCatalogProducts();
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Catalog">
      <CatalogTable products={products} showVendor={false} />
    </DashboardShell>
  );
}
