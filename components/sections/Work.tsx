"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger, viewport } from "@/lib/animations";

type Project = {
  name: string;
  tag: string;
  href: string;
  domain: string;
  from: string;
  to: string;
  image?: string;
};

// Dummy showcase — swap in real screenshots + subdomains as sites go live.
const projects: Project[] = [
  {
    name: "Aroma",
    tag: "Fragrance Brand Site",
    href: "https://aroma.thryvvdigital.in/",
    domain: "aroma.thryvvdigital.in",
    from: "#b98a4e",
    to: "#5a3d1f",
    image: "/images/aroma-preview.png",
  },
  {
    name: "Bloom & Co.",
    tag: "D2C Brand Site",
    href: "https://bloom.thryvvdigital.in",
    domain: "bloom.thryvvdigital.in",
    from: "#ff5c8a",
    to: "#c2185b",
    image: "/images/bloom-preview.png",
  },
  {
    name: "Veilux",
    tag: "Luxury Brand Site",
    href: "https://veilux.thryvvdigital.in",
    domain: "veilux.thryvvdigital.in",
    from: "#6d5b8a",
    to: "#2b1f45",
    image: "/images/veilux-preview.png",
  },
];

function Preview({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="flex items-center gap-1.5 bg-white/[0.06] px-3 py-2.5">
        <span className="size-2 rounded-full bg-red-400/70" />
        <span className="size-2 rounded-full bg-yellow-400/70" />
        <span className="size-2 rounded-full bg-green-400/70" />
        <span className="ml-2 flex-1 truncate rounded bg-white/10 px-2 py-1 text-[10px] text-white/40">
          {project.domain}
        </span>
      </div>
      {project.image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.name} website preview`}
            fill
            sizes="(max-width: 640px) 300px, 380px"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div
          className="aspect-[16/10] p-5"
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.from}, ${project.to})`,
          }}
        >
          <div className="h-3 w-1/2 rounded bg-white/50" />
          <div className="mt-2.5 h-3 w-2/3 rounded bg-white/30" />
          <div className="mt-5 flex gap-3">
            <div className="size-12 rounded-lg bg-white/35" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-2.5 w-full rounded bg-white/25" />
              <div className="h-2.5 w-4/5 rounded bg-white/25" />
              <div className="h-2.5 w-3/5 rounded bg-white/20" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <div className="h-7 w-24 rounded-full bg-white/70" />
            <div className="h-7 w-20 rounded-full bg-white/25" />
          </div>
        </div>
      )}
    </div>
  );
}

export function Work() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-ink py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-96 rounded-full bg-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.div variants={fadeUp}>
              <Eyebrow dark>Selected work</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
            >
              Websites built to{" "}
              <span className="text-brand">convert.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-md text-lg text-white/55"
            >
              A look at the kind of sites we design and ship. Click any project
              to explore it live.
            </motion.p>
          </div>

          {projects.length > 1 && (
            <motion.div variants={fadeUp} className="hidden gap-3 sm:flex">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Previous projects"
                className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Next projects"
                className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/50 hover:bg-white/5"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-6 pt-3"
        >
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-[300px] shrink-0 snap-start rounded-2xl border border-white/10 bg-ink-800 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 sm:w-[380px]"
            >
              <Preview project={project} />
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <h3 className="font-display text-xl font-bold">
                    {project.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-brand-light">
                    {project.tag}
                  </p>
                </div>
                <span className="grid size-10 place-items-center rounded-full border border-white/15 text-white transition-all group-hover:border-brand group-hover:bg-brand">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
