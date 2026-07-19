import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { sanitize } from "@/lib/contact";
import { sendMail, escapeHtml } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const AUTH_OPTIONS = [
  "US Citizen / Green Card",
  "Work visa (H1B, L1, etc.)",
  "Requires sponsorship",
  "Other / prefer to discuss",
];

export async function POST(req: NextRequest) {
  if (isRateLimited(req, "apply", 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot — pretend success, store nothing.
  if (sanitize(String(form.get("website") ?? ""))) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  const jobId = sanitize(String(form.get("jobId") ?? ""));
  const name = sanitize(String(form.get("name") ?? ""));
  const email = sanitize(String(form.get("email") ?? ""));
  const phone = sanitize(String(form.get("phone") ?? ""));
  const linkedin = sanitize(String(form.get("linkedin") ?? ""));
  const workAuthorization = sanitize(String(form.get("workAuthorization") ?? ""));
  const file = form.get("resume");

  if (!name || name.length > 100) errors.name = "Enter your name.";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (!phone || phone.replace(/\D/g, "").length < 7 || phone.length > 30) errors.phone = "Enter a valid phone number.";
  if (linkedin && !/^https?:\/\/(www\.)?linkedin\.com\//i.test(linkedin)) errors.linkedin = "Enter a linkedin.com profile URL.";
  if (!AUTH_OPTIONS.includes(workAuthorization)) errors.workAuthorization = "Select your work authorization status.";
  if (!(file instanceof File)) errors.resume = "Attach your resume (PDF or DOCX).";
  else if (!ALLOWED.includes(file.type)) errors.resume = "Only PDF or DOCX resumes are accepted.";
  else if (file.size > MAX_BYTES) errors.resume = "Resume must be 5 MB or smaller.";

  const store = await getStore();
  const job = jobId ? await store.getJob(jobId) : null;
  if (!job || job.status !== "published") {
    return NextResponse.json(
      { ok: false, error: "This position is no longer accepting applications." },
      { status: 410 },
    );
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const resumeFile = file as File;
  let application;
  try {
    application = await store.createApplication(
      {
        jobId, name, email, phone,
        linkedin: linkedin || undefined,
        workAuthorization,
        resumeFilename: resumeFile.name.slice(0, 200),
      },
      {
        buffer: Buffer.from(await resumeFile.arrayBuffer()),
        contentType: resumeFile.type,
      },
    );
  } catch (err) {
    console.error("[apply] storage failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your application. Please try again or email careers@antgrp.com." },
      { status: 502 },
    );
  }

  const siteUrl = process.env.SITE_URL ?? "https://antgrp.com";
  const resumeLink = `${siteUrl}/api/admin/resume/${application.id}`;
  const esc = {
    name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone),
    linkedin: escapeHtml(linkedin || "—"), auth: escapeHtml(workAuthorization),
    job: escapeHtml(job.title),
  };
  const mail = await sendMail({
    to: process.env.MAIL_TO_CAREERS ?? process.env.MAIL_TO,
    subject: `New application: ${name} — ${job.title}`,
    replyTo: email,
    text: `Position: ${job.title}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLinkedIn: ${linkedin || "—"}\nWork authorization: ${workAuthorization}\n\nResume: ${resumeLink}\n(Log in to the admin area to download.)`,
    html: `<h2 style="font-family:sans-serif">New job application</h2>
<table style="font-family:sans-serif;font-size:14px" cellpadding="4">
<tr><td><b>Position</b></td><td>${esc.job}</td></tr>
<tr><td><b>Name</b></td><td>${esc.name}</td></tr>
<tr><td><b>Email</b></td><td>${esc.email}</td></tr>
<tr><td><b>Phone</b></td><td>${esc.phone}</td></tr>
<tr><td><b>LinkedIn</b></td><td>${esc.linkedin}</td></tr>
<tr><td><b>Work authorization</b></td><td>${esc.auth}</td></tr>
</table>
<p style="font-family:sans-serif;font-size:14px"><a href="${resumeLink}">Download resume</a> (admin login required)</p>`,
  });

  console.info(
    `[apply] application stored (job: ${job.slug}, email notification: ${mail.attempted ? (mail.ok ? "sent" : "failed") : "not configured"})`,
  );
  return NextResponse.json({ ok: true });
}
