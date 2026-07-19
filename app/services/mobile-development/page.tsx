import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function MobileDevelopmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Mobile"
        accent="Development"
        description="Native and cross-platform mobile apps (iOS, Android, React Native) built for performance and user experience."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                Enterprise Mobile Solutions
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                A mobile app is judged in its first ten seconds and its next
                ten thousand sessions. We build for both: iOS and Android
                apps that launch fast, sync reliably, and survive the app
                store review process without drama.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
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
                      "Design clear, intuitive mobile interfaces optimized for usability and performance.",
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
                    <span className="text-lg text-mute">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-3 to-brand p-12 text-center md:p-16">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Build Your Mobile App
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Let&apos;s create an engaging mobile experience for your users.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
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
