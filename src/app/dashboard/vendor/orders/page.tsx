import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OrdersList } from "@/components/dashboard/orders-list";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";
import { fetchVendorOrdersList } from "@/lib/data/dashboard";

export default async function VendorOrdersPage() {
  const orders = await fetchVendorOrdersList(25);
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Orders">
      <OrdersList orders={orders} />
    </DashboardShell>
  );
}
