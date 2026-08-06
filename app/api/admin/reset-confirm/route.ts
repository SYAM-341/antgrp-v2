import { NextRequest, NextResponse } from "next/server";
import { supabaseAuthEnabled } from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Password reset — step 2: verify the one-time token and set the new password.
 *
 * Supports both Supabase recovery-link styles:
 *  - `token_hash` (custom email template linking straight to our page), verified
 *    server-side with verifyOtp; or
 *  - `access_token` (default template: Supabase verifies the link itself and
 *    redirects here with a short-lived session token in the URL fragment),
 *    validated server-side with getUser.
 *
 * After verification the password is updated with the service-role admin API.
 * Tokens are single-use and expire (default: 1 hour).
 */
export async function POST(req: NextRequest) {
  if (isRateLimited(req, "admin-reset-confirm", 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  if (!supabaseAuthEnabled() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { ok: false, error: "Password reset is not configured." },
      { status: 503 },
    );
  }

  let body: { token_hash?: string; access_token?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const password = String(body.password ?? "");
  if (password.length < 12) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 12 characters." },
      { status: 422 },
    );
  }

  const tokenHash = String(body.token_hash ?? "");
  const accessToken = String(body.access_token ?? "");
  if (!tokenHash && !accessToken) {
    return NextResponse.json(
      { ok: false, error: "Reset link is invalid or incomplete. Request a new one." },
      { status: 400 },
    );
  }

  const { createClient } = await import("@supabase/supabase-js");
  const anon = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );

  // Verify the token and identify the user.
  let userId: string | null = null;
  if (tokenHash) {
    const { data, error } = await anon.auth.verifyOtp({
      type: "recovery",
      token_hash: tokenHash,
    });
    if (!error && data.user) userId = data.user.id;
  } else {
    const { data, error } = await anon.auth.getUser(accessToken);
    if (!error && data.user) userId = data.user.id;
  }
  if (!userId) {
    return NextResponse.json(
      { ok: false, error: "This reset link is invalid or has expired. Request a new one." },
      { status: 401 },
    );
  }

  // Set the new password with the admin API (service role, server-side only).
  const admin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
    password,
  });
  if (updateError) {
    console.error("[reset-confirm] update failed:", updateError.message);
    return NextResponse.json(
      { ok: false, error: "Could not update the password. Try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Password updated. You can now sign in.",
  });
}
