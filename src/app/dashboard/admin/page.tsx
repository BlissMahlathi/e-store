import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS } from "@/lib/constants";
import { AdminOverview } from "@/components/dashboard/admin-overview";

export const metadata: Metadata = { title: "Admin dashboard | e-store" };

export default function AdminDashboardPage() {
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Overview">
      <AdminOverview />
    </DashboardShell>
  );
}
