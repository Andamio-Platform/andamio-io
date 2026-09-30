"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { fadeSwap, directionalSlide } from "./variants";
import { useMotionGate } from "./useMotionGate";

export function FadeSwap({
  swapKey,
  className,
  style,
  children,
  direction,
}: {
  /** Unique key for the active panel / chapter. */
  swapKey: string | number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  /** When set, use directional slide (±1). */
  direction?: number;
}) {
  const reduce = useMotionGate();

  if (reduce) {
    return (
      <div key={swapKey} className={className} style={style}>
        {children}
      </div>
    );
  }

  if (direction != null) {
    return (
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={swapKey}
          custom={direction}
          variants={directionalSlide}
          initial="enter"
          animate="center"
          exit="exit"
          className={className}
          style={style}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={swapKey}
        variants={fadeSwap}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
