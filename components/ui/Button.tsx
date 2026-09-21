"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type Variant = "brand" | "brand-outline" | "dark" | "light" | "outline" | "glass";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-3 rounded-full font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-[#171715] hover:bg-brand-dark hover:text-white hover:-translate-y-0.5",
  "brand-outline":
    "border border-brand text-brand hover:bg-brand hover:text-white",
  dark: "bg-ink text-white hover:bg-ink-700 hover:-translate-y-0.5",
  light: "bg-white text-ink hover:bg-cloud hover:-translate-y-0.5",
  outline:
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  glass: "glass text-ink hover:-translate-y-0.5 shadow-lg shadow-black/5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-4 text-sm",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
  eventName?: string;
  eventParams?: Record<string, unknown>;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

export function Button({
  variant = "brand",
  size = "md",
  href,
  children,
  className,
  eventName,
  eventParams,
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  return (
    <a
      href={href ?? "#"}
      className={classes}
      onClick={(e) => {
        if (eventName) trackEvent(eventName, eventParams);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
