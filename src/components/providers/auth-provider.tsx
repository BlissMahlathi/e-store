"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useSupabase } from "@/components/providers/supabase-provider";
import { ALLOWED_ROLES, type UserRole } from "@/lib/constants";

type AuthContextValue = {
  role: UserRole;
  user: User | null;
  emailVerified: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function deriveRole(session: Session | null): UserRole {
  const raw = (session?.user?.app_metadata?.role ?? session?.user?.user_metadata?.role) as string | undefined;
  if (raw && ALLOWED_ROLES.includes(raw as UserRole)) {
    return raw as UserRole;
  }
  if (session?.user) {
    return "customer";
  }
  return "guest";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useSupabase(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(supabase));
  const profileSeedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let mounted = true;

    const syncSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setIsLoading(false);
    };

    syncSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const user = session?.user;

    if (!supabase || !user?.id) {
      return;
    }

    if (!user.email_confirmed_at) {
      return;
    }

    if (profileSeedRef.current === user.id) {
      return;
    }

    let cancelled = false;

    const ensureProfileRow = async () => {
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (cancelled) return;

        if (error && status !== 406) {
          console.error("Unable to load profile", error);
          profileSeedRef.current = user.id;
          return;
        }

        if (data?.id) {
          profileSeedRef.current = user.id;
          return;
        }

        const displayName =
          (user.user_metadata?.display_name as string | undefined)?.trim() ||
          (user.user_metadata?.full_name as string | undefined)?.trim() ||
          user.email?.split("@")[0] ||
          "Customer";

        const preferredLocale = (user.user_metadata?.preferred_locale as string | undefined)?.trim() || "en-ZA";
        const role = deriveRole(session);

        try {
          const response = await fetch("/api/profile/seed", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({
              displayName,
              phone: (user.user_metadata?.phone as string | undefined) ?? null,
              preferredLocale,
              marketingOptIn: Boolean(user.user_metadata?.marketing_opt_in),
              role,
            }),
          });

          if (!response.ok) {
            const details = await response.json().catch(() => ({}));
            console.error("Unable to seed profile", details);
            return;
          }
        } catch (seedError) {
          console.error("Unable to seed profile", seedError);
          return;
        }

        profileSeedRef.current = user.id;
      } catch (error) {
        if (!cancelled) {
          console.error("Profile bootstrap failed", error);
        }
      }
    };

    ensureProfileRow();

    return () => {
      cancelled = true;
    };
  }, [session, session?.user?.id, session?.user?.email_confirmed_at, session?.user?.user_metadata, session?.user?.email, supabase]);

  const value = useMemo<AuthContextValue>(() => {
    const role = deriveRole(session);
    const emailVerified = Boolean(session?.user?.email_confirmed_at);
    return {
      role,
      user: session?.user ?? null,
      emailVerified,
      isAuthenticated: Boolean(session?.user),
      isLoading,
      signOut: async () => {
        if (supabase) {
          await supabase.auth.signOut();
        }
        setSession(null);
      },
    };
  }, [session, isLoading, supabase]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
