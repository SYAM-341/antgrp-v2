import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail, isAdminRequest } from "@/lib/auth";
import { getStore } from "@/lib/store";
import { validateJobInput } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const store = await getStore();
  return NextResponse.json({ ok: true, jobs: await store.listAllJobs() });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const { data, errors } = validateJobInput(raw);
  if (!data) return NextResponse.json({ ok: false, errors }, { status: 422 });
  const store = await getStore();
  const postedBy = await getSessionEmail();
  const job = await store.createJob({ ...data, postedBy });
  return NextResponse.json({ ok: true, job }, { status: 201 });
}
