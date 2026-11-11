import { createClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase server client, or null if env vars are not configured.
 * Callers should fall back to mock data when this returns null.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}
