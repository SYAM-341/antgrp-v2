import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function MobileDevelopmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Mobile Development"
        accent="Services"
        description="Native and cross-platform mobile apps (iOS, Android, React Native) built for performance and user experience."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Enterprise Mobile Solutions
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We build high-performance mobile applications for iOS and
                Android. From native to cross-platform, we deliver mobile
                excellence.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Native iOS Development",
                    description:
                      "Swift and Objective-C development for iOS with native performance and device integration.",
                  },
                  {
                    title: "Native Android Development",
                    description:
                      "Kotlin and Java development for Android with material design and native features.",
                  },
                  {
                    title: "Cross-Platform Development",
                    description:
                      "React Native and Flutter for code sharing between iOS and Android platforms.",
                  },
                  {
                    title: "Mobile UI/UX Design",
                    description:
                      "Design intuitive, beautiful mobile interfaces optimized for user experience.",
                  },
                  {
                    title: "Backend Integration",
                    description:
                      "API integration, authentication, and real-time data synchronization.",
                  },
                  {
                    title: "Performance Optimization",
                    description:
                      "Battery optimization, network efficiency, and smooth animations.",
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
                  "Swift",
                  "Kotlin",
                  "React Native",
                  "Flutter",
                  "Objective-C",
                  "Java",
                  "Firebase",
                  "Xcode",
                  "Android Studio",
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
                  "Native performance and user experience",
                  "Access to device features and sensors",
                  "Code sharing with cross-platform frameworks",
                  "Faster development and faster time to market",
                  "Real-time synchronization and offline support",
                  "Analytics and crash reporting",
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
                Build Your Mobile App
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's create an engaging mobile experience for your users.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
              >
                Start Mobile Project
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
