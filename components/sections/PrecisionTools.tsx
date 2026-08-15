"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, viewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

function FoundationsArt() {
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-sand-light to-sand">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={cn(
              "size-14 rounded-xl",
              i % 4 === 0 ? "bg-brand" : "bg-white/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CubeArt() {
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#eaf0ff] to-[#dbe6ff]">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-2/3"
        initial={{ rotate: -6, y: 10, opacity: 0 }}
        whileInView={{ rotate: 0, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <polygon points="100,20 170,60 100,100 30,60" fill="#5b8cff" />
        <polygon points="30,60 100,100 100,180 30,140" fill="#3d6ef0" />
        <polygon points="170,60 100,100 100,180 170,140" fill="#2a52c9" />
      </motion.svg>
    </div>
  );
}

const features = [
  {
    tag: "01 — Foundation",
    title: "Performance Digital Foundations",
    body: "Fast, technically flawless sites built on clean architecture, Core Web Vitals, and analytics that actually track what matters. The bedrock every growth campaign stands on.",
    points: ["Core Web Vitals tuned", "Event-level analytics", "Scalable component system"],
    art: <FoundationsArt />,
    reverse: false,
  },
  {
    tag: "02 — Scale",
    title: "Paid Media & Vertical Scaling",
    body: "Aggressive, ROI-obsessed media buying across search, social, and native. We scale winners vertically and cut losers ruthlessly — compounding spend into predictable revenue.",
    points: ["Full-funnel paid strategy", "Creative testing engine", "Vertical budget scaling"],
    art: (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl">
        {/* Replace /images/paid-scaling.svg with your own asset anytime */}
        <img
          src="/images/paid-scaling.svg"
          alt="Paid media and vertical scaling"
          className="size-full object-cover"
        />
      </div>
    ),
    reverse: true,
  },
  {
    tag: "03 — Future",
    title: "Future-Ready Technical Growth",
    body: "Automation, integrations, and infrastructure that let you grow without breaking. We future-proof your stack so scaling never means starting over.",
    points: ["Marketing automation", "CRM & API integrations", "Composable infrastructure"],
    art: <CubeArt />,
    reverse: false,
  },
];

export function PrecisionTools() {
  return (
    <section
      id="services"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow dark className="justify-center">Precision tools</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Precision tools for{" "}
            <span className="text-brand italic font-medium">aggressive</span>{" "}
            growth.
          </h2>
        </motion.div>

        <div className="mt-16 space-y-16 sm:space-y-24">
          {features.map((f) => (
            <div
              key={f.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className={cn(f.reverse && "lg:order-2")}
              >
                {f.art}
              </motion.div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className={cn(f.reverse && "lg:order-1")}
              >
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-brand">
                  {f.tag}
                </span>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
                  {f.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/60">
                  {f.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-white/80">
                      <span className="grid size-5 place-items-center rounded-full bg-brand/20 text-brand-light">
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
