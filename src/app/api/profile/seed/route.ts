import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/constants";
import { ALLOWED_ROLES } from "@/lib/constants";

type SeedPayload = {
  displayName?: string | null;
  phone?: string | null;
  preferredLocale?: string | null;
  marketingOptIn?: boolean;
  role?: UserRole;
};

const fallbackLocale = "en-ZA";

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json({ message: userError.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    let payload: SeedPayload = {};
    try {
      payload = (await request.json()) as SeedPayload;
    } catch (error) {
      console.warn("Profile seed endpoint received invalid body", error);
    }

    const role: UserRole = payload.role && ALLOWED_ROLES.includes(payload.role) ? payload.role : "customer";

    const upsertPayload = {
      id: user.id,
      display_name:
        payload.displayName?.trim() ||
        (user.user_metadata?.display_name as string | undefined)?.trim() ||
        user.email?.split("@")[0] ||
        "Customer",
      phone: payload.phone?.trim() || (user.user_metadata?.phone as string | undefined) || null,
      preferred_locale:
        payload.preferredLocale?.trim() || (user.user_metadata?.preferred_locale as string | undefined) || fallbackLocale,
      marketing_opt_in: Boolean(payload.marketingOptIn ?? user.user_metadata?.marketing_opt_in),
      role,
    };

    const { error: upsertError } = await supabase.from("profiles").upsert(upsertPayload, { onConflict: "id" });

    if (upsertError) {
      return NextResponse.json({ message: upsertError.message }, { status: 400 });
    }

    return NextResponse.json({ id: user.id });
  } catch (error) {
    console.error("Profile seed endpoint failed", error);
    return NextResponse.json({ message: "Unable to seed profile" }, { status: 500 });
  }
}
