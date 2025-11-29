import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ChartCard } from "@/components/dashboard/chart-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VENDOR_DASHBOARD_LINKS, COMMISSION_RATE, HIGH_PERFORMER_DISCOUNT } from "@/lib/constants";

export default function VendorEarningsPage() {
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Earnings">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Current commission" value={`${Math.round(COMMISSION_RATE * 100)}%`} />
        <MetricCard label="Potential discount" value={`-${Math.round(HIGH_PERFORMER_DISCOUNT * 100)}%`} helper="Hit the goal" />
        <MetricCard label="Pending payout" value="R8,120" helper="Scheduled Friday" />
      </div>
      <ChartCard
        title="Payout trend"
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
        dataset={[6.4, 7.1, 8.3, 10.4, 9.8, 11.2]}
        accentColor="#9333ea"
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Commission notes</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Discount unlock recalculates every calendar quarter. Orders disputed for more than seven days are removed until
          resolved.
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
