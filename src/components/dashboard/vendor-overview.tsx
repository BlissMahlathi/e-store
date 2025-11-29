import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DISCOUNT_THRESHOLD_AMOUNT, DISCOUNT_PERIOD_MONTHS } from "@/lib/constants";
import { ChartCard } from "@/components/dashboard/chart-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import type { ChartSeries, VendorDashboardData } from "@/lib/data/dashboard";

type VendorOverviewProps = {
  metrics: VendorDashboardData["metrics"];
  chart: ChartSeries;
};

const formatRand = (value: number) => `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function VendorOverview({ metrics, chart }: VendorOverviewProps) {
  const percentToDiscount = metrics.discountPercent;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Gross earnings" value={formatRand(metrics.earnings)} helper="Paid orders" />
        <MetricCard label="Orders" value={metrics.orders.toString()} helper="Last period" />
        <MetricCard label="Avg. order value" value={formatRand(metrics.avgOrderValue)} helper="Blended" />
        <MetricCard label="Pending payout" value={formatRand(metrics.pendingPayout)} helper="Awaiting payment" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Discount progress</CardTitle>
          <p className="text-xs text-muted-foreground">
            Hit R{DISCOUNT_THRESHOLD_AMOUNT.toLocaleString()} in {DISCOUNT_PERIOD_MONTHS} months to unlock -3% commission.
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={percentToDiscount} />
          <p className="text-sm text-muted-foreground">
            {percentToDiscount >= 100 ? "Congrats! Discount secured." : `${percentToDiscount.toFixed(0)}% complete`}
          </p>
        </CardContent>
      </Card>
      <ChartCard
        title="Weekly earnings"
        labels={chart.labels}
        dataset={chart.dataset}
        accentColor="#2563eb"
      />
    </div>
  );
}
