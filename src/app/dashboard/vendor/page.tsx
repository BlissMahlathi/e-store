import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";
import { VendorOverview } from "@/components/dashboard/vendor-overview";
import { OrdersList } from "@/components/dashboard/orders-list";

export const metadata: Metadata = { title: "Vendor dashboard | e-store" };

export default function VendorDashboardPage() {
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Overview">
      <VendorOverview />
      <OrdersList />
    </DashboardShell>
  );
}
