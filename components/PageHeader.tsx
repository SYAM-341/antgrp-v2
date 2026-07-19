import Container from "@/components/Container";
import { LogoMark } from "@/components/Logo";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  accent,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-header-light py-14 md:py-20">
      <LogoMark
        color="rgba(15, 118, 110, 0.06)"
        className="pointer-events-none absolute -bottom-20 right-[-40px] h-72 w-72 md:right-[6%] md:h-96 md:w-96"
      />
      <Container size="wide">
        <div className="relative z-10 max-w-3xl">
          {eyebrow && (
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              {eyebrow}
            </div>
          )}

          <h1 className="font-display text-3xl text-ink md:text-5xl">
            {title}
            {accent && (
              <span className="mt-1 block text-brand">{accent}</span>
            )}
          </h1>

          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
