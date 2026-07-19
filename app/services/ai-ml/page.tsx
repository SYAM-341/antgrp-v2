import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function AiMlEngineeringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="AI/ML"
        accent="Engineering"
        description="Machine learning models, large language models, computer vision solutions, and AI-powered applications for modern enterprises."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                AI/ML Engineering Solutions
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                Most machine learning projects die between the demo and
                production. Ours are built for the second part: models with
                monitoring, retraining schedules, and a clear answer to
                &quot;what happens when it&apos;s wrong?&quot;
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Large Language Models",
                    description:
                      "Custom LLM applications, fine-tuning, prompt engineering, and RAG implementations using OpenAI, Claude, and open-source models.",
                  },
                  {
                    title: "Computer Vision",
                    description:
                      "Image recognition, object detection, semantic segmentation, and custom vision models for enterprise applications.",
                  },
                  {
                    title: "Predictive Analytics",
                    description:
                      "Machine learning models for forecasting, classification, and anomaly detection across various business domains.",
                  },
                  {
                    title: "Natural Language Processing",
                    description:
                      "Text analysis, sentiment analysis, entity extraction, and conversational AI systems.",
                  },
                  {
                    title: "Model Training & Optimization",
                    description:
                      "Data preparation, model training, hyperparameter tuning, and optimization for production deployment.",
                  },
                  {
                    title: "MLOps & Deployment",
                    description:
                      "Model versioning, monitoring, retraining pipelines, and production deployment on cloud platforms.",
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
                Technologies & Frameworks
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Python",
                  "TensorFlow",
                  "PyTorch",
                  "OpenAI API",
                  "Anthropic Claude",
                  "Hugging Face",
                  "Scikit-learn",
                  "XGBoost",
                  "LangChain",
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
                  "Automate complex business processes with AI",
                  "Gain actionable insights from data",
                  "Improve decision-making with predictive models",
                  "Enhance customer experience with intelligent systems",
                  "Reduce operational costs through automation",
                  "Apply AI and machine learning where they solve a real business problem",
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
                Considering an AI or ML Initiative?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Describe the problem and the data you have. We&apos;ll tell you
                honestly whether ML is the right tool for it.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
              >
                Start Your AI Project
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
