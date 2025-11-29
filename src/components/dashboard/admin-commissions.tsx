import { COMMISSION_TIERS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminCommissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Commission tiers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {COMMISSION_TIERS.map((tier) => (
          <div key={tier.label} className="rounded-2xl border border-border/70 p-4">
            <p className="text-sm font-semibold">{tier.label}</p>
            <p className="text-xs text-muted-foreground">{tier.range}</p>
            <p className="text-2xl font-semibold">{tier.rate}</p>
            <p className="text-sm text-muted-foreground">{tier.benefit}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
