"use client";

import { motion } from "motion/react";
import { color } from "../tokens";
import { usePageScrollProgress } from "./scroll";
import { useMotionGate } from "./useMotionGate";

/** Thin fixed ink/orange reading progress — Warm Index, not neon. */
export function ScrollProgress() {
  const reduce = useMotionGate();
  const scaleX = usePageScrollProgress();

  if (reduce || !scaleX) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: color.orange,
      }}
    />
  );
}
