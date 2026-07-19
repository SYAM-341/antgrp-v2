import Container from "./Container";
import { clsx } from "@/lib/clsx";

export default function Section({
  title,
  eyebrow,
  variant = "light",
  children,
  size = "wide",
}: {
  title: string;
  eyebrow?: string;
  variant?: "light" | "cream" | "dark";
  size?: "default" | "wide";
  children: React.ReactNode;
}) {
  const bg =
    variant === "dark"
      ? "bg-cream text-ink"
      : variant === "cream"
      ? "bg-cream text-ink"
      : "bg-white text-ink";

  const eyebrowColor = "text-brand";
  const titleColor = "text-ink";
  const bodyColor = "text-mute";

  return (
    <section className={clsx("py-20 md:py-24", bg)}>
      <Container size={size}>
        <div className="max-w-3xl">
          {eyebrow ? (
            <div
              className={clsx(
                "text-[11px] font-bold uppercase tracking-[0.18em]",
                eyebrowColor,
              )}
            >
              {eyebrow}
            </div>
          ) : null}
          <h2
            className={clsx(
              "mt-3 font-display text-4xl md:text-5xl",
              titleColor,
            )}
          >
            {title}
          </h2>
        </div>

        <div className={clsx("mt-8 text-[15px] leading-7", bodyColor)}>
          {children}
        </div>
      </Container>
    </section>
  );
}
