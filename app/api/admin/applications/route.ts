import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const jobId = req.nextUrl.searchParams.get("jobId") ?? undefined;
  const store = await getStore();
  return NextResponse.json({ ok: true, applications: await store.listApplications(jobId) });
}
