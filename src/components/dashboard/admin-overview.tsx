import { ADMIN_KPIS } from "@/lib/constants";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCard } from "@/components/dashboard/chart-card";

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {ADMIN_KPIS.map((kpi) => (
          <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} helper={kpi.delta} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Vendor onboarding"
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          dataset={[120, 160, 190, 210, 240, 260]}
          accentColor="#16a34a"
        />
        <ChartCard
          title="Commission income"
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          dataset={[420, 520, 610, 580, 640, 720]}
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
