import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/auth";

export const runtime = "nodejs";

/**
 * Session heartbeat. The idle-timeout watcher pings this while the
 * recruiter is active; the middleware refreshes the session cookie on
 * every authenticated request, sliding the 15-minute window forward.
 */
export async function GET() {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
