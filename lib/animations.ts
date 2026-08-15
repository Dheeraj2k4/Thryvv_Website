import type { Variants } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
};

export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export const viewport = { once: true, margin: "-90px" } as const;
