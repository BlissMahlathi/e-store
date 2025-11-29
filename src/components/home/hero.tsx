"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGsap } from "@/hooks/use-gsap";
import { HERO_STATS } from "@/lib/constants";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!heroRef.current) return;
    const targets = heroRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      targets,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" },
    );
  }, []);

  return (
    <section ref={heroRef} className="space-y-10 py-16">
      <div className="rounded-full border border-border/70 px-4 py-1 text-xs uppercase tracking-widest text-muted-foreground" data-animate>
        Built for modern African vendors
      </div>
      <div className="space-y-8" data-animate>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          A minimal marketplace where curated vendors sell products and services with flexible commissions.
        </h1>
        <p className="text-lg text-muted-foreground md:w-3/4">
          Everyone lands as a customer, but with one click they can become a vendor, access dashboards, and unlock
          performance-based discounts above R15,000 over six months.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row" data-animate>
          <Button asChild size="lg">
            <Link href="/vendors/register">
              Start selling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/marketplace">Browse marketplace</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 rounded-3xl border border-border/60 bg-card px-6 py-5 sm:grid-cols-3" data-animate>
        {HERO_STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-semibold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
