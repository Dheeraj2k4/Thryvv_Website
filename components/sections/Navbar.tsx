"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Process", href: "#process" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Probe the section sitting under the navbar to flip its color theme.
    const probeY = 42;
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections =
        document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let dark = false;
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          dark = el.dataset.navTheme === "dark";
        }
      });
      setOnDark(dark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mt-3 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6",
            onDark ? "glass-dark" : "glass-grey",
            scrolled
              ? "shadow-xl shadow-black/10"
              : "shadow-lg shadow-black/5",
          )}
        >
          <a href="#top" aria-label="Thryvv home">
            <Logo wordmarkClassName={onDark ? "text-white" : undefined} />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  onDark
                    ? "text-white/70 hover:text-white"
                    : "text-ink/70 hover:text-ink",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              href="#contact"
              variant="brand-outline"
              size="md"
              eventName="contact_click"
              eventParams={{ location: "navbar" }}
            >
              Get in Touch
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={cn(
              "grid size-10 place-items-center rounded-full border md:hidden",
              onDark ? "border-white/20" : "border-black/10",
            )}
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-full transition-transform",
                  onDark ? "bg-white" : "bg-ink",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-full transition-transform",
                  onDark ? "bg-white" : "bg-ink",
                  open && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col gap-1 rounded-3xl border border-black/5 bg-white p-3 shadow-xl md:hidden"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-ink/80 hover:bg-cloud"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href="#contact"
                className="mt-1 w-full"
                eventName="contact_click"
                eventParams={{ location: "navbar_mobile" }}
              >
                Get in Touch
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
