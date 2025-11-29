import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "About | e-store" };

const pillars = [
  { title: "Curation", body: "Every vendor goes through a quality review before listing." },
  { title: "Transparency", body: "Commission-only model keeps incentives aligned for admins and vendors." },
  { title: "Community", body: "We mentor emerging founders through roundtables and design clinics." },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Our story</p>
        <h1 className="text-4xl font-semibold">Minimal commerce for ambitious vendors</h1>
        <p className="mt-4 text-muted-foreground md:w-2/3">
          e-store started as an internal tool for the main admin to onboard side-hustle brands. Today it powers hundreds of
          African vendors selling tangible goods, services, and curated experiences.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.title} className="border-border/70">
            <CardContent className="space-y-2 p-6">
              <p className="text-sm uppercase text-muted-foreground">{pillar.title}</p>
              <p>{pillar.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/60">
        <CardContent className="space-y-2 p-6 text-sm text-muted-foreground">
          <p>HQ: Remote-first · Johannesburg, Lagos, Kigali</p>
          <p>Stack: Next.js, Tailwind, shadcn/ui, Chart.js, GSAP, Supabase (coming soon)</p>
        </CardContent>
      </Card>
    </div>
  );
}
