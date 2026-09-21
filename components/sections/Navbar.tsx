"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Our process", href: "#process" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (breakpoint.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    breakpoint.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      breakpoint.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="agency-nav">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="page-shell nav-inner">
        <a href="#top" aria-label="Thryvv home" onClick={() => setOpen(false)}><Logo /></a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="nav-contact">
          <Button href="#contact" variant="dark" eventName="contact_click" eventParams={{ location: "navbar" }}>
            Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>
        <button ref={toggleRef} type="button" className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" title={open ? "Close menu" : "Open menu"}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={20} aria-hidden="true" /></a>)}
            <a href="#contact" onClick={() => setOpen(false)}>Let&apos;s talk <ArrowUpRight size={20} aria-hidden="true" /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}