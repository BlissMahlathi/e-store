"use client";

import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const SHOPPING_OPTIONS = ["self-delivery", "courier", "pickup"] as const;

const schema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email(),
  phone: z.string().min(8, "Enter a valid phone number"),
  whatsapp: z.string().min(8, "WhatsApp number is required"),
  socialHandle: z.string().optional(),
  location: z.string().min(2),
  cipcRegistered: z.enum(["registered", "not_registered"]),
  cipcNumber: z.string().optional(),
  companyRegNumber: z.string().optional(),
  taxNumber: z.string().optional(),
  idNumber: z.string().min(6),
  businessDescription: z.string().min(20),
  businessAddress: z.string().min(6),
  operatingHours: z.string().min(3),
  businessLogo: z.any().optional(),
  storeBanner: z.any().optional(),
  idDocument: z.any().optional(),
  storeDescription: z.string().min(10),
  shoppingMethods: z.array(z.enum(SHOPPING_OPTIONS)).min(1, "Select at least one method"),
  deliveryRules: z.string().min(5),
  deliveryFee: z.string().min(1),
  payoutMethod: z.string(),
  agree: z.boolean().refine(Boolean, "Required"),
});

type FormValues = z.infer<typeof schema>;

const createDefaultValues = (): FormValues => ({
  businessName: "",
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  socialHandle: "",
  location: "",
  cipcRegistered: "registered",
  cipcNumber: "",
  companyRegNumber: "",
  taxNumber: "",
  idNumber: "",
  businessDescription: "",
  businessAddress: "",
  operatingHours: "",
  businessLogo: undefined,
  storeBanner: undefined,
  idDocument: undefined,
  storeDescription: "",
  shoppingMethods: ["self-delivery"],
  deliveryRules: "",
  deliveryFee: "",
  payoutMethod: "bank",
  agree: false,
});

