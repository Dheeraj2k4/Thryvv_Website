"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Braces, ChartNoAxesCombined, Fingerprint, Minus, Plus, Workflow } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";

const services = [
  { title: "Brand & digital design", summary: "Make the first impression count.", description: "A distinctive visual direction that feels like you, connects with your audience, and stays consistent at every touchpoint.", points: ["Creative direction", "UI / UX design", "Conversion-first landing pages"], icon: Fingerprint },
  { title: "Websites & development", summary: "Beautiful outside. Powerful underneath.", description: "Fast, responsive websites built around a clear customer journey. From the first visit to the final conversion, every detail has a job to do.", points: ["Custom websites", "Technical SEO", "Performance & accessibility"], icon: Braces },
  { title: "Performance marketing", summary: "Turn attention into action.", description: "Connect with the right audience through search and social. We bring a test-and-learn approach to your creative, campaigns, and conversion funnel.", points: ["Paid search & social", "Creative testing", "Analytics & optimization"], icon: ChartNoAxesCombined },
  { title: "Automation & growth", summary: "Less busywork. More momentum.", description: "Connect your tools, streamline your operations, and give your team room to grow. Practical systems that work together as your business evolves.", points: ["CRM integrations", "Marketing automation", "Scalable infrastructure"], icon: Workflow },
];

export function PrecisionTools() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="services-section section-space" aria-labelledby="services-title">
      <div className="page-shell services-layout">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <p className="section-label">03 / What we do</p>
          <h2 id="services-title">Big picture.<br /><span>Every detail.</span></h2>
          <p className="services-intro">From your first impression to your next stage of growth. One creative partner for the whole journey.</p>
          <a href="#contact" className="text-link">Find your starting point <ArrowUpRight size={18} aria-hidden="true" /></a>
        </motion.div>
        <div className="service-list">
          {services.map((service, index) => {
            const expanded = active === index;
            const Icon = service.icon;
            return (
              <div className={`service-item ${expanded ? "is-open" : ""}`} key={service.title}>
                <h3><button type="button" aria-expanded={expanded} aria-controls={`service-panel-${index}`} id={`service-trigger-${index}`} onClick={() => setActive(expanded ? null : index)}>
                  <span className="service-number">0{index + 1}</span><span>{service.title}</span>{expanded ? <Minus size={21} aria-hidden="true" /> : <Plus size={21} aria-hidden="true" />}
                </button></h3>
                <AnimatePresence initial={false}>
                  {expanded && <motion.div id={`service-panel-${index}`} role="region" aria-labelledby={`service-trigger-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="service-panel">
                    <div className="service-detail"><Icon size={34} strokeWidth={1.2} aria-hidden="true" /><div><h4>{service.summary}</h4><p>{service.description}</p><ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul></div></div>
                  </motion.div>}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}