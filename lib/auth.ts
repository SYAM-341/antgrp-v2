import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Recruiter authentication.
 *
 * Two modes:
 *  - SUPABASE mode (production): SUPABASE_URL + SUPABASE_ANON_KEY set.
 *    Recruiters register at /admin/register (only @antgrp.com addresses,
 *    enforced server-side) and must verify their email before logging in.
 *    Credentials are checked against Supabase Auth; on success we issue
 *    our own short-lived HMAC-signed HttpOnly session cookie carrying the
 *    recruiter's email. No Supabase tokens are stored client-side.
 *  - LOCAL fallback (development only): when Supabase is not configured,
 *    ADMIN_PASSWORD acts as a shared password; any @antgrp.com email plus
 *    that password signs in.
 */
const COOKIE = "antgrp_admin";
const MAX_AGE_S = 60 * 60 * 8; // 8 hours
export const ADMIN_DOMAIN = "@antgrp.com";

function secret(): string | null {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.ADMIN_PASSWORD ??
    null
  );
}

export function supabaseAuthEnabled(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

export function localFallbackEnabled(): boolean {
  return !supabaseAuthEnabled() && Boolean(process.env.ADMIN_PASSWORD);
}

export function authEnabled(): boolean {
  return supabaseAuthEnabled() || localFallbackEnabled();
}

export function isAllowedDomain(email: string): boolean {
  return email.toLowerCase().endsWith(ADMIN_DOMAIN);
}

export function checkLocalPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()!).update(payload).digest("hex");
}

export function createSessionToken(email: string): string {
  const expires = Date.now() + MAX_AGE_S * 1000;
  const payload = `${expires}|${Buffer.from(email).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  if (!token || !secret()) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [expStr, emailB64] = payload.split("|");
  if (Number(expStr) < Date.now()) return null;
  try {
    return Buffer.from(emailB64, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

/** Returns the signed-in recruiter's email, or null. */
export async function getSessionEmail(): Promise<string | null> {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE)?.value);
}

export async function isAdminRequest(): Promise<boolean> {
  return (await getSessionEmail()) !== null;
}

export const ADMIN_COOKIE = COOKIE;
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_S;
