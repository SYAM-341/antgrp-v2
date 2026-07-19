import type { Store } from "./types";
import { LocalStore } from "./local";

/**
 * Store selection:
 *  - SUPABASE_URL set   → Supabase (production)
 *  - otherwise          → local JSON store (development/demo, zero setup)
 */
let store: Store | null = null;

export async function getStore(): Promise<Store> {
  if (store) return store;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { SupabaseStore } = await import("./supabase");
    store = new SupabaseStore();
  } else {
    store = new LocalStore();
  }
  return store;
}

export * from "./types";
