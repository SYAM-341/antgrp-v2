import { sanitize } from "@/lib/contact";
import type { EmploymentType, ExperienceLevel, JobStatus } from "@/lib/store/types";

const EMPLOYMENT = ["Full-time", "Part-time", "Contract", "Contract-to-hire"];
const LEVELS = ["Junior", "Mid-Level", "Senior", "Lead"];
const STATUSES = ["draft", "published", "closed"];

export function validateJobInput(raw: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const title = sanitize(String(raw.title ?? ""));
  const location = sanitize(String(raw.location ?? ""));
  const employmentType = String(raw.employmentType ?? "");
  const experienceLevel = String(raw.experienceLevel ?? "");
  const description = sanitize(String(raw.description ?? ""), true);
  const requirements = sanitize(String(raw.requirements ?? ""), true);
  const salaryRange = sanitize(String(raw.salaryRange ?? ""));
  const status = String(raw.status ?? "draft");

  if (!title || title.length > 120) errors.title = "Title is required (max 120 chars).";
  if (!location || location.length > 120) errors.location = "Location is required.";
  if (!EMPLOYMENT.includes(employmentType)) errors.employmentType = "Choose an employment type.";
  if (!LEVELS.includes(experienceLevel)) errors.experienceLevel = "Choose an experience level.";
  if (!description || description.length > 10_000) errors.description = "Description is required.";
  if (!requirements || requirements.length > 10_000) errors.requirements = "Requirements are required.";
  if (salaryRange.length > 100) errors.salaryRange = "Salary range too long.";
  if (!STATUSES.includes(status)) errors.status = "Invalid status.";

  if (Object.keys(errors).length) return { data: null, errors };
  return {
    data: {
      title, location,
      employmentType: employmentType as EmploymentType,
      experienceLevel: experienceLevel as ExperienceLevel,
      description, requirements,
      salaryRange: salaryRange || null,
      status: status as JobStatus,
    },
    errors: null,
  };
}

