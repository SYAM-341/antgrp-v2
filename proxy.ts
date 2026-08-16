import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth";

/**
 * Sliding session timeout. Every authenticated request to the admin area
 * re-issues the session cookie with a fresh 15-minute expiry. No requests
 * for 15 minutes → the token expires → the next request is treated as
 * signed out (pages redirect to /admin/login, APIs return 401).
 */
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export function proxy(req: NextRequest) {
  const email = verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!email) return NextResponse.next(); // not signed in — existing handling applies

  const res = NextResponse.next();
  res.cookies.set(ADMIN_COOKIE, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
