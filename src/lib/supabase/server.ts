import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export async function getSupabaseServerClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const safeMutate = (fn: () => void) => {
    try {
      fn();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Supabase cookie mutation skipped", error);
      }
    }
  };

  if (!url || !anon) {
    throw new Error("Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return createServerClient<Database>(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        safeMutate(() => cookieStore.set({ name, value, ...options }));
      },
      remove(name, options) {
        safeMutate(() => cookieStore.set({ name, value: "", ...options }));
      },
    },
  });
}
