"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Store, Shield } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGsap } from "@/hooks/use-gsap";
import { HERO_STATS, COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGsap(() => {
    if (!heroRef.current) return;
    const targets = heroRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      targets,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="space-y-10 py-16"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      {/* Announcement Badge */}
      <div
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground"
        data-animate
        role="status"
        aria-label="Launch announcement"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
        </span>
        {COMPANY_TAGLINE} · Launching Jan 2026
      </div>

      {/* Main Hero Content */}
      <header className="space-y-8" data-animate>
        <h1
          id="hero-heading"
          className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          itemProp="headline"
        >
          South Africa's Most Trusted{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Multi-Vendor Marketplace
          </span>
        </h1>
        <p
          className="text-lg leading-relaxed text-muted-foreground md:w-3/4 md:text-xl"
          itemProp="description"
        >
          Shop quality products from{" "}
          <strong>140+ verified local vendors</strong>. Secure payments via
          Paystack, curated selections, and exceptional customer service.{" "}
          {COMPANY_NAME} connects you with South Africa's finest artisans,
          creators, and businesses.
        </p>

        {/* Trust Indicators */}
        <div
          className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          data-animate
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-green-600" aria-hidden="true" />
            <span>Secure Payments</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Store className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Verified Vendors</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Quality Guaranteed</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <nav
          className="flex flex-col gap-4 sm:flex-row"
          data-animate
          aria-label="Get started"
        >
          <Button
            asChild
            size="lg"
            className="text-base font-semibold shadow-lg"
          >
            <Link href="/marketplace" aria-label="Shop now in the marketplace">
              <ShoppingBag className="mr-2 h-5 w-5" aria-hidden="true" />
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link
              href="/vendors/register"
              aria-label="Register to become a vendor"
            >
              Become a Vendor
            </Link>
          </Button>
        </nav>
      </header>

      {/* Stats Section */}
      <aside
        className="grid gap-6 rounded-3xl border border-border/60 bg-gradient-to-br from-card to-muted/30 px-8 py-8 shadow-sm sm:grid-cols-3"
        data-animate
        aria-label="Key statistics"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {HERO_STATS.map((stat, index) => (
          <article
            key={stat.label}
            className="text-center sm:text-left"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content={String(index + 1)} />
            <p className="text-4xl font-bold tracking-tight" itemProp="name">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
          </article>
        ))}
      </aside>
    </section>
  );
}
