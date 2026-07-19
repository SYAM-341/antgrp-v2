import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import type { Application, ApplicationStatus, Job, Store } from "./types";
import { slugify } from "./types";

/**
 * Supabase-backed store (free tier). Requires:
 *   SUPABASE_URL              — project URL
 *   SUPABASE_SERVICE_ROLE_KEY — service role key (server-side only!)
 * Schema: run supabase/schema.sql in the Supabase SQL editor once.
 * Resumes are stored in a private "resumes" storage bucket; downloads
 * use short-lived signed URLs.
 */
const BUCKET = "resumes";

interface JobRow {
  id: string; slug: string; title: string; location: string;
  employment_type: Job["employmentType"]; experience_level: Job["experienceLevel"];
  description: string; requirements: string; salary_range: string | null;
  status: Job["status"]; posted_by: string | null; created_at: string; updated_at: string;
}
interface AppRow {
  id: string; job_id: string; name: string; email: string; phone: string;
  linkedin: string | null; work_authorization: string; resume_filename: string;
  resume_path: string; status: ApplicationStatus; created_at: string;
}

function toJob(r: JobRow): Job {
  return {
    id: r.id, slug: r.slug, title: r.title, location: r.location,
    employmentType: r.employment_type, experienceLevel: r.experience_level,
    description: r.description, requirements: r.requirements,
    salaryRange: r.salary_range, status: r.status, postedBy: r.posted_by,
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}
function toApp(r: AppRow): Application {
  return {
    id: r.id, jobId: r.job_id, name: r.name, email: r.email, phone: r.phone,
    linkedin: r.linkedin, workAuthorization: r.work_authorization,
    resumeFilename: r.resume_filename, resumePath: r.resume_path,
    status: r.status, createdAt: r.created_at,
  };
}

export class SupabaseStore implements Store {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
  }

  async healthCheck(): Promise<boolean> {
    const { error } = await this.client.from("jobs").select("id").limit(1);
    return !error;
  }

  async listPublishedJobs(): Promise<Job[]> {
    const { data, error } = await this.client
      .from("jobs").select("*").eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as JobRow[]).map(toJob);
  }

  async getPublishedJobBySlug(slug: string): Promise<Job | null> {
    const { data } = await this.client
      .from("jobs").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    return data ? toJob(data as JobRow) : null;
  }

  async listAllJobs(): Promise<Job[]> {
    const { data, error } = await this.client
      .from("jobs").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data as JobRow[]).map(toJob);
  }

  async getJob(id: string): Promise<Job | null> {
    const { data } = await this.client.from("jobs").select("*").eq("id", id).maybeSingle();
    return data ? toJob(data as JobRow) : null;
  }

  async createJob(input: Omit<Job, "id" | "slug" | "createdAt" | "updatedAt">): Promise<Job> {
    const base = slugify(input.title) || "job";
    let slug = base;
    for (let n = 2; ; n++) {
      const { data } = await this.client.from("jobs").select("id").eq("slug", slug).maybeSingle();
      if (!data) break;
      slug = `${base}-${n}`;
    }
    const { data, error } = await this.client
      .from("jobs")
      .insert({
        slug, title: input.title, location: input.location,
        employment_type: input.employmentType, experience_level: input.experienceLevel,
        description: input.description, requirements: input.requirements,
        salary_range: input.salaryRange ?? null, status: input.status,
        posted_by: input.postedBy ?? null,
      })
      .select().single();
    if (error) throw error;
    return toJob(data as JobRow);
  }

  async updateJob(id: string, patch: Partial<Omit<Job, "id" | "createdAt">>): Promise<Job | null> {
    const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (patch.title !== undefined) row.title = patch.title;
    if (patch.location !== undefined) row.location = patch.location;
    if (patch.employmentType !== undefined) row.employment_type = patch.employmentType;
    if (patch.experienceLevel !== undefined) row.experience_level = patch.experienceLevel;
    if (patch.description !== undefined) row.description = patch.description;
    if (patch.requirements !== undefined) row.requirements = patch.requirements;
    if (patch.salaryRange !== undefined) row.salary_range = patch.salaryRange;
    if (patch.status !== undefined) row.status = patch.status;
    const { data, error } = await this.client
      .from("jobs").update(row).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return data ? toJob(data as JobRow) : null;
  }

  async createApplication(
    input: Omit<Application, "id" | "resumePath" | "status" | "createdAt">,
    resume: { buffer: Buffer; contentType: string },
  ): Promise<Application> {
    const id = randomUUID();
    const ext = resume.contentType.includes("pdf") ? "pdf" : "docx";
    const storagePath = `${input.jobId}/${id}.${ext}`;
    const { error: upErr } = await this.client.storage
      .from(BUCKET)
      .upload(storagePath, resume.buffer, { contentType: resume.contentType });
    if (upErr) throw upErr;

    const { data, error } = await this.client
      .from("applications")
      .insert({
        id, job_id: input.jobId, name: input.name, email: input.email,
        phone: input.phone, linkedin: input.linkedin ?? null,
        work_authorization: input.workAuthorization,
        resume_filename: input.resumeFilename, resume_path: storagePath,
        status: "new",
      })
      .select().single();
    if (error) throw error;
    return toApp(data as AppRow);
  }

  async listApplications(jobId?: string): Promise<Application[]> {
    let q = this.client.from("applications").select("*").order("created_at", { ascending: false });
    if (jobId) q = q.eq("job_id", jobId);
    const { data, error } = await q;
    if (error) throw error;
    return (data as AppRow[]).map(toApp);
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<Application | null> {
    const { data, error } = await this.client
      .from("applications").update({ status }).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return data ? toApp(data as AppRow) : null;
  }

  async getResumeDownload(app: Application) {
    const { data, error } = await this.client.storage
      .from(BUCKET)
      .createSignedUrl(app.resumePath, 60 * 10);
    if (error || !data) return null;
    return { url: data.signedUrl };
  }
}
