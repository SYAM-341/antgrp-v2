import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Application, ApplicationStatus, Job, Store } from "./types";
import { slugify } from "./types";

/**
 * Zero-setup local store for development and demos. Data lives in
 * .data/db.json and resumes in .data/resumes/ (both gitignored).
 * Not for production use — set SUPABASE_URL to switch to the
 * Supabase store.
 *
 * Mutations are serialized through an in-process queue so concurrent
 * requests (e.g. parallel E2E tests) cannot lose writes.
 */
const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const RESUME_DIR = path.join(DATA_DIR, "resumes");

interface DbShape {
  jobs: Job[];
  applications: Application[];
}

let writeChain: Promise<unknown> = Promise.resolve();
function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeChain.then(fn, fn);
  writeChain = next.catch(() => undefined);
  return next;
}

async function load(): Promise<DbShape> {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(raw) as DbShape;
  } catch {
    return { jobs: [], applications: [] };
  }
}

async function save(db: DbShape): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

function uniqueSlug(db: DbShape, title: string): string {
  const base = slugify(title) || "job";
  let slug = base;
  let n = 2;
  while (db.jobs.some((j) => j.slug === slug)) slug = `${base}-${n++}`;
  return slug;
}

export class LocalStore implements Store {
  async healthCheck(): Promise<boolean> {
    await load();
    return true;
  }

  async listPublishedJobs(): Promise<Job[]> {
    const db = await load();
    return db.jobs
      .filter((j) => j.status === "published")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async getPublishedJobBySlug(slug: string): Promise<Job | null> {
    const db = await load();
    return db.jobs.find((j) => j.slug === slug && j.status === "published") ?? null;
  }

  async listAllJobs(): Promise<Job[]> {
    const db = await load();
    return [...db.jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async getJob(id: string): Promise<Job | null> {
    const db = await load();
    return db.jobs.find((j) => j.id === id) ?? null;
  }

  async createJob(input: Omit<Job, "id" | "slug" | "createdAt" | "updatedAt">): Promise<Job> {
    return enqueue(async () => {
      const db = await load();
      const now = new Date().toISOString();
      const job: Job = {
        ...input,
        id: randomUUID(),
        slug: uniqueSlug(db, input.title),
        createdAt: now,
        updatedAt: now,
      };
      db.jobs.push(job);
      await save(db);
      return job;
    });
  }

  async updateJob(id: string, patch: Partial<Omit<Job, "id" | "createdAt">>): Promise<Job | null> {
    return enqueue(async () => {
      const db = await load();
      const job = db.jobs.find((j) => j.id === id);
      if (!job) return null;
      Object.assign(job, patch, { updatedAt: new Date().toISOString() });
      await save(db);
      return job;
    });
  }

  async createApplication(
    input: Omit<Application, "id" | "resumePath" | "status" | "createdAt">,
    resume: { buffer: Buffer; contentType: string },
  ): Promise<Application> {
    return enqueue(async () => {
      const db = await load();
      const id = randomUUID();
      const ext = resume.contentType.includes("pdf") ? "pdf" : "docx";
      const filePath = path.join(RESUME_DIR, `${id}.${ext}`);
      await fs.mkdir(RESUME_DIR, { recursive: true });
      await fs.writeFile(filePath, resume.buffer);
      const app: Application = {
        ...input,
        id,
        resumePath: filePath,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      db.applications.push(app);
      await save(db);
      return app;
    });
  }

  async listApplications(jobId?: string): Promise<Application[]> {
    const db = await load();
    return db.applications
      .filter((a) => !jobId || a.jobId === jobId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus): Promise<Application | null> {
    return enqueue(async () => {
      const db = await load();
      const app = db.applications.find((a) => a.id === id);
      if (!app) return null;
      app.status = status;
      await save(db);
      return app;
    });
  }

  async getResumeDownload(app: Application) {
    try {
      const buffer = await fs.readFile(app.resumePath);
      const contentType = app.resumePath.endsWith(".pdf")
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      return { buffer, contentType };
    } catch {
      return null;
    }
  }
}
