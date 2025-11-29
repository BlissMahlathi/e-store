import { NextResponse } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const payload = await request.json();
  const supabase = getSupabaseServiceRoleClient();

  if (!supabase) {
    return NextResponse.json({ message: "Supabase service role not configured" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("vendor_applications")
    .insert({
      business_name: payload.businessName,
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      whatsapp: payload.whatsapp,
      social_handle: payload.socialHandle,
      location: payload.location,
      business_address: payload.businessAddress,
      business_description: payload.businessDescription,
      store_description: payload.storeDescription,
      operating_hours: payload.operatingHours,
      delivery_rules: payload.deliveryRules,
      delivery_fee: payload.deliveryFee,
      shopping_methods: payload.shoppingMethods,
      payout_method: payload.payoutMethod,
      cipc_registered: payload.cipcRegistered === "registered",
      company_reg_number: payload.companyRegNumber,
      tax_number: payload.taxNumber,
      id_number: payload.idNumber,
      logo_file_name: payload.logoFileName ?? null,
      store_banner_file_name: payload.storeBannerFileName ?? null,
      id_document_file_name: payload.idDocumentFileName ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ id: data.id });
}
