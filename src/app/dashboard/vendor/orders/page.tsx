import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OrdersList } from "@/components/dashboard/orders-list";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";

export default function VendorOrdersPage() {
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Orders">
      <OrdersList />
    </DashboardShell>
  );
}
