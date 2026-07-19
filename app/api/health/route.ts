import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lightweight health endpoint. Touches the database so scheduled pings
 * (see .github/workflows/keepalive.yml) count as activity and prevent
 * the Supabase free-tier inactivity pause.
 */
export async function GET() {
  try {
    const store = await getStore();
    const ok = await store.healthCheck();
    return NextResponse.json({ ok, time: new Date().toISOString() }, { status: ok ? 200 : 503 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
