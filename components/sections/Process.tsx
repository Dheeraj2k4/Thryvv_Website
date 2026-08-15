"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const steps = [
  {
    no: "01",
    title: "Deep Dive",
    body: "We audit your funnel, data, and market to find the exact levers that move revenue.",
  },
  {
    no: "02",
    title: "Strategic Architecture",
    body: "A clear growth blueprint — channels, messaging, and systems mapped to measurable targets.",
  },
  {
    no: "03",
    title: "Rapid Deployment",
    body: "We launch fast, test aggressively, and start compounding wins within the first cycles.",
  },
  {
    no: "04",
    title: "Motion Continuum",
    body: "Continuous optimization loops keep momentum building long after go-live.",
  },
];

export function Process() {
  return (
    <section id="process" data-nav-theme="dark" className="bg-ink-800 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <Eyebrow dark>Our process</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              How we build the{" "}
              <span className="text-brand">future</span> of your brand.
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="lg:justify-self-end"
          >
            <Button href="#contact" variant="brand" size="lg">
              Book a growth call
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.no}
              variants={fadeUp}
              className="group bg-ink-800 p-8 transition-colors hover:bg-ink-700"
            >
              <p className="font-display text-5xl font-extrabold text-white/15 transition-colors group-hover:text-brand">
                {step.no}
              </p>
              <h3 className="mt-6 font-display text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
