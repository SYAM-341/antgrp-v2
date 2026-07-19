import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getStore } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Admin-only resume download: streams the file (local store) or
 *  redirects to a short-lived signed URL (Supabase). */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const store = await getStore();
  const apps = await store.listApplications();
  const app = apps.find((a) => a.id === id);
  if (!app) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const download = await store.getResumeDownload(app);
  if (!download) return NextResponse.json({ ok: false, error: "File missing" }, { status: 404 });
  if ("url" in download) return NextResponse.redirect(download.url);

  return new NextResponse(new Uint8Array(download.buffer), {
    headers: {
      "Content-Type": download.contentType,
      "Content-Disposition": `attachment; filename="${app.resumeFilename.replace(/[^\w.-]/g, "_")}"`,
    },
  });
}
