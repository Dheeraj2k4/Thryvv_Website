"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BrandScene = dynamic(() => import("@/components/ui/BrandScene"), { ssr: false });

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="top" className="agency-hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-fallback" aria-hidden="true">
        <Image src="/images/logo.png" alt="" width={320} height={320} />
      </div>
      <BrandScene />
      <div className="hero-content page-shell">
        <div className="hero-kicker">
          <span>Independent digital growth agency</span>
          <span className="hero-kicker-right"><span className="status-dot" /> Built for what&apos;s next</span>
        </div>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-wordmark"
        >
          Thryvv<span>.</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hero-intro"
        >
          <h2>Built to stand out.<br /><span>Made to perform.</span></h2>
          <p>We turn ambitious businesses into brands people choose. Through thoughtful design, powerful websites, and marketing that moves you forward.</p>
          <div className="hero-actions">
            <Button href="#contact" variant="brand" size="lg" eventName="cta_click" eventParams={{ location: "hero" }}>
              Let&apos;s build something <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <a href="#work" className="text-link">Explore our work <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </motion.div>
        <div className="hero-foot">
          <span>Good design gets attention. Great strategy keeps it.</span>
          <a href="#work" aria-label="Scroll to selected work" title="Scroll to selected work"><ArrowDown size={19} /></a>
        </div>
      </div>
    </section>
  );
}