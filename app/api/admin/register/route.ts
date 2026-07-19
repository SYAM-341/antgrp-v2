import { NextRequest, NextResponse } from "next/server";
import { ADMIN_DOMAIN, isAllowedDomain, supabaseAuthEnabled } from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";
import { sanitize } from "@/lib/contact";

export const runtime = "nodejs";

/**
 * Recruiter self-registration. Domain rule is enforced HERE, server-side:
 * only @antgrp.com addresses may create accounts, regardless of what the
 * UI allows. A verification email is sent by Supabase Auth; the account
 * cannot log in until verified.
 */
export async function POST(req: NextRequest) {
  if (isRateLimited(req, "admin-register", 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many registration attempts. Try again later." },
      { status: 429 },
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = sanitize(String(body.email ?? "")).toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 422 },
    );
  }
  // Domain enforcement — the core rule.
  if (!isAllowedDomain(email)) {
    return NextResponse.json(
      { ok: false, error: `Registration is limited to ${ADMIN_DOMAIN} addresses.` },
      { status: 403 },
    );
  }
  if (password.length < 12) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 12 characters." },
      { status: 422 },
    );
  }

  if (!supabaseAuthEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Registration requires Supabase Auth (production). In local development, sign in with the shared development password.",
      },
      { status: 503 },
    );
  }

  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
  const { error } = await client.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${process.env.SITE_URL ?? "https://antgrp.com"}/admin/login` },
  });
  if (error) {
    console.error("[register] supabase error:", error.message);
    return NextResponse.json(
      { ok: false, error: "Registration failed. The address may already be in use." },
      { status: 400 },
    );
  }
  return NextResponse.json({
    ok: true,
    message: "Check your inbox — click the verification link, then sign in.",
  });
}
