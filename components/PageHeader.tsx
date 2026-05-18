import Container from "@/components/Container";

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
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand mb-3">
              {eyebrow}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            {title}
            {accent && (
              <span className="block text-brand mt-2">{accent}</span>
            )}
          </h1>
          
          {description && (
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
