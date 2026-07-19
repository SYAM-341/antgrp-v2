import { createHmac, timingSafeEqual } from "crypto";

/**
 * Server-side helper for the HR webhook contract.
 *
 * The website signs each webhook body with HMAC-SHA256 using
 * HR_WEBHOOK_SECRET and sends the hex digest in the X-Antgrp-Signature
 * header as "sha256=<hex>". The receiving HR system should recompute the
 * digest over the raw request body and compare with this function (or an
 * equivalent constant-time comparison).
 */
export function verifySignature(
  rawBody: string,
  signatureHeader: string,
  secret: string,
): boolean {
  const expected =
    "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  return a.length === b.length && timingSafeEqual(a, b);
}
