// Exports jobs and applications to backup-<date>.json.
// Usage: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/export-data.mjs
// Without Supabase env vars it exports the local .data store instead.
import { writeFileSync, readFileSync, existsSync } from "fs";

const stamp = new Date().toISOString().slice(0, 10);
const out = `backup-${stamp}.json`;

if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const jobs = await client.from("jobs").select("*");
  const applications = await client.from("applications").select("*");
  if (jobs.error || applications.error) {
    console.error(jobs.error ?? applications.error);
    process.exit(1);
  }
  writeFileSync(out, JSON.stringify({ exportedAt: new Date().toISOString(), jobs: jobs.data, applications: applications.data }, null, 2));
} else if (existsSync(".data/db.json")) {
  const db = JSON.parse(readFileSync(".data/db.json", "utf8"));
  writeFileSync(out, JSON.stringify({ exportedAt: new Date().toISOString(), ...db }, null, 2));
} else {
  console.error("No Supabase env vars and no local .data store found.");
  process.exit(1);
}
console.log(`wrote ${out}`);
