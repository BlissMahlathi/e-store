export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      vendor_applications: {
        Row: {
          id: string;
          created_at: string;
          business_name: string;
          full_name: string;
          email: string;
          phone: string;
          whatsapp: string;
          social_handle: string | null;
          location: string;
          business_address: string;
          business_description: string;
          store_description: string;
          operating_hours: string;
          delivery_rules: string;
          delivery_fee: string;
          shopping_methods: string[];
          payout_method: string;
          cipc_registered: boolean;
          company_reg_number: string | null;
          tax_number: string | null;
          id_number: string;
          logo_file_name: string | null;
          store_banner_file_name: string | null;
          id_document_file_name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          business_name: string;
          full_name: string;
          email: string;
          phone: string;
          whatsapp: string;
          social_handle?: string | null;
          location: string;
          business_address: string;
          business_description: string;
          store_description: string;
          operating_hours: string;
          delivery_rules: string;
          delivery_fee: string;
          shopping_methods: string[];
          payout_method: string;
          cipc_registered: boolean;
          company_reg_number?: string | null;
          tax_number?: string | null;
          id_number: string;
          logo_file_name?: string | null;
          store_banner_file_name?: string | null;
          id_document_file_name?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["vendor_applications"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
