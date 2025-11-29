import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="space-y-6 py-16">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Trust</p>
        <h2 className="text-2xl font-semibold">Vendors & admins love it</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <Card key={item.author} className="border-border/70">
            <CardContent className="space-y-4 p-6">
              <p className="text-lg">“{item.quote}”</p>
              <p className="text-sm text-muted-foreground">
                {item.author} · {item.role}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
