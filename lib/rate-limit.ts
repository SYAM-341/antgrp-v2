import type { NextRequest } from "next/server";

/**
 * In-memory sliding-window rate limiter (per IP, per bucket).
 * Suitable for single-instance deployments; on serverless the window is
 * best-effort per instance. See README for a shared-store upgrade path.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(
  req: NextRequest,
  bucket: string,
  max: number,
  windowMs: number,
): boolean {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : (req.headers.get("x-real-ip") ?? "unknown");
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  if (hits.size > 20_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return false;
}
