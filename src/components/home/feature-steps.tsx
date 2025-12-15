import { FEATURE_STEPS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureSteps() {
  return (
    <section className="space-y-6 py-16">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Flow
        </p>
        <h2 className="text-3xl font-semibold">How the store works</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          From application to going live, these are the exact checkpoints our
          team uses to ensure vendors are ready to sell on INHIMStore.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {FEATURE_STEPS.map((step, idx) => (
          <Card key={step.title} className="border-border/70">
            <CardHeader>
              <p className="text-xs uppercase text-muted-foreground">
                Step {idx + 1}
              </p>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
