import { NextRequest, NextResponse } from "next/server";
import { isAllowedDomain, supabaseAuthEnabled } from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";
import { sanitize } from "@/lib/contact";

export const runtime = "nodejs";

/**
 * Password reset — step 1: request a reset link.
 *
 * Anti-enumeration: the response is ALWAYS the same generic success message,
 * whether or not an account exists for the address. We only actually contact
 * Supabase for well-formed @antgrp.com addresses.
 */
export async function POST(req: NextRequest) {
  if (isRateLimited(req, "admin-reset-request", 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many reset requests. Try again later." },
      { status: 429 },
    );
  }

  if (!supabaseAuthEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Password reset requires Supabase Auth (production). In local development, sign in with the shared development password.",
      },
      { status: 503 },
    );
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = sanitize(String(body.email ?? "")).toLowerCase();
  const generic = {
    ok: true,
    message:
      "If an account exists for that address, a reset link has been sent. Check your inbox and spam folder.",
  };

  // Well-formed, allowed domain → ask Supabase to send the recovery email.
  // Anything else → same generic response, no Supabase call.
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && isAllowedDomain(email)) {
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } },
    );
    const site = process.env.SITE_URL ?? "https://antgrp.com";
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${site}/admin/reset/confirm`,
    });
    if (error) console.error("[reset-request] supabase error:", error.message);
  }

  return NextResponse.json(generic);
}
