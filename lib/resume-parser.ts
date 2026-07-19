import mammoth from "mammoth";

/**
 * Heuristic resume field extraction — open-source libraries only.
 *
 * Approach: extract the plain text layer (pdf-parse for PDF, mammoth for
 * DOCX), then apply targeted patterns:
 *   email    — RFC-ish mailbox regex (first match)
 *   phone    — international/US phone patterns, 10-15 digits
 *   linkedin — linkedin.com/in/<handle> URL
 *   name     — first plausible line: 2-4 capitalized words, no digits or
 *              @, not a section heading like "Resume" or "Curriculum Vitae"
 *
 * Limits (documented for candidates and recruiters):
 *   - Scanned/image-only PDFs have no text layer → nothing extracts.
 *   - Unusual layouts may defeat the name heuristic.
 *   - When confidence is low the field is left BLANK, never guessed.
 */
export interface ExtractedFields {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_RE = /(?:\+?\d{1,3}[\s.-]?)?(?:\(\d{2,4}\)[\s.-]?)?\d{3}[\s.-]?\d{3,4}[\s.-]?\d{0,4}/;
const LINKEDIN_RE = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?/i;
const HEADING_WORDS = /^(resume|curriculum vitae|cv|profile|summary|objective|contact|experience|education)$/i;

export async function extractTextFromResume(
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  if (contentType.includes("pdf")) {
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    try {
      const result = await parser.getText();
      return result.text ?? "";
    } finally {
      await parser.destroy();
    }
  }
  const result = await mammoth.extractRawText({ buffer });
  return result.value ?? "";
}

export function extractFields(text: string): ExtractedFields {
  const fields: ExtractedFields = {};
  const clean = text.replace(/\r/g, "");

  const email = clean.match(EMAIL_RE)?.[0];
  if (email) fields.email = email.trim();

  const linkedin = clean.match(LINKEDIN_RE)?.[0];
  if (linkedin) {
    fields.linkedin = linkedin.startsWith("http") ? linkedin : `https://${linkedin}`;
  }

  // Phone: require at least 10 digits total to avoid matching dates/zips.
  for (const m of clean.matchAll(new RegExp(PHONE_RE, "g"))) {
    const digits = m[0].replace(/\D/g, "");
    if (digits.length >= 10 && digits.length <= 15) {
      fields.phone = m[0].trim();
      break;
    }
  }

  // Name: scan the first 10 non-empty lines for a plausible person name.
  const lines = clean.split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 10);
  for (const line of lines) {
    if (line.length > 60) continue;
    if (/[@\d]/.test(line)) continue;
    if (HEADING_WORDS.test(line)) continue;
    const words = line.split(/\s+/);
    if (words.length < 2 || words.length > 4) continue;
    const capitalized = words.every((w) => /^[A-Z][A-Za-z'.-]*$/.test(w));
    if (capitalized) {
      fields.name = line;
      break;
    }
  }

  return fields;
}
