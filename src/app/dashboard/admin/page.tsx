import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS } from "@/lib/constants";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import { OrdersList } from "@/components/dashboard/orders-list";
import { SalesBreakdown } from "@/components/dashboard/sales-breakdown";
import { fetchAdminDashboardData } from "@/lib/data/dashboard";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Admin dashboard | ${COMPANY_NAME}` };

export default async function AdminDashboardPage() {
  const { kpis, charts, orders, salesStream } = await fetchAdminDashboardData();
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Overview">
      <AdminOverview kpis={kpis} charts={charts} />
      <OrdersList title="Platform orders" orders={orders} />
      <SalesBreakdown entries={salesStream} helper="Live orders grouped by vendor" />
    </DashboardShell>
  );
}
