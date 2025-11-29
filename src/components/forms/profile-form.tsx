"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FALLBACK_LOCALE = "en-ZA";
const localeOptions = [
  { value: "en-ZA", label: "English (South Africa)" },
  { value: "en-GB", label: "English (United Kingdom)" },
  { value: "en-US", label: "English (United States)" },
  { value: "af-ZA", label: "Afrikaans" },
];

interface ProfileState {
  displayName: string;
  phone: string;
  preferredLocale: string;
  marketingOptIn: boolean;
  headline: string;
  supportEmail: string;
  whatsapp: string;
  location: string;
  website: string;
}

const emptyState: ProfileState = {
  displayName: "",
  phone: "",
  preferredLocale: FALLBACK_LOCALE,
  marketingOptIn: false,
  headline: "",
  supportEmail: "",
  whatsapp: "",
  location: "",
  website: "",
};

export function ProfileForm() {
  const supabase = useSupabase(true);
  const { user, role } = useAuth();
  const [form, setForm] = useState<ProfileState>(emptyState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const normalizedRole = useMemo(() => {
    if (!role || role === "guest") return "customer";
    return role;
  }, [role]);

  useEffect(() => {
    if (!supabase || !user) {
      return;
    }

    let active = true;

    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error, status } = await supabase
        .from("profiles")
        .select("display_name,phone,preferred_locale,marketing_opt_in")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      if (error && status !== 406) {
        console.error("Failed to load profile", error);
        setError(error.message);
        setIsLoading(false);
        return;
      }

      const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
      const metaString = (key: string, fallback = "") => {
        const value = metadata[key];
        return typeof value === "string" ? value : fallback;
      };

      setForm({
        displayName: data?.display_name ?? metaString("display_name"),
        phone: data?.phone ?? metaString("phone"),
        preferredLocale: data?.preferred_locale ?? FALLBACK_LOCALE,
        marketingOptIn: Boolean(data?.marketing_opt_in),
        headline: metaString("headline"),
        supportEmail: metaString("support_email", user.email ?? ""),
        whatsapp: metaString("whatsapp"),
        location: metaString("location"),
        website: metaString("website"),
      });
      setIsLoading(false);
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [supabase, user]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleLocaleChange = (value: string) => {
    setForm((previous) => ({ ...previous, preferredLocale: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!supabase || !user) {
      setError("You need to be signed in to update your profile.");
      return;
    }

    setIsSaving(true);
    setStatus(null);
    setError(null);

    const payload = {
      id: user.id,
      display_name: form.displayName.trim() || null,
      phone: form.phone.trim() || null,
      preferred_locale: form.preferredLocale || FALLBACK_LOCALE,
      marketing_opt_in: form.marketingOptIn,
      role: normalizedRole,
    };

    const { error: updateError } = await supabase.from("profiles").upsert(payload);
    setIsSaving(false);

    if (updateError) {
      console.error("Profile update failed", updateError);
      setError(updateError.message);
      return;
    }

    const metadataPayload = {
      display_name: payload.display_name ?? undefined,
      headline: form.headline.trim() || null,
      support_email: form.supportEmail.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      location: form.location.trim() || null,
      website: form.website.trim() || null,
      phone: payload.phone ?? undefined,
    };

    const { error: metadataError } = await supabase.auth.updateUser({ data: metadataPayload });

    if (metadataError) {
      console.error("Metadata update failed", metadataError);
      setError(metadataError.message);
      return;
    }

    setStatus("Profile updated successfully.");
  };

  if (!user) {
    return <p className="text-sm text-muted-foreground">Sign in to edit your profile.</p>;
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="display-name">
            Display name
          </label>
          <Input
            id="display-name"
            name="displayName"
            value={form.displayName}
            disabled={isLoading || isSaving}
            onChange={handleInputChange}
            placeholder="e.g. INHIM Vendor"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="headline">
            Public headline
          </label>
          <Textarea
            id="headline"
            name="headline"
            value={form.headline}
            disabled={isLoading || isSaving}
            onChange={handleInputChange}
            placeholder="Short blurb customers will see"
            rows={3}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="phone">
            Phone number
          </label>
          <Input
            id="phone"
            name="phone"
            value={form.phone}
            disabled={isLoading || isSaving}
            onChange={handleInputChange}
            placeholder="071 000 0000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="whatsapp">
            WhatsApp number
          </label>
          <Input
            id="whatsapp"
            name="whatsapp"
            value={form.whatsapp}
            disabled={isLoading || isSaving}
            onChange={handleInputChange}
            placeholder="+2771 000 0000"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="support-email">
            Support email
          </label>
          <Input
            id="support-email"
            type="email"
            name="supportEmail"
            value={form.supportEmail}
            disabled={isLoading || isSaving}
            onChange={handleInputChange}
            placeholder="support@inhim.store"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="location">
            Location
          </label>
          <Input
            id="location"
            name="location"
            value={form.location}
            disabled={isLoading || isSaving}
            onChange={handleInputChange}
            placeholder="Johannesburg, ZA"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="website">
          Website / storefront link
        </label>
        <Input
          id="website"
          type="url"
          name="website"
          value={form.website}
          disabled={isLoading || isSaving}
          onChange={handleInputChange}
          placeholder="https://"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Preferred locale</label>
        <Select value={form.preferredLocale} onValueChange={handleLocaleChange} disabled={isLoading || isSaving}>
          <SelectTrigger>
            <SelectValue placeholder="Select locale" />
          </SelectTrigger>
          <SelectContent>
            {localeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <label className="flex items-start gap-3 rounded-xl border border-border/60 px-3 py-2 text-sm">
        <input
          type="checkbox"
          name="marketingOptIn"
          checked={form.marketingOptIn}
          disabled={isLoading || isSaving}
          onChange={handleInputChange}
          className="mt-1 h-4 w-4 rounded border-border/80"
        />
        <span>
          <span className="font-medium">Marketing updates</span>
          <span className="block text-muted-foreground">Opt in to marketplace announcements and incentive alerts.</span>
        </span>
      </label>
      <Button type="submit" className="w-full" disabled={isLoading || isSaving}>
        {isSaving ? "Saving..." : "Save changes"}
      </Button>
      {status ? (
        <Alert>
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
