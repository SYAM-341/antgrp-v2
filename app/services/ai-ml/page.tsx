import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function AiMlEngineeringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="AI/ML Engineering"
        accent="Services"
        description="Machine learning models, large language models, computer vision solutions, and AI-powered applications for modern enterprises."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                AI/ML Engineering Solutions
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We build intelligent systems and machine learning solutions that
                drive business value. From LLM applications to computer vision,
                we deliver production-ready AI/ML systems.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                  "Automate complex business processes with AI",
                  "Gain actionable insights from data",
                  "Improve decision-making with predictive models",
                  "Enhance customer experience with intelligent systems",
                  "Reduce operational costs through automation",
                  "Stay competitive with cutting-edge AI technology",
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
                Ready to Leverage AI/ML?
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how AI and machine learning can transform your
                business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
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
