/**
 * Shared validation and sanitization for the contact form.
 * Used by both the API route (authoritative) and the client (early feedback).
 */

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  /** Honeypot field - must be empty. Hidden from real users via CSS. */
  website?: string;
}

export interface FieldErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CONTROL_CHARS_KEEP_NEWLINES = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const CONTROL_CHARS_ALL = /[\u0000-\u001F\u007F]/g;

/** Strip control characters (optionally keeping newlines/tabs) and trim. */
export function sanitize(value: string, allowNewlines = false): string {
  const pattern = allowNewlines ? CONTROL_CHARS_KEEP_NEWLINES : CONTROL_CHARS_ALL;
  return value.replace(pattern, "").trim();
}

/** Escape HTML special characters for safe inclusion in email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContact(raw: Partial<ContactPayload>): {
  data: ContactPayload | null;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  const name = sanitize(String(raw.name ?? ""));
  const email = sanitize(String(raw.email ?? ""));
  const company = sanitize(String(raw.company ?? ""));
  const message = sanitize(String(raw.message ?? ""), true);

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!email) errors.email = "Enter your work email.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "Enter a valid email address.";

  if (company.length > 150)
    errors.company = "Company must be 150 characters or fewer.";

  if (!message) errors.message = "Tell us briefly what you need.";
  else if (message.length < 10)
    errors.message = "Message must be at least 10 characters.";
  else if (message.length > 5000)
    errors.message = "Message must be 5,000 characters or fewer.";

  if (Object.keys(errors).length > 0) return { data: null, errors };

  return {
    data: {
      name,
      email,
      company: company || undefined,
      message,
      website: sanitize(String(raw.website ?? "")),
    },
    errors: {},
  };
}
