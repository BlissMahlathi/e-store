import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCard } from "@/components/dashboard/chart-card";
import type { AdminDashboardData } from "@/lib/data/dashboard";

type AdminOverviewProps = {
  kpis: AdminDashboardData["kpis"];
  charts: AdminDashboardData["charts"];
};

export function AdminOverview({ kpis, charts }: AdminOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {kpis.length > 0 ? (
          kpis.map((kpi) => <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} helper={kpi.helper} />)
        ) : (
          <Card className="md:col-span-4 border-dashed border-border/60">
            <CardContent className="py-8 text-center text-sm text-muted-foreground">No KPI data yet.</CardContent>
          </Card>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Vendor onboarding"
          labels={charts.onboarding.labels}
          dataset={charts.onboarding.dataset}
          accentColor="#16a34a"
        />
        <ChartCard
          title="Commission income"
          labels={charts.commissions.labels}
          dataset={charts.commissions.dataset}
          accentColor="#f97316"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Operational notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• Review 12 pending vendor applications.</p>
          <p>• Commission adjustments scheduled for 6 high performers.</p>
          <p>• Data sync with accounting completes daily at 19:00 SAST.</p>
        </CardContent>
      </Card>
    </div>
  );
}
