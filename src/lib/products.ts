import type { Product } from "@/types/product";
import { createServerClient } from "./supabase/server";
import { MOCK_PRODUCTS } from "./mock-data";

export async function getProducts(): Promise<Product[]> {
  const supabase = createServerClient();

  if (!supabase) {
    return MOCK_PRODUCTS;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.warn("[Maya] Supabase query failed, falling back to mock data:", error?.message);
    return MOCK_PRODUCTS;
  }

  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createServerClient();

  if (!supabase) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  return data as Product;
}
