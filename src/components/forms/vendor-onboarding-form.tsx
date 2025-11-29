"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  brandName: z.string().min(2),
  email: z.string().email(),
  category: z.string(),
  description: z.string().min(10),
  payoutMethod: z.string(),
  agree: z.boolean().refine(Boolean, "Required"),
});

type FormValues = z.infer<typeof schema>;

export function VendorOnboardingForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      brandName: "",
      email: "",
      category: "products",
      description: "",
      payoutMethod: "bank",
      agree: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.table(values);
    form.reset();
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm font-medium">Brand name</label>
        <Input placeholder="Studio Brava" {...form.register("brandName")} />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input type="email" placeholder="you@brand.co" {...form.register("email")} />
      </div>
      <div>
        <label className="text-sm font-medium">Primary category</label>
        <Controller
          control={form.control}
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="experiences">Experiences</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Catalog summary</label>
        <Textarea rows={4} placeholder="Tell us what you sell" {...form.register("description")} />
      </div>
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
                <SelectItem value="wallet">Digital wallet</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
        <p className="mb-2 font-medium text-foreground">Commission reminder</p>
        <p>You start at 12% commission. Sell R15,000 in 6 months to receive a 3% discount on fees.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary">Weekly payouts</Badge>
          <Badge variant="secondary">Shipped & digital SKUs</Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="agree" {...form.register("agree")}
          className="h-4 w-4 rounded border-border" />
        <label htmlFor="agree" className="text-sm">
          I agree to the vendor terms & data policy.
        </label>
      </div>
      <Button type="submit" className="w-full">
        Submit application
      </Button>
    </form>
  );
}
