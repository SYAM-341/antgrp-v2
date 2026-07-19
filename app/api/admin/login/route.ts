import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE, authEnabled, checkLocalPassword,
  createSessionToken, isAllowedDomain, localFallbackEnabled, supabaseAuthEnabled,
} from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";
import { sanitize } from "@/lib/contact";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!authEnabled()) {
    return NextResponse.json(
      { ok: false, error: "Admin is not configured." },
      { status: 503 },
    );
  }
  if (isRateLimited(req, "admin-login", 30, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
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

  if (!email || !isAllowedDomain(email)) {
    return NextResponse.json(
      { ok: false, error: "Sign in with your @antgrp.com address." },
      { status: 401 },
    );
  }

  if (supabaseAuthEnabled()) {
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } },
    );
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      return NextResponse.json(
        { ok: false, error: "Incorrect email or password." },
        { status: 401 },
      );
    }
    if (!data.user.email_confirmed_at) {
      return NextResponse.json(
        { ok: false, error: "Verify your email first — check your inbox for the link." },
        { status: 403 },
      );
    }
    // We do not keep the Supabase session; sign out server-side and issue
    // our own HttpOnly cookie instead.
    await client.auth.signOut().catch(() => undefined);
  } else if (localFallbackEnabled()) {
    if (!checkLocalPassword(password)) {
      return NextResponse.json(
        { ok: false, error: "Incorrect email or password." },
        { status: 401 },
      );
    }
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
