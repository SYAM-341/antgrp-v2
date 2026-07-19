import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import nodemailer from "nodemailer";
import { validateContact, escapeHtml } from "@/lib/contact";

export const runtime = "nodejs";

/* ------------------------------------------------------------------ */
/* Rate limiting (in-memory sliding window)                            */
/*                                                                     */
/* Suitable for a single-instance deployment. On serverless/multi-     */
/* instance hosting, move this to a shared store (Redis, Upstash) —    */
/* see README "Rate limiting" section.                                 */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  // Opportunistic cleanup to bound memory
  if (hits.size > 10_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/* ------------------------------------------------------------------ */
/* Email notification                                                  */
/* ------------------------------------------------------------------ */
interface DeliveryResult {
  attempted: boolean;
  ok: boolean;
  detail?: string;
}

async function sendEmail(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<DeliveryResult> {
  const to = process.env.MAIL_TO;
  if (!to) return { attempted: false, ok: false, detail: "MAIL_TO not configured" };

  const host = process.env.SMTP_HOST;
  const transporter = host
    ? nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      })
    : // Mock transport for local development / tests without SMTP
      // credentials: renders the full message as JSON to the server log.
      nodemailer.createTransport({ jsonTransport: true });

  const esc = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    company: escapeHtml(data.company ?? "—"),
    message: escapeHtml(data.message).replace(/\n/g, "<br/>"),
  };

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM ?? "AntGRP Website <no-reply@antgrp.com>",
      to,
      replyTo: data.email,
      subject: `Website inquiry from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company ?? "—"}\n\n${data.message}`,
      html: `<h2 style="font-family:sans-serif">New website inquiry</h2>
<table style="font-family:sans-serif;font-size:14px" cellpadding="4">
<tr><td><b>Name</b></td><td>${esc.name}</td></tr>
<tr><td><b>Email</b></td><td>${esc.email}</td></tr>
<tr><td><b>Company</b></td><td>${esc.company}</td></tr>
</table>
<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc.message}</p>`,
    });
    if (!host) {
      console.info("[contact] email (mock jsonTransport):", (info as unknown as { message?: string }).message ?? info.messageId);
      return { attempted: true, ok: true, detail: "mock transport (no SMTP configured)" };
    }
    return { attempted: true, ok: true };
  } catch (err) {
    console.error("[contact] email send failed:", err);
    return { attempted: true, ok: false, detail: "smtp error" };
  }
}

/* ------------------------------------------------------------------ */
/* HR system webhook forward                                           */
/*                                                                     */
/* Sends the same submission to the HR admin system. The payload is    */
/* JSON; integrity is provided by an HMAC-SHA256 signature over the    */
/* raw body using HR_WEBHOOK_SECRET, sent in X-Antgrp-Signature.       */
/* See README "HR integration" for the exact contract and what the     */
/* HR system needs to implement.                                       */
/* ------------------------------------------------------------------ */
async function forwardToHr(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<DeliveryResult> {
  const url = process.env.HR_WEBHOOK_URL;
  if (!url) return { attempted: false, ok: false, detail: "HR_WEBHOOK_URL not configured" };

  const payload = JSON.stringify({
    source: "antgrp-website",
    type: "contact_form",
    receivedAt: new Date().toISOString(),
    data: {
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      message: data.message,
    },
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const secret = process.env.HR_WEBHOOK_SECRET;
  if (secret) {
    headers["X-Antgrp-Signature"] =
      "sha256=" + createHmac("sha256", secret).update(payload).digest("hex");
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: payload,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error("[contact] HR webhook returned", res.status);
      return { attempted: true, ok: false, detail: `webhook status ${res.status}` };
    }
    return { attempted: true, ok: true };
  } catch (err) {
    console.error("[contact] HR webhook failed:", err);
    return { attempted: true, ok: false, detail: "webhook unreachable" };
  }
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { data, errors } = validateContact(raw as Record<string, string>);
  if (!data) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Honeypot: hidden field filled in means a bot. Pretend success so the
  // bot learns nothing; store/send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const [email, webhook] = await Promise.all([
    sendEmail(data),
    forwardToHr(data),
  ]);

  const anyConfigured = email.attempted || webhook.attempted;
  const anySucceeded =
    (email.attempted && email.ok) || (webhook.attempted && webhook.ok);

  if (anyConfigured && !anySucceeded) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't process your message right now. Please email hradmin@antgrp.com directly.",
      },
      { status: 502 },
    );
  }

  // Log delivery summary server-side only; no applicant data in the log line.
  console.info(
    `[contact] submission processed (email: ${email.attempted ? (email.ok ? "sent" : "failed") : "not configured"}, hr-webhook: ${webhook.attempted ? (webhook.ok ? "delivered" : "failed") : "not configured"})`,
  );

  return NextResponse.json({ ok: true });
}
