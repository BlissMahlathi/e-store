"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
