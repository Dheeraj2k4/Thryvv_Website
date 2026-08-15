"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const cards = [
  {
    title: "Landing Page Strategy",
    body: "High-intent pages engineered around a single decisive action, stripping friction until conversion becomes the obvious next step.",
    icon: (
      <path d="M4 5h16M4 12h10M4 19h7" />
    ),
  },
  {
    title: "Precision Targeted Acquisition",
    body: "We find the exact audiences ready to buy and put your offer in front of them with surgical, data-led media placement.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Conversion-First UI Design",
    body: "Interfaces designed to persuade — every layout, motion, and pixel tuned to move visitors toward the outcome you care about.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 9h16M9 9v11" />
      </>
    ),
  },
];

export function Specialty() {
  return (
    <section id="approach" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <Eyebrow>What we solve</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Digital hurdles are <br className="hidden sm:block" /> our
              specialty.
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="max-w-lg text-lg text-ink/60 lg:justify-self-end"
          >
            Stalled funnels, leaking budgets, flat conversion. We diagnose the
            real blockers and rebuild your growth engine from the foundation up.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              className="group rounded-3xl border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-black/5"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-cloud text-ink transition-colors group-hover:bg-brand group-hover:text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {card.icon}
                </svg>
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {card.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
