"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewport } from "@/lib/animations";
import { siteConfig } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

const EMAIL = siteConfig.email;
const MAILTO = `mailto:${EMAIL}?subject=Growth%20inquiry%20for%20Thryvv&body=Hi%20Thryvv%20team%2C%0A%0AHere%20is%20a%20bit%20about%20my%20business%3A%0A%0A`;

export function FinalCta() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="page-shell"
      >
        <p className="section-label">05 / Your next chapter</p>
        <div className="contact-title-row">
          <h2 id="contact-title">Something great<br />starts with <span>hello.</span></h2>
          <button type="button" className="contact-arrow" aria-label="Start a project" title="Start a project" onClick={() => window.dispatchEvent(new Event("thryvv:inquiry"))}><ArrowUpRight strokeWidth={1} aria-hidden="true" /></button>
        </div>
        <div className="contact-bottom">
          <p>Have an idea, a challenge, or a big ambition?<br />We&apos;d love to hear it. Expect a reply within 48 hours.</p>
          <div className="contact-actions">
            <Button href={MAILTO} variant="dark" size="lg" eventName="generate_lead" eventParams={{ method: "email", location: "final_cta" }}>Say hello <ArrowUpRight size={18} aria-hidden="true" /></Button>
            <a href={MAILTO} onClick={() => trackEvent("generate_lead", { method: "email", location: "final_cta_link" })}>{EMAIL}</a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
