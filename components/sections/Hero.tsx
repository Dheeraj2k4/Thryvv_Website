"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fadeUp, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Chip = {
  position: string;
  delay: number;
  label?: string;
  icon: React.ReactNode;
};

const chips: Chip[] = [
  {
    position: "left-[6%] top-[26%]",
    delay: 0,
    label: "+312% ROI",
    icon: <path d="M3 17l6-6 4 4 8-8M17 7h4v4" />,
  },
  {
    position: "right-[7%] top-[20%]",
    delay: 0.6,
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    position: "left-[13%] bottom-[20%]",
    delay: 1.1,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    position: "right-[12%] bottom-[24%]",
    delay: 0.35,
    label: "SEO",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    position: "right-[20%] top-[46%]",
    delay: 0.85,
    icon: <path d="M3 3v18h18M7 14l4-4 3 3 5-6" />,
  },
  {
    position: "left-[18%] top-[48%]",
    delay: 1.4,
    icon: (
      <path d="M12 2v3m0 14v3m9-10h-3M5 12H2m15.07-5.07-2.12 2.12M8.05 15.95l-2.12 2.12m0-11.14 2.12 2.12m6.9 6.9 2.12 2.12" />
    ),
  },
];

function FloatingChip({ position, delay, label, icon }: Chip) {
  return (
    <motion.div
      className={cn(
        "absolute hidden items-center gap-2 rounded-2xl shadow-xl shadow-brand/10 glass md:flex",
        label ? "h-12 px-3" : "size-12 justify-center",
        position,
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7 + delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-brand"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
        {label && (
          <span className="font-display text-sm font-bold text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      {/* Concentric pulse rings echoing the "Global Pulse" theme */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 32%, rgba(10,10,10,0.05) 0 1px, transparent 1px 76px)",
          maskImage:
            "radial-gradient(circle at 50% 32%, black 8%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 32%, black 8%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[110px]" />

      {chips.map((chip) => (
        <FloatingChip key={chip.position} {...chip} />
      ))}

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <span className="grid size-16 place-items-center rounded-2xl border border-black/5 bg-white p-2 shadow-lg shadow-brand/10">
            <span className="relative size-full overflow-hidden rounded-xl">
              <Image
                src="/images/logo.png"
                alt="Thryvv"
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </span>
          </span>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Eyebrow className="justify-center">
            Precision Digital Growth Agency
          </Eyebrow>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Turn Your Business Into a{" "}
          <span className="font-display italic font-medium">Global</span>{" "}
          <span className="text-brand">Pulse.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65"
        >
          We engineer aggressive, measurable growth through performance
          foundations, paid media scaling, and future-ready technical systems
          built to convert.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#contact" variant="brand" size="lg">
            Start Your Growth
          </Button>
          <Button href="#services" variant="glass" size="lg">
            See how it works
            <span className="text-brand">→</span>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
