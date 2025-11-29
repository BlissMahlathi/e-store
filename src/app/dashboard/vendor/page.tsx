import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";
import { VendorOverview } from "@/components/dashboard/vendor-overview";
import { OrdersList } from "@/components/dashboard/orders-list";
import { SalesBreakdown } from "@/components/dashboard/sales-breakdown";
import { fetchVendorDashboardData } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Vendor dashboard | e-store" };

export default async function VendorDashboardPage() {
  const { metrics, chart, orders, salesStream } = await fetchVendorDashboardData();

  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Overview">
      <VendorOverview metrics={metrics} chart={chart} />
      <OrdersList orders={orders} />
      <SalesBreakdown entries={salesStream} helper="Live orders grouped by channel" />
    </DashboardShell>
  );
}
