import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  withWordmark?: boolean;
  wordmarkClassName?: string;
};

/** Thryvv circuit-tree mark. Swap for /images/logo.png anytime. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M26 68 L26 48 Q26 42 32 42 L52 42" />
        <path d="M64 50 L64 88" />
        <path d="M64 56 L86 61" />
        <path d="M64 74 L49 92" />
      </g>
      <g stroke="currentColor" strokeWidth={9} fill="none">
        <circle cx="64" cy="42" r="10" />
        <circle cx="98" cy="61" r="10" />
        <circle cx="64" cy="98" r="10" />
      </g>
    </svg>
  );
}

export function Logo({ className, withWordmark = true, wordmarkClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative size-9 overflow-hidden rounded-lg">
        <Image
          src="/images/logo.png"
          alt="Thryvv logo"
          fill
          sizes="36px"
          className="object-cover"
          priority
        />
      </span>
      {withWordmark && (
        <span
          className={cn(
            "font-display text-xl font-extrabold tracking-tight",
            wordmarkClassName,
          )}
        >
          Thryvv
        </span>
      )}
    </span>
  );
}
