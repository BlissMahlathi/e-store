import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, ShieldCheck, Handshake, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = { title: `About | ${COMPANY_NAME}` };

const stats = [
  { label: "CIPC registration", value: "2018", detail: "INHIM Trading (Pty) Ltd" },
  { label: "Launch plan", value: "Jan 2026", detail: "Pilot operations Q4 2025" },
  { label: "Leadership seats", value: "2", detail: "Director + Store Manager" },
  { label: "Vendor interest", value: "140+", detail: "Pre-qualified artisans" },
];

const values = [
  {
    title: "Hands-on curation",
    description: "We cap onboarding so every product story, photoshoot, and delivery promise is reviewed with the vendor.",
    icon: Sparkles,
  },
  {
    title: "Director-level oversight",
    description: "Bliss personally reviews commissions, contracts, and compliance before vendors go live.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent payouts",
    description: "Payout logic and commission tiers are authored by INHIM Trading—no hidden markups.",
    icon: Handshake,
  },
  {
    title: "Community uplift",
    description: "Cynthia keeps vendors in the loop with weekly office hours, WhatsApp check-ins, and launch rehearsals.",
    icon: Users,
  },
];

const milestones = [
  { year: "2018", title: "CIPC registration", body: "Inhim Trading (Pty) Ltd incorporated to formalize compliance and finance operations." },
  { year: "2023", title: "Marketplace blueprint", body: "Rebuilt the playbook for a curated omnichannel marketplace now called INHIMStore." },
  { year: "2025", title: "Pilot readiness", body: "Finalizing vendor interest list, fulfilment partners, and customer support workflows." },
  { year: "2026", title: "Public opening", body: "Operations switch on in January with Gauteng vendors, then expand nationally." },
];

const team = [
  {
    name: "Bliss Mahlathi",
    role: "Director, INHIM Trading",
    focus: "Sole director overseeing strategy, legal, and capital while meeting every vendor personally.",
  },
  {
    name: "Cynthia Maebeja",
    role: "Store & Vendor Manager",
    focus: "Guides catalogs, logistics, and day-to-day support so launch vendors are never left guessing.",
  },
];

export default function AboutPage() {
  return (
    <section className="space-y-12">
      <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:items-start">
        <div className="space-y-6">
          <Badge variant="outline" className="w-fit uppercase tracking-wide">
            {COMPANY_TAGLINE}
          </Badge>
          <div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              {COMPANY_NAME} is the curated marketplace operated directly by INHIM Trading
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Bliss Mahlathi is currently the only director of INHIM Trading, and Cynthia Maebeja manages daily vendor
              relationships. Together we are preparing INHIMStore for a controlled pilot before flipping on full operations
              in January 2026.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Pilot testing begins later this year with a limited catalog so that fulfilment, payouts, and customer care are
              tuned before the public opening.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/marketplace">Shop the marketplace</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/vendors/register">Become a vendor</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Rooted in Nkowankowa, Limpopo with a remote-first team supporting launch.</p>
        </div>
        <Card className="border-border/60 bg-muted/30">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl">Operating readiness</CardTitle>
            <CardDescription>
              Every system—catalog, payouts, customer care—is rehearsed with real vendors before the January 2026 launch.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              We coordinate pilots through private Slack groups, WhatsApp hotlines, and in-person vendor visits. Logistics,
              packaging, and payments are tested in small batches so we can publish accurate SLAs on day one.
            </p>
            <p>
              The cadence: vendor rehearsal months (now), Gauteng soft launch (Q4 2025), nationwide customer access (January
              2026).
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/70">
            <CardContent className="space-y-1 p-5">
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Card className="border-border/70">
          <CardHeader className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit uppercase">Values</Badge>
            <CardTitle className="text-2xl">Operating principles</CardTitle>
            <CardDescription>How INHIM Trading keeps vendor trust while scaling a boutique experience.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-2xl border border-dashed border-border/70 p-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-2xl bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-semibold">{value.title}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Moments that shaped the platform we ship today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {milestones.map((milestone, index) => (
              <div key={milestone.title}>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{milestone.title}</span>
                  <span className="text-xs text-muted-foreground">{milestone.year}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{milestone.body}</p>
                {index < milestones.length - 1 ? <Separator className="my-4" /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">People</p>
          <h2 className="text-2xl font-semibold">People currently operating {COMPANY_NAME}</h2>
          <p className="text-muted-foreground md:w-2/3">
            We stay intentionally lean until the marketplace is live. You always speak directly to a decision-maker—no
            outsourced call centers.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {team.map((person) => (
            <Card key={person.name} className="border-border/70">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">{person.name}</CardTitle>
                <CardDescription>{person.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{person.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
