import { clsx } from "@/lib/clsx";

export default function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const max =
    size === "wide" ? "max-w-7xl" : size === "narrow" ? "max-w-4xl" : "max-w-6xl";
  return <div className={clsx("mx-auto w-full px-6", max, className)}>{children}</div>;
}
