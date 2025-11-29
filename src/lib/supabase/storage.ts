import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.-]+/g, "-");
}

export async function uploadFileToBucket(
  supabase: SupabaseClient<Database>,
  bucket: string,
  folder: string,
  file: File | null,
) {
  if (!file) return null;

  const filePath = `${folder}/${randomUUID()}-${sanitizeFileName(file.name)}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage.from(bucket).upload(filePath, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.path;
}
