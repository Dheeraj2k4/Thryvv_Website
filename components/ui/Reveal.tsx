"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