export function VendorOnboardingForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultValues(),
  });

  const shoppingSelection = useWatch({ control: form.control, name: "shoppingMethods" });
  const cipcRegistered = useWatch({ control: form.control, name: "cipcRegistered" });

  const toggleMethod = (method: (typeof SHOPPING_OPTIONS)[number]) => {
    const current = shoppingSelection ?? [];
    if (current.includes(method)) {
      form.setValue(
        "shoppingMethods",
        current.filter((item) => item !== method),
        { shouldValidate: true },
      );
    } else {
      form.setValue("shoppingMethods", [...current, method], { shouldValidate: true });
    }
  };

  const onSubmit = async (values: FormValues) => {
    setStatus(null);
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const { businessLogo, storeBanner, idDocument, shoppingMethods, agree, ...rest } = values;

      Object.entries(rest).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      formData.append("shoppingMethods", JSON.stringify(shoppingMethods));
      formData.append("agree", String(agree));

      if (businessLogo instanceof File) {
        formData.append("businessLogo", businessLogo);
      }
      if (storeBanner instanceof File) {
        formData.append("storeBanner", storeBanner);
      }
      if (idDocument instanceof File) {
        formData.append("idDocument", idDocument);
      }

      const response = await fetch("/api/vendors", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = "Could not submit application. Try again.";
        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch (error) {
          console.warn("Failed to parse vendor application error", error);
        }
        throw new Error(message);
      }

      setStatus("Application captured. Please verify your email so we can notify you once approval is complete.");
      form.reset(createDefaultValues());
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "Could not submit application. Try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cipcNotice = useMemo(
    () =>
      cipcRegistered === "registered"
        ? "Provide your registration or company number so we can verify with CIPC."
        : "If you are not registered, share any supporting docs during verification.",
    [cipcRegistered],
  );

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Business identity</p>
          <h3 className="text-xl font-semibold">Tell us who you are</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Business name</label>
            <Input placeholder="Studio Brava" {...form.register("businessName")} />
          </div>
          <div>
            <label className="text-sm font-medium">Full names (director)</label>
            <Input placeholder="Buhle Naidoo" {...form.register("fullName")} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="you@brand.co" {...form.register("email")} />
          </div>
          <div>
            <label className="text-sm font-medium">Phone number</label>
            <Input type="tel" placeholder="(+27) 82 555 5555" {...form.register("phone")} />
          </div>
          <div>
            <label className="text-sm font-medium">WhatsApp</label>
            <Input type="tel" placeholder="(+27) 82 555 0000" {...form.register("whatsapp")} />
          </div>
          <div>
            <label className="text-sm font-medium">Social handle / contact link</label>
            <Input placeholder="@estorebrand" {...form.register("socialHandle")} />
          </div>
          <div>
            <label className="text-sm font-medium">Business location</label>
            <Input placeholder="Johannesburg, Gauteng" {...form.register("location")} />
          </div>
          <div>
            <label className="text-sm font-medium">Business address</label>
            <Textarea rows={2} placeholder="Street, suburb, city" {...form.register("businessAddress")} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Compliance</p>
            <h3 className="text-xl font-semibold">CIPC & tax info</h3>
          </div>
          <Badge variant="secondary">Secure upload</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">CIPC registration status</label>
            <Controller
              control={form.control}
              name="cipcRegistered"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="not_registered">Not registered</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <p className="mt-1 text-xs text-muted-foreground">{cipcNotice}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Company registration number</label>
            <Input placeholder="K2023/123456/07" {...form.register("companyRegNumber")} />
          </div>
          <div>
            <label className="text-sm font-medium">Tax number</label>
            <Input placeholder="1234/567/890" {...form.register("taxNumber")} />
          </div>
          <div>
            <label className="text-sm font-medium">National ID number</label>
            <Input placeholder="8801015800087" {...form.register("idNumber")} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Controller
            control={form.control}
            name="businessLogo"
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium">Business logo</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => field.onChange(event.target.files?.[0] ?? null)}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            )}
          />
          <Controller
            control={form.control}
            name="storeBanner"
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium">Store banner</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => field.onChange(event.target.files?.[0] ?? null)}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            )}
          />
          <Controller
            control={form.control}
            name="idDocument"
            render={({ field }) => (
              <div>
                <label className="text-sm font-medium">ID copy/photo</label>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(event) => field.onChange(event.target.files?.[0] ?? null)}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            )}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Store setup</p>
          <h3 className="text-xl font-semibold">What customers will see</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Business description</label>
            <Textarea rows={4} placeholder="Share your origin story, proof of traction, or key differentiators" {...form.register("businessDescription")} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Store description</label>
            <Textarea rows={3} placeholder="How should customers experience your storefront?" {...form.register("storeDescription")} />
          </div>
          <div>
            <label className="text-sm font-medium">Operating hours</label>
            <Input placeholder="Mon - Fri, 09:00 - 18:00" {...form.register("operatingHours")} />
          </div>
          <div>
            <label className="text-sm font-medium">Delivery fee / rules</label>
            <Textarea rows={2} placeholder="R100 courier nationwide, free pickup" {...form.register("deliveryRules")} />
          </div>
          <div>
            <label className="text-sm font-medium">Delivery fee estimate</label>
            <Input placeholder="e.g. R120 or 'per quote'" {...form.register("deliveryFee")} />
          </div>
          <div>
            <label className="text-sm font-medium">Shopping methods</label>
            <div className="flex flex-wrap gap-2">
              {SHOPPING_OPTIONS.map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => toggleMethod(method)}
                  className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${shoppingSelection?.includes(method) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
                >
                  {method.replace("-", " ")}
                </button>
              ))}
            </div>
            {form.formState.errors.shoppingMethods ? (
              <p className="text-xs text-red-500">{form.formState.errors.shoppingMethods.message}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Payout preferences</p>
          <h3 className="text-xl font-semibold">Where should we pay you?</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Payout method</label>
            <Controller
              control={form.control}
              name="payoutMethod"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank transfer</SelectItem>
                    <SelectItem value="wallet">Paystack settlement wallet</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">Verification roadmap</p>
          <p className="mb-2">
            Email & phone verification plus payout banking details can be completed from your vendor dashboard once you are accepted.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Email verify pending</Badge>
            <Badge variant="secondary">Phone verify pending</Badge>
            <Badge variant="secondary">Payment setup later</Badge>
          </div>
        </div>
      </section>

      <div className="flex items-start gap-2">
        <input type="checkbox" id="agree" {...form.register("agree")}
          className="mt-1 h-4 w-4 rounded border-border" />
        <label htmlFor="agree" className="text-sm">
          I confirm all details are accurate and grant e-store permission to validate my information with CIPC, SARS, and Paystack.
        </label>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit application"}
      </Button>
      {status ? <p className="text-sm text-primary">{status}</p> : null}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </form>
  );
}
