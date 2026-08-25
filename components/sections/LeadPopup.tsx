"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const shownRef = useRef(false);

  // Reveal once the visitor scrolls past the portfolio ("#work") section.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const work = document.getElementById("work");
    if (!work) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        if (scrolledPast && !shownRef.current) {
          shownRef.current = true;
          setOpen(true);
          trackEvent("lead_popup_open", { location: "after_work" });
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(work);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll and allow closing with Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const need = String(data.get("need") ?? "").trim();

    trackEvent("generate_lead", { method: "popup", location: "after_work" });

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      need && `What they need: ${need}`,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "New enquiry from Thryvv website"
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    window.location.href = mailto;
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="lead-popup-title"
        >
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-ink-800 p-6 text-white shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand/20 text-brand">
                  <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">
                  Thanks — talk soon!
                </h3>
                <p className="mt-2 text-white/60">
                  We&apos;ve got your details and will reach out shortly.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-light">
                  Let&apos;s talk
                </p>
                <h3
                  id="lead-popup-title"
                  className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl"
                >
                  Like what you see?
                </h3>
                <p className="mt-2 text-white/60">
                  Leave your details and we&apos;ll get in touch about your
                  project.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="lead-name" className="mb-1.5 block text-sm text-white/70">
                      Name <span className="text-brand">*</span>
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-email" className="mb-1.5 block text-sm text-white/70">
                      Email <span className="text-brand">*</span>
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="mb-1.5 block text-sm text-white/70">
                      Phone number <span className="text-white/40">(optional)</span>
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 00000 00000"
                      className="w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-need" className="mb-1.5 block text-sm text-white/70">
                      What do you need? <span className="text-white/40">(optional)</span>
                    </label>
                    <textarea
                      id="lead-need"
                      name="need"
                      rows={3}
                      placeholder="Tell us a bit about your project"
                      className="w-full resize-none rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    Send my details
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
