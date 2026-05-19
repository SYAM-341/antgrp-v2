import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    location: "Remote",
    level: "Senior",
    type: "Full-time",
    description:
      "We're looking for experienced full-stack engineers to build scalable web applications with modern tech stacks including React, Node.js, and cloud platforms.",
  },
  {
    title: "Cloud Architect",
    location: "Remote",
    level: "Senior",
    type: "Full-time",
    description:
      "Design and implement cloud solutions on AWS, Azure, and GCP. Help enterprises architect scalable, secure, and cost-effective cloud infrastructures.",
  },
  {
    title: "DevOps Engineer",
    location: "Remote",
    level: "Mid-Level",
    type: "Full-time",
    description:
      "Build and maintain CI/CD pipelines, manage Kubernetes clusters, and implement infrastructure-as-code solutions for modern applications.",
  },
  {
    title: "Data Engineer",
    location: "Remote",
    level: "Mid-Level",
    type: "Full-time",
    description:
      "Design and implement ETL pipelines, data warehouses, and analytics solutions. Work with big data technologies and modern data stacks.",
  },
  {
    title: "AI/ML Engineer",
    location: "Remote",
    level: "Senior",
    type: "Full-time",
    description:
      "Develop machine learning models, implement LLM solutions, and build AI-powered applications for enterprise clients.",
  },
  {
    title: "Mobile App Developer",
    location: "Remote",
    level: "Mid-Level",
    type: "Full-time",
    description:
      "Build native and cross-platform mobile applications for iOS and Android. Work with React Native, Swift, and Kotlin.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Join Our"
        accent="Engineering Teams"
        description="We're building high-performing engineering squads. If you're passionate about technology and want to grow with us, we'd love to hear from you."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl">
              We're actively hiring engineers across various disciplines. Check
              out our current openings and apply if you match the profile.
            </p>

            <div className="grid gap-6">
              {openings.map((job) => (
                <div
                  key={job.title}
                  className="rounded-lg border border-slate-200 p-8 hover:border-brand-2 hover:shadow-lg transition duration-300 bg-white"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="text-sm px-3 py-1 bg-blue-50 text-brand rounded-full">
                          {job.location}
                        </span>
                        <span className="text-sm px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                          {job.level}
                        </span>
                        <span className="text-sm px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {job.description}
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-2 transition"
                  >
                    Apply Now →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 border border-blue-200 p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Don't see a fitting role?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented engineers. Send us your resume
              and we'll keep it on file for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
            >
              Send Your Resume
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
