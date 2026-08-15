"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const statements = [
  {
    headline: "Revenue-obsessed.",
    body: "Every decision ladders up to your bottom line. We optimize for money in the bank, never vanity metrics.",
  },
  {
    headline: "Data over guesswork.",
    body: "We test relentlessly and let performance decide. Opinions lose to evidence, every single time.",
  },
  {
    headline: "Built to scale.",
    body: "Systems engineered to compound, so growth never means starting over or breaking what works.",
  },
];

export function ImpactStats() {
  return (
    <section id="impact" className="bg-cloud py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Eyebrow>Our philosophy</Eyebrow>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Growth isn&apos;t luck. <br className="hidden sm:block" />
            It&apos;s{" "}
            <span className="text-brand italic font-medium">engineering.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-ink/60"
          >
            We&apos;re a new agency built on one belief: marketing should be
            measurable, aggressive, and accountable to revenue. No fluff, no
            guesswork — just growth you can prove.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 sm:mt-20 md:grid-cols-3"
        >
          {statements.map((s) => (
            <motion.div
              key={s.headline}
              variants={fadeUp}
              className="group bg-white p-8 transition-colors hover:bg-cloud sm:p-10"
            >
              <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {s.headline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink/60">
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
