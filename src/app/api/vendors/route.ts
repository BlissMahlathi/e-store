import { NextResponse } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/admin";
import { uploadFileToBucket } from "@/lib/supabase/storage";

const MEDIA_BUCKET = "vendor-media";
const DOCUMENTS_BUCKET = "vendor-documents";

export async function POST(request: Request) {
  const formData = await request.formData();
  const supabase = getSupabaseServiceRoleClient();

  if (!supabase) {
    return NextResponse.json({ message: "Supabase service role not configured" }, { status: 500 });
  }

  const getString = (key: string, required = false) => {
    const value = formData.get(key);
    if (typeof value === "string") {
      return value;
    }
    if (required) {
      throw new Error(`Missing field: ${key}`);
    }
    return "";
  };

  const getOptionalString = (key: string) => {
    const value = formData.get(key);
    if (typeof value === "string" && value.trim().length) {
      return value;
    }
    return null;
  };

  const getFile = (key: string) => {
    const value = formData.get(key);
    if (value instanceof File && value.size > 0) {
      return value;
    }
    return null;
  };

  const parseShoppingMethods = () => {
    const raw = getString("shoppingMethods");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Failed to parse shoppingMethods", error);
      return [];
    }
  };

  let logoPath: string | null = null;
  let bannerPath: string | null = null;
  let idDocumentPath: string | null = null;

  try {
    const [logo, banner, idDocument] = await Promise.all([
      uploadFileToBucket(supabase, MEDIA_BUCKET, "logos", getFile("businessLogo")),
      uploadFileToBucket(supabase, MEDIA_BUCKET, "banners", getFile("storeBanner")),
      uploadFileToBucket(supabase, DOCUMENTS_BUCKET, "ids", getFile("idDocument")),
    ]);
    logoPath = logo;
    bannerPath = banner;
    idDocumentPath = idDocument;
  } catch (error) {
    console.error("Supabase storage upload failed", error);
    return NextResponse.json({ message: "Could not upload documents. Please try again." }, { status: 500 });
  }

  const shoppingMethods = parseShoppingMethods();

  const { data, error } = await supabase
    .from("vendor_applications")
    .insert({
      business_name: getString("businessName", true),
      full_name: getString("fullName", true),
      email: getString("email", true),
      phone: getString("phone", true),
      whatsapp: getString("whatsapp", true),
      social_handle: getOptionalString("socialHandle"),
      location: getString("location", true),
      business_address: getString("businessAddress", true),
      business_description: getString("businessDescription", true),
      store_description: getString("storeDescription", true),
      operating_hours: getString("operatingHours", true),
      delivery_rules: getString("deliveryRules", true),
      delivery_fee: getString("deliveryFee", true),
      shopping_methods: shoppingMethods,
      payout_method: getString("payoutMethod", true),
      cipc_registered: getString("cipcRegistered") === "registered",
      company_reg_number: getOptionalString("companyRegNumber"),
      tax_number: getOptionalString("taxNumber"),
      id_number: getString("idNumber", true),
      logo_file_name: logoPath,
      store_banner_file_name: bannerPath,
      id_document_file_name: idDocumentPath,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ id: data.id });
}
