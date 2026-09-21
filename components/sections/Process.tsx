"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const steps = [
  { number: "01", title: "Discover", body: "First, we listen. Your business, your audience, and what success actually looks like for you." },
  { number: "02", title: "Define", body: "We turn the insights into a clear direction. The strategy, the scope, and a plan we both believe in." },
  { number: "03", title: "Create", body: "Design meets development. We build, share, refine, and keep you close to the process." },
  { number: "04", title: "Evolve", body: "Launch is a starting point. We measure, learn, and find the next opportunity to move you forward." },
];

export function Process() {
  return (
    <section id="process" className="process-section section-space" aria-labelledby="process-title">
      <div className="page-shell">
        <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div><p className="section-label">04 / How we work</p><h2 id="process-title">A clear process.<br /><span>A shared ambition.</span></h2></div>
          <a href="#contact" className="text-link">Start a conversation <ArrowUpRight size={18} aria-hidden="true" /></a>
        </motion.div>
        <motion.div className="process-grid" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          {steps.map((step) => <motion.div key={step.number} variants={fadeUp} className="process-step"><div className="process-step-top"><span>{step.number}</span><ArrowUpRight size={20} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.body}</p></motion.div>)}
        </motion.div>
      </div>
    </section>
  );
}