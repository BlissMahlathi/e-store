import { Metadata } from "next";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";
import { VendorOverview } from "@/components/dashboard/vendor-overview";
import { OrdersList } from "@/components/dashboard/orders-list";
import { SalesBreakdown } from "@/components/dashboard/sales-breakdown";
import { CatalogTable } from "@/components/dashboard/catalog-table";
import { Button } from "@/components/ui/button";
import { fetchVendorDashboardData } from "@/lib/data/dashboard";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Vendor dashboard | ${COMPANY_NAME}` };

export default async function VendorDashboardPage() {
  const { metrics, chart, orders, salesStream, catalog } = await fetchVendorDashboardData();

  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Overview">
      <VendorOverview metrics={metrics} chart={chart} />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <OrdersList orders={orders} />
        <SalesBreakdown entries={salesStream} helper="Live orders grouped by channel" />
      </div>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Catalog</p>
            <h2 className="text-xl font-semibold">Latest listings</h2>
            <p className="text-sm text-muted-foreground">Snapshot of the five most recent items you updated.</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/vendor/catalog">View catalog</Link>
          </Button>
        </div>
        <CatalogTable products={catalog.slice(0, 5)} showVendor={false} showActions={false} />
      </section>
    </DashboardShell>
  );
}
