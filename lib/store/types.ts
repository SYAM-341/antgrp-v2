export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Contract-to-hire";
export type ExperienceLevel = "Junior" | "Mid-Level" | "Senior" | "Lead";
export type JobStatus = "draft" | "published" | "closed";
export type ApplicationStatus = "new" | "reviewed" | "contacted" | "rejected";

export interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  description: string;
  requirements: string;
  salaryRange?: string | null;
  status: JobStatus;
  postedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string | null;
  workAuthorization: string;
  resumeFilename: string;
  resumePath: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface Store {
  healthCheck(): Promise<boolean>;
  listPublishedJobs(): Promise<Job[]>;
  getPublishedJobBySlug(slug: string): Promise<Job | null>;
  listAllJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job | null>;
  createJob(input: Omit<Job, "id" | "slug" | "createdAt" | "updatedAt">): Promise<Job>;
  updateJob(id: string, patch: Partial<Omit<Job, "id" | "createdAt">>): Promise<Job | null>;
  createApplication(
    input: Omit<Application, "id" | "resumePath" | "status" | "createdAt">,
    resume: { buffer: Buffer; contentType: string },
  ): Promise<Application>;
  listApplications(jobId?: string): Promise<Application[]>;
  updateApplicationStatus(id: string, status: ApplicationStatus): Promise<Application | null>;
  /** Returns a short-lived URL or internal path for downloading a resume. */
  getResumeDownload(app: Application): Promise<{ url: string } | { buffer: Buffer; contentType: string } | null>;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
