import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { VENDOR_METRICS, DISCOUNT_THRESHOLD_AMOUNT, DISCOUNT_PERIOD_MONTHS } from "@/lib/constants";
import { ChartCard } from "@/components/dashboard/chart-card";
import { MetricCard } from "@/components/dashboard/metric-card";

export function VendorOverview() {
  const percentToDiscount = Math.min(100, (VENDOR_METRICS.earnings / DISCOUNT_THRESHOLD_AMOUNT) * 100);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Gross earnings" value={`R${VENDOR_METRICS.earnings.toLocaleString()}`} helper={"Last 6 months"} />
        <MetricCard label="Orders" value={VENDOR_METRICS.orders.toString()} helper="Fulfilled" />
        <MetricCard label="Avg. Order Value" value={`R${VENDOR_METRICS.avgOrderValue.toLocaleString()}`} helper="Blended" />
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
        labels={["W1", "W2", "W3", "W4", "W5", "W6"]}
        dataset={[12, 14, 18, 22, 19, 24]}
        accentColor="#2563eb"
      />
    </div>
  );
}
