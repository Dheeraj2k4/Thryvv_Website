"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const stats = [
  { value: 48, suffix: "h", label: "Average reply time" },
  { value: 100, suffix: "%", label: "Custom strategy, no templates" },
  { value: 1, suffix: ":1", label: "Founder-led partnership" },
  { value: 0, suffix: "", label: "Long-term lock-ins" },
];

export function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fdf3ed] to-cloud pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* Wave divider blends the white hero into this section as one flow */}
      <svg
        className="absolute inset-x-0 top-0 h-16 w-full sm:h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,48 C1160,112 1000,8 720,44 C440,80 260,4 0,56 Z"
          fill="#ffffff"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="bg-white px-6 py-8 text-center sm:text-left"
            >
              <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                />
              </p>
              <p className="mt-2 text-sm text-ink/55">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
