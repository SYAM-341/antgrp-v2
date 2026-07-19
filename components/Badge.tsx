import { clsx } from "@/lib/clsx";

export default function Badge({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "accent";
}) {
  const styles =
    variant === "dark"
      ? "border-line bg-soft text-ink"
      : variant === "accent"
      ? "border-brand/40 bg-brand-2/10 text-brand-3"
      : "border-line bg-soft text-mute";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        styles,
      )}
    >
      {children}
    </span>
  );
}
