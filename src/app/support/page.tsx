import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Support | e-store" };

const faqs = [
  {
    q: "How do commissions work?",
    a: "We start at 12% per transaction and re-evaluate every quarter based on performance tiers.",
  },
  {
    q: "When are payouts processed?",
    a: "Weekly on Fridays with instant payouts coming soon for vendors in R15k+ tiers.",
  },
  { q: "Can I sell both products and services?", a: "Yes. We support hybrid catalogs and multi-location fulfillment." },
];

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Help center</p>
        <h1 className="text-4xl font-semibold">Support & resources</h1>
        <p className="mt-4 text-muted-foreground md:w-2/3">
          Message the main admin, browse FAQs, or schedule onboarding time.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Chat with us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Live weekdays 08:00 - 18:00 SAST.</p>
            <Button className="w-full">Open chat</Button>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Schedule call</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>One-on-one onboarding sessions for new vendors.</p>
            <Button variant="outline" className="w-full">
              Book slot
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Knowledge base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Guides, payouts, legal docs.</p>
            <Button variant="ghost" className="w-full">
              Browse articles
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        {faqs.map((item) => (
          <Card key={item.q} className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">{item.q}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{item.a}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
