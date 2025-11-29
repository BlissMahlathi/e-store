import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ChartCard } from "@/components/dashboard/chart-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VENDOR_DASHBOARD_LINKS, COMMISSION_RATE, HIGH_PERFORMER_DISCOUNT } from "@/lib/constants";
import { fetchVendorDashboardData } from "@/lib/data/dashboard";

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;
const formatRand = (value: number) => `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default async function VendorEarningsPage() {
  const { vendor, metrics, chart } = await fetchVendorDashboardData();
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Earnings">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Current commission" value={formatPercent(vendor.commissionRate ?? COMMISSION_RATE)} helper="Active tier" />
        <MetricCard label="Potential discount" value={`-${formatPercent(HIGH_PERFORMER_DISCOUNT)}`} helper="Hit the goal" />
        <MetricCard label="Pending payout" value={formatRand(metrics.pendingPayout)} helper="Awaiting settlement" />
      </div>
      <ChartCard
        title="Payout trend"
        labels={chart.labels}
        dataset={chart.dataset}
        accentColor="#9333ea"
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Commission notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Discount unlock recalculates every calendar quarter. Orders disputed for more than seven days are removed until resolved.
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
