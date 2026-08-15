import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-accent text-xs font-semibold uppercase tracking-[0.18em]",
        dark ? "text-brand-light" : "text-brand",
        className,
      )}
    >
      <span className="h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  );
}
