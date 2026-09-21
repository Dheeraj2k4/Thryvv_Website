"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

// Public Web3Forms access key — safe to expose; get yours at https://web3forms.com
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || "1b94403a-4d2a-4934-9122-51c35959ec6d";
const PROMPT_SESSION_KEY = "thryvv:lead-prompt-shown";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const promptedRef = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    let scrollFrame = 0;
    try {
      promptedRef.current = sessionStorage.getItem(PROMPT_SESSION_KEY) === "true";
    } catch {}
    const show = (location: "contact" | "after_services") => {
      promptedRef.current = true;
      try {
        sessionStorage.setItem(PROMPT_SESSION_KEY, "true");
      } catch {}
      setOpen(true);
      trackEvent("lead_popup_open", { location });
    };
    const showFromContact = () => show("contact");
    const checkScroll = () => {
      scrollFrame = 0;
      if (promptedRef.current || document.hidden) return;
      const services = document.getElementById("services");
      if (!services || services.getBoundingClientRect().bottom > 0) return;
      if (document.querySelector("dialog[open]") || document.activeElement?.matches("input, textarea, select, [contenteditable='true']")) return;
      show("after_services");
    };
    const scheduleCheck = () => {
      if (!scrollFrame && !promptedRef.current) scrollFrame = requestAnimationFrame(checkScroll);
    };
    window.addEventListener("thryvv:inquiry", showFromContact);
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);
    scheduleCheck();
    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("thryvv:inquiry", showFromContact);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [open, lenis]);

  function close() {
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const need = String(data.get("need") ?? "").trim();

    data.set("access_key", WEB3FORMS_KEY);
    data.set("subject", "New enquiry from Thryvv website");
    data.set("from_name", "Thryvv Website");
    data.set("name", name);
    data.set("email", email);
    data.set("phone", phone || "Not provided");
    data.set("message", need || "Not provided");
    data.delete("need");

    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });
      const result = await res.json();

      if (res.ok && result.success) {
        trackEvent("generate_lead", { method: "popup", location: "contact" });
        form.reset();
        setStatus("idle");
        setSubmitted(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog ref={dialogRef} className="lead-dialog" aria-labelledby="lead-popup-title" onCancel={close} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); close(); } }} onClick={(event) => { if (event.target === event.currentTarget) close(); }} data-lenis-prevent>
          <motion.div
            className="relative w-full bg-white p-6 text-ink sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              title="Close inquiry"
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-black/15 text-ink transition-colors hover:bg-cloud"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="py-6 text-center" role="status">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand/20 text-brand">
                  <Check size={28} aria-hidden="true" />
                </div>
                <h3 id="lead-popup-title" className="mt-5 font-display text-2xl font-bold">
                  Thanks — talk soon!
                </h3>
                <p className="mt-2 text-ink/65">
                  We&apos;ve got your details and will reach out shortly.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs font-medium uppercase text-brand-dark">
                  Let&apos;s talk
                </p>
                <h3
                  id="lead-popup-title"
                  className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl"
                >
                  What&apos;s your next big idea?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  Leave your details and we&apos;ll get in touch about your
                  project.
                </p>

                <form onSubmit={handleSubmit} className="inquiry-form mt-6 space-y-4">
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
                      Phone number <span className="text-ink/50">(optional)</span>
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
                      What do you need? <span className="text-ink/50">(optional)</span>
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
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === "submitting" ? "Sending…" : "Send my details"}
                  </button>

                  {status === "error" && (
                    <p role="alert" className="text-center text-sm text-brand-dark">
                      We couldn&apos;t send your message. Please try again or <a href={`mailto:${siteConfig.email}`} className="underline">email us directly</a>.
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
    </dialog>
  );
}
