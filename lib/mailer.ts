import nodemailer from "nodemailer";

export interface MailResult {
  attempted: boolean;
  ok: boolean;
  detail?: string;
}

/**
 * Shared mailer. Real SMTP when SMTP_HOST is set; otherwise a mock
 * jsonTransport that logs the rendered message (local development).
 */
export async function sendMail(opts: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  /** Recipient override; falls back to legacy MAIL_TO. */
  to?: string;
}): Promise<MailResult> {
  const to = opts.to ?? process.env.MAIL_TO;
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
    : nodemailer.createTransport({ jsonTransport: true });

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM ?? "AntGRP Website <no-reply@antgrp.com>",
      to,
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    if (!host) {
      console.info(
        "[mailer] mock send:",
        (info as unknown as { message?: string }).message ?? info.messageId,
      );
      return { attempted: true, ok: true, detail: "mock transport" };
    }
    return { attempted: true, ok: true };
  } catch (err) {
    console.error("[mailer] send failed:", err);
    return { attempted: true, ok: false, detail: "smtp error" };
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
