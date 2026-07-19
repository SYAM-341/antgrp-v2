import { NextRequest, NextResponse } from "next/server";
import { extractFields, extractTextFromResume } from "@/lib/resume-parser";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req: NextRequest) {
  if (isRateLimited(req, "parse-resume", 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many uploads. Try again in a few minutes." },
      { status: 429 },
    );
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload." }, { status: 400 });
  }
  const file = form.get("resume");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Attach a resume file." }, { status: 422 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: "Only PDF or DOCX resumes are accepted." },
      { status: 422 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Resume must be 5 MB or smaller." },
      { status: 422 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromResume(buffer, file.type);
    const fields = extractFields(text);
    return NextResponse.json({
      ok: true,
      fields,
      hasTextLayer: text.trim().length > 0,
    });
  } catch (err) {
    console.error("[parse-resume] extraction failed:", err);
    // Parsing failure is not fatal — the candidate can still type details.
    return NextResponse.json({ ok: true, fields: {}, hasTextLayer: false });
  }
}
