"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useGsap } from "@/hooks/use-gsap";
import gsap from "gsap";
import { COMPANY_NAME } from "@/lib/constants";

export function LoadingScreen() {
  const pulseRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!pulseRef.current) return;
    gsap.to(pulseRef.current, {
      scale: 1.05,
      opacity: 1,
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-zinc-950 text-white">
      <div ref={pulseRef} className="rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.3em]">
        {COMPANY_NAME}
      </div>
      <Loader2 className="h-8 w-8 animate-spin text-white" />
      <p className="text-sm text-white/70">Loading curated vendors…</p>
    </div>
  );
}
