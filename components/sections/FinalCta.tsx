"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewport } from "@/lib/animations";
import { siteConfig } from "@/lib/site";

const EMAIL = siteConfig.email;
const MAILTO = `mailto:${EMAIL}?subject=Growth%20inquiry%20for%20Thryvv&body=Hi%20Thryvv%20team%2C%0A%0AHere%20is%20a%20bit%20about%20my%20business%3A%0A%0A`;

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
          Ready for the <br />
          <span className="text-brand">Next Level?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-ink/60">
          Tell us about your business and where you want to take it. Send us an
          email and we&apos;ll get back to you within 48 hours with a custom
          growth roadmap.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href={MAILTO} variant="brand" size="lg">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Email us
          </Button>
          <Button href="#services" variant="glass" size="lg">
            Explore services
          </Button>
        </div>
        <a
          href={MAILTO}
          className="mt-8 inline-block font-display text-lg font-semibold text-ink/80 underline decoration-brand/50 decoration-2 underline-offset-4 transition-colors hover:text-ink"
        >
          {EMAIL}
        </a>
      </motion.div>
    </section>
  );
}
