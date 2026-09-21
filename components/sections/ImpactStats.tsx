"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";

const commitments = [
  { value: "1:1", label: "Founder-led collaboration" },
  { value: "100%", label: "Built around your business" },
  { value: "48h", label: "To start the conversation" },
];

export function ImpactStats() {
  return (
    <section id="impact" className="about-section section-space" aria-labelledby="about-title">
      <div className="page-shell about-layout">
        <motion.div className="about-identity" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <p className="section-label">02 / The Thryvv mindset</p>
          <figure className="about-artwork">
            <div className="about-artwork-top"><span>Independent by design</span><ArrowUpRight size={22} aria-hidden="true" /></div>
            <div className="about-brand-mark"><Image src="/images/logo.png" alt="Thryvv" fill sizes="(max-width: 767px) 140px, (max-width: 1100px) 120px, 180px" className="object-contain" /></div>
            <figcaption><span>Design.</span><span>Build.</span><span>Grow.</span></figcaption>
          </figure>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <h2 id="about-title">Not just a pretty website.<br />Your next <span>unfair advantage.</span></h2>
          <div className="about-copy"><p>There&apos;s a difference between being online and being impossible to overlook. We bring design, technology, and growth strategy together to help you close that gap.</p><p>A small, independent team. A direct relationship. And the same care for your business that we put into our own.</p></div>
          <a href="#contact" className="text-link">Meet your next creative partner <ArrowUpRight size={18} aria-hidden="true" /></a>
          <div className="commitment-grid">{commitments.map((item) => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
        </motion.div>
      </div>
    </section>
  );
}