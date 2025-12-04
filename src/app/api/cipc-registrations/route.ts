import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/admin";
import { uploadFileToBucket } from "@/lib/supabase/storage";
import { COMPANY_NAME, REGISTRATION_EMAIL } from "@/lib/constants";

const DOCUMENT_BUCKET = "registration-documents";
type CipcRegistrationRow = {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  business_structure: string;
  name_option_one: string;
  name_option_two?: string | null;
  directors: string[];
  address: string;
  additional_notes?: string | null;
  id_document_path?: string | null;
  proof_of_address_path?: string | null;
  status?: string;
  created_at?: string;
};

type CipcRegistrationInsert = Omit<CipcRegistrationRow, "id" | "created_at">;
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
});

export async function POST(request: Request) {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ message: "Supabase service role not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();

    const getString = (key: string) => {
      const value = formData.get(key);
      if (typeof value !== "string") {
        throw new Error(`Missing field: ${key}`);
      }
      return value;
    };

    const values = schema.parse({
      applicantName: getString("applicantName"),
      applicantEmail: getString("applicantEmail"),
      applicantPhone: getString("applicantPhone"),
      businessStructure: getString("businessStructure"),
      nameOptionOne: getString("nameOptionOne"),
      nameOptionTwo: formData.get("nameOptionTwo") as string | null,
      directors: getString("directors"),
      address: getString("address"),
      additionalNotes: (formData.get("additionalNotes") as string | null) ?? undefined,
    });

    const directorList = values.directors
      .split(/\n|;/)
      .map((entry) => entry.trim())
      .filter(Boolean);

    const idDocumentPath = await uploadFileToBucket(
      supabase,
      DOCUMENT_BUCKET,
      "ids",
      formData.get("idDocument") instanceof File ? (formData.get("idDocument") as File) : null,
    );
    const proofOfAddressPath = await uploadFileToBucket(
      supabase,
      DOCUMENT_BUCKET,
      "proof",
      formData.get("proofOfAddress") instanceof File ? (formData.get("proofOfAddress") as File) : null,
    );

    const payload: CipcRegistrationInsert = {
      applicant_name: values.applicantName,
      applicant_email: values.applicantEmail,
      applicant_phone: values.applicantPhone,
      business_structure: values.businessStructure,
      name_option_one: values.nameOptionOne,
      name_option_two: values.nameOptionTwo,
      directors: directorList,
      address: values.address,
      additional_notes: values.additionalNotes,
      id_document_path: idDocumentPath,
      proof_of_address_path: proofOfAddressPath,
    };

    const { data, error } = await supabase
      .from("cipc_registration_requests")
      .insert(payload as never)
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const resendKey = process.env.RESEND_API_KEY;
    const forwardEmail = process.env.REGISTRATION_FORWARD_EMAIL ?? REGISTRATION_EMAIL;
    if (resendKey) {
      const inserted = data as Pick<CipcRegistrationRow, "id">;
      const summary = `New CIPC registration request from ${values.applicantName} (${values.applicantEmail}).`;
      const hostnameFromRequest = (() => {
        try {
          return new URL(request.url).hostname;
        } catch {
          return null;
        }
      })();
      const fromHostname = hostnameFromRequest ?? "inhimstore.local";
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `${COMPANY_NAME} <no-reply@${fromHostname}>`,
            to: [forwardEmail],
            subject: `CIPC registration request ${inserted.id}`,
            text: `${summary}\nCompany type: ${values.businessStructure}\nPreferred name: ${values.nameOptionOne}\nDirectors: ${directorList.join(", ")}`,
          }),
        });
      } catch (notificationError) {
        console.error("Failed to send registration email", notificationError);
      }
    }

    return NextResponse.json({ id: (data as Pick<CipcRegistrationRow, "id">).id });
  } catch (error) {
    console.error("CIPC registration error", error);
    const message = error instanceof Error ? error.message : "Unable to submit registration";
    return NextResponse.json({ message }, { status: 400 });
  }
}
