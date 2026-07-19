import { clsx } from "@/lib/clsx";

/** Triangle "A" brand mark from the AntGRP identity system. */
export function LogoMark({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 2.5 L22.5 21.5 H16.1 L12 13.6 L7.9 21.5 H1.5 Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Full lockup: triangle mark + "AntGRP" wordmark.
 * "Ant" uses the base tone, "GRP" uses the copper accent.
 */
export default function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-7 w-7 shrink-0 text-brand" />
      <span
        className={clsx(
          "text-[19px] font-bold leading-none tracking-tight",
          dark ? "text-white" : "text-ink",
        )}
      >
        Ant<span className="text-brand">GRP</span>
      </span>
    </span>
  );
}
