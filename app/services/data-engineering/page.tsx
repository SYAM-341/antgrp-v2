import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function DataEngineeringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Data Engineering &"
        accent="Analytics"
        description="ETL pipelines, data warehousing, real-time analytics, and big data solutions for data-driven decision making."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                Enterprise Data Solutions
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                A dashboard nobody trusts is worse than no dashboard. We build
                pipelines and warehouses where the numbers reconcile,
                the lineage is traceable, and finance stops keeping its own
                spreadsheet on the side.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "ETL Pipeline Development",
                    description:
                      "Design and implement ETL pipelines that extract, transform, and load data at scale.",
                  },
                  {
                    title: "Data Warehouse Architecture",
                    description:
                      "Design data warehouses on Snowflake, BigQuery, or Redshift for analytics at scale.",
                  },
                  {
                    title: "Real-Time Analytics",
                    description:
                      "Stream processing with Kafka, Spark for real-time data processing and analytics.",
                  },
                  {
                    title: "Data Lake Implementation",
                    description:
                      "Build data lakes that consolidate data from multiple sources for unified analytics.",
                  },
                  {
                    title: "Business Intelligence",
                    description:
                      "Dashboards and visualizations with Tableau, Power BI, or Looker for data-driven decisions.",
                  },
                  {
                    title: "Data Quality & Governance",
                    description:
                      "Data validation, quality assurance, and governance frameworks for data integrity.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
                  >
                    <h4 className="text-xl font-semibold text-ink mb-3">
                      {item.title}
                    </h4>
                    <p className="text-mute leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                Technologies & Platforms
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Snowflake",
                  "BigQuery",
                  "Apache Spark",
                  "Kafka",
                  "Airflow",
                  "dbt",
                  "Tableau",
                  "Power BI",
                  "Python",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="rounded-xl border border-line bg-cream p-4 text-center transition hover:border-brand/40 hover:bg-soft"
                  >
                    <p className="font-semibold text-ink">{tech}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                Key Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  "Data-driven decision making",
                  "Real-time insights into business operations",
                  "Unified view of data across organization",
                  "Faster time to insight with automated pipelines",
                  "Scalable infrastructure for growing data",
                  "Compliance and data governance",
                ].map((benefit) => (
                  <li key={benefit} className="flex gap-4">
                    <span className="text-brand font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-lg text-mute">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-3 to-brand p-12 text-center md:p-16">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Put Your Data to Work
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Tell us what decisions your data should be supporting.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
              >
                Start Data Journey
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
