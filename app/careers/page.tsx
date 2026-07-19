import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const metadata = {
  title: "Careers — AntGRP",
  description:
    "Open engineering roles at AntGRP, across full-stack development, cloud architecture, DevOps, data engineering, AI/ML, and mobile development.",
};

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
        title="Your next opportunity"
        accent="starts here."
        description="AntGRP places technologists with leading organizations across healthcare, finance, retail, and SaaS — and hires for our own consulting teams. If you're serious about your craft, we'd love to hear from you."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-16">
            <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-mute mb-12 max-w-2xl">
              We&apos;re hiring engineers across several disciplines. Review our
              current openings and apply if your background matches the
              profile.
            </p>

            <div className="grid gap-6">
              {openings.map((job) => (
                <div
                  key={job.title}
                  className="rounded-2xl border border-line bg-white p-8 transition duration-300 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-ink">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="text-sm px-3 py-1 bg-brand/10 text-brand rounded-full">
                          {job.location}
                        </span>
                        <span className="text-sm px-3 py-1 bg-soft text-mute rounded-full">
                          {job.level}
                        </span>
                        <span className="text-sm px-3 py-1 bg-soft text-mute rounded-full">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-mute mb-6 leading-relaxed">
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

          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-3 to-brand p-12 text-center md:p-16">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Don&apos;t see a fitting role?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/90">
              We&apos;re always interested in hearing from strong engineers. Send
              your resume and we&apos;ll keep it on file for future openings.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
            >
              Send Your Resume
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
