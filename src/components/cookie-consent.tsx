"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "estore-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem(COOKIE_KEY);
  });

  const accept = () => {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `${COOKIE_KEY}=accepted; path=/; expires=${expires.toUTCString()}`;
    window.localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-border bg-background/90 p-4 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium">We respect your privacy</p>
          <p className="text-sm text-muted-foreground">
            Cookies keep your role, consent, and session preferences synced across visits. Continue to accept.
          </p>
        </div>
        <Button onClick={accept} className="w-full md:w-auto">
          Accept & Continue
        </Button>
      </div>
    </div>
  );
}
