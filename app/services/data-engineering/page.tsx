import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function DataEngineeringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Data Engineering & Analytics"
        accent="Services"
        description="ETL pipelines, data warehousing, real-time analytics, and big data solutions for data-driven decision making."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Enterprise Data Solutions
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We design and build data infrastructure that transforms raw data
                into actionable insights. From ETL pipelines to real-time
                analytics, we deliver data excellence.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                    className="border border-slate-200 rounded-lg p-6 hover:border-brand-2 transition"
                  >
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                    className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200"
                  >
                    <p className="font-semibold text-slate-900">{tech}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                    <span className="text-lg text-slate-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Unlock Your Data's Potential
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's build a data solution that drives business value.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
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
