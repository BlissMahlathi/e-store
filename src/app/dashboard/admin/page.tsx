import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS, ADMIN_ORDERS } from "@/lib/constants";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import { OrdersList } from "@/components/dashboard/orders-list";
import { SalesBreakdown } from "@/components/dashboard/sales-breakdown";

export const metadata: Metadata = { title: "Admin dashboard | e-store" };

export default function AdminDashboardPage() {
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Overview">
      <AdminOverview />
      <OrdersList title="Platform orders" orders={ADMIN_ORDERS} />
      <SalesBreakdown />
    </DashboardShell>
  );
}
