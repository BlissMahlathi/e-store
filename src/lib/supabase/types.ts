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
      categories: {
        Row: {
          id: string;
          created_at: string;
          description: string | null;
          is_active: boolean;
          name: string;
          parent_id: string | null;
          slug: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          description?: string | null;
          is_active?: boolean;
          name: string;
          parent_id?: string | null;
          slug: string;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
        Relationships: [];
      };
      media_assets: {
        Row: {
          id: string;
          bucket: string;
          created_at: string;
          media_type: string;
          path: string;
          position: number;
          product_id: string | null;
          variant_id: string | null;
        };
        Insert: {
          id?: string;
          bucket: string;
          created_at?: string;
          media_type?: string;
          path: string;
          position?: number;
          product_id?: string | null;
          variant_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["media_assets"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          channel: string;
          created_at?: string | null;
          currency: string;
          discount_cents: number;
          fulfillment_status: string;
          id: string;
          order_number: string;
          payment_status: string;
          placed_at: string;
          profile_id: string | null;
          shipping_cents: number;
          status: string;
          subtotal_cents: number;
          tax_cents: number;
          total_cents: number;
          vendor_id: string | null;
        };
        Insert: {
          channel?: string;
          currency: string;
          discount_cents?: number;
          fulfillment_status?: string;
          id?: string;
          order_number?: string;
          payment_status?: string;
          placed_at?: string;
          profile_id?: string | null;
          shipping_cents?: number;
          status?: string;
          subtotal_cents?: number;
          tax_cents?: number;
          total_cents?: number;
          vendor_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
      order_items: {
        Row: {
          discount_cents: number;
          id: string;
          metadata: Json;
          order_id: string | null;
          product_id: string | null;
          quantity: number;
          tax_cents: number;
          unit_price_cents: number;
          variant_id: string | null;
        };
        Insert: {
          discount_cents?: number;
          id?: string;
          metadata?: Json;
          order_id?: string | null;
          product_id?: string | null;
          quantity?: number;
          tax_cents?: number;
          unit_price_cents: number;
          variant_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
        Relationships: [];
      };
      product_category_map: {
        Row: {
          category_id: string;
          product_id: string;
        };
        Insert: {
          category_id: string;
          product_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["product_category_map"]["Insert"]>;
        Relationships: [];
      };
      products: {
        Row: {
          attributes: Json;
          base_price: number;
          created_at: string;
          currency: string;
          description: string | null;
          id: string;
          name: string;
          slug: string | null;
          status: string;
          summary: string | null;
          updated_at: string;
          vendor_id: string | null;
        };
        Insert: {
          attributes?: Json;
          base_price: number;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          name: string;
          slug?: string | null;
          status?: string;
          summary?: string | null;
          updated_at?: string;
          vendor_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          marketing_opt_in: boolean;
          phone: string | null;
          preferred_locale: string;
          role: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          marketing_opt_in?: boolean;
          phone?: string | null;
          preferred_locale?: string;
          role?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      reviews: {
        Row: {
          body: string | null;
          created_at: string;
          id: string;
          product_id: string | null;
          profile_id: string | null;
          rating: number;
          status: string;
          title: string | null;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          id?: string;
          product_id?: string | null;
          profile_id?: string | null;
          rating: number;
          status?: string;
          title?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
        Relationships: [];
      };
      vendors: {
        Row: {
          application_id: string | null;
          business_name: string;
          commission_rate: number;
          created_at: string;
          id: string;
          metadata: Json;
          onboarding_complete: boolean;
          profile_id: string | null;
          status: string;
        };
        Insert: {
          application_id?: string | null;
          business_name: string;
          commission_rate?: number;
          created_at?: string;
          id?: string;
          metadata?: Json;
          onboarding_complete?: boolean;
          profile_id?: string | null;
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["vendors"]["Insert"]>;
        Relationships: [];
      };
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
