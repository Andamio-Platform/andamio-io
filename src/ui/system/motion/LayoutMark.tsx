"use client";

import React from "react";
import { motion } from "motion/react";
import { motion as motionTok } from "../tokens";
import { useMotionGate } from "./useMotionGate";

/**
 * Shared-layout active indicator (cds-motion-framer TabsWithIndicator).
 * Only mount when the parent control is active.
 */
export function LayoutMark({
  layoutId,
  className,
  style,
}: {
  layoutId: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useMotionGate();

  if (reduce) {
    return <span className={className} style={style} aria-hidden />;
  }

  return (
    <motion.span
      layoutId={layoutId}
      className={className}
      style={style}
      transition={motionTok.spring.layout}
      aria-hidden
    />
  );
}
