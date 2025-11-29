"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const schema = z.object({
  applicantName: z.string().min(2),
  applicantEmail: z.string().email(),
  applicantPhone: z.string().min(6),
  businessStructure: z.enum(["pty", "ngo", "sole", "partnership"]),
  nameOptionOne: z.string().min(2),
  nameOptionTwo: z.string().optional(),
  directors: z.string().min(5),
  address: z.string().min(5),
  additionalNotes: z.string().optional(),
  idDocument: z.any().optional(),
  proofOfAddress: z.any().optional(),
});

export type RegistrationFormValues = z.infer<typeof schema>;

export function CipcRegistrationForm() {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      businessStructure: "pty",
      nameOptionOne: "",
      nameOptionTwo: "",
      directors: "",
      address: "",
      additionalNotes: "",
      idDocument: undefined,
      proofOfAddress: undefined,
    },
  });

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: RegistrationFormValues) => {
    setStatus(null);
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) return;
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (values.idDocument instanceof File) {
      formData.append("idDocument", values.idDocument);
    }
    if (values.proofOfAddress instanceof File) {
      formData.append("proofOfAddress", values.proofOfAddress);
    }

    const response = await fetch("/api/cipc-registrations", { method: "POST", body: formData });
    setIsSubmitting(false);

    if (!response.ok) {
      try {
        const data = await response.json();
        setError(data.message ?? "Could not submit form");
      } catch {
        setError("Could not submit form");
      }
      return;
    }

    setStatus("Submitted to INHIM Trading compliance desk. Expect a response within 24 hours.");
    form.reset();
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Applicant name</label>
          <Input placeholder="Full legal name" {...form.register("applicantName")} />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="you@email.com" {...form.register("applicantEmail")} />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <Input placeholder="(+27)" {...form.register("applicantPhone")} />
        </div>
        <div>
          <label className="text-sm font-medium">Business structure</label>
          <Controller
            control={form.control}
            name="businessStructure"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pty">Private company (Pty) Ltd</SelectItem>
                  <SelectItem value="ngo">NGO / NPO</SelectItem>
                  <SelectItem value="sole">Sole proprietor</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Preferred name option 1</label>
          <Input placeholder="Primary name" {...form.register("nameOptionOne")} />
        </div>
        <div>
          <label className="text-sm font-medium">Preferred name option 2</label>
          <Input placeholder="Secondary name" {...form.register("nameOptionTwo")} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Director / member details</label>
        <Textarea rows={4} placeholder="List each director with ID number" {...form.register("directors")} />
      </div>
      <div>
        <label className="text-sm font-medium">Registered address</label>
        <Textarea rows={3} placeholder="Street, suburb, city" {...form.register("address")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={form.control}
          name="idDocument"
          render={({ field }) => (
            <div>
              <label className="text-sm font-medium">Certified ID (PDF/JPG)</label>
              <Input type="file" accept="image/*,application/pdf" onChange={(event) => field.onChange(event.target.files?.[0] ?? null)} />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name="proofOfAddress"
          render={({ field }) => (
            <div>
              <label className="text-sm font-medium">Proof of address</label>
              <Input type="file" accept="image/*,application/pdf" onChange={(event) => field.onChange(event.target.files?.[0] ?? null)} />
            </div>
          )}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Additional notes</label>
        <Textarea rows={3} placeholder="Tax, bank, or compliance notes" {...form.register("additionalNotes")} />
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit to INHIM Trading"}
      </Button>
      {status ? (
        <Alert>
          <AlertTitle>Submitted</AlertTitle>
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Issue detected</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
