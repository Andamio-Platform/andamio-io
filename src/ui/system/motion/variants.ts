import type { Variants } from "motion/react";
import { motion as motionTok } from "../tokens";

/** Module-level variants — reused hot-path objects (cds-motion-framer perf). */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: motionTok.reveal.y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTok.duration.enter,
      ease: motionTok.ease,
    },
  },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: motionTok.reveal.ySoft },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTok.duration.enterFast,
      ease: motionTok.ease,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTok.stagger.children,
      delayChildren: motionTok.stagger.delayChildren,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: motionTok.reveal.ySoft },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTok.duration.enterFast,
      ease: motionTok.ease,
    },
  },
};

export const fadeSwap: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTok.duration.enterFast,
      ease: motionTok.ease,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: motionTok.duration.exit,
      ease: motionTok.ease,
    },
  },
};

/** Directional enter/exit for StoryFork / HowItWorks steps. custom = ±1 */
export const directionalSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 28 : -28,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: motionTok.duration.enterFast,
      ease: motionTok.ease,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -28 : 28,
    opacity: 0,
    transition: {
      duration: motionTok.duration.exit,
      ease: motionTok.ease,
    },
  }),
};
