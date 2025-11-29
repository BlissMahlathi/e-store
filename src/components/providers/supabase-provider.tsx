"use client";

import { createContext, useContext, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const SupabaseContext = createContext<SupabaseClient<Database> | null>(null);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    try {
      return getSupabaseBrowserClient();
    } catch (error) {
      console.warn("Supabase client unavailable", error);
      return null;
    }
  });

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export function useSupabase(optional = false) {
  const client = useContext(SupabaseContext);
  if (!client && !optional) {
    throw new Error("Supabase client unavailable. Ensure SupabaseProvider is configured.");
  }
  return client;
}
