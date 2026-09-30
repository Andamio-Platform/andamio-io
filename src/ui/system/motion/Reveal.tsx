"use client";

import React from "react";
import { motion } from "motion/react";
import { motion as motionTok } from "../tokens";
import { fadeUp, fadeUpSoft } from "./variants";
import { useMotionGate } from "./useMotionGate";

type RevealTag =
  | "div"
  | "section"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "span"
  | "figure";

const MOTION_MAP = {
  div: motion.div,
  section: motion.section,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  figure: motion.figure,
} as const;

export function Reveal({
  as = "div",
  soft = false,
  className,
  style,
  children,
  delay = 0,
}: {
  as?: RevealTag;
  soft?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useMotionGate();
  const Comp = MOTION_MAP[as];
  const variants = soft ? fadeUpSoft : fadeUp;

  if (reduce) {
    return React.createElement(as, { className, style }, children);
  }

  return (
    <Comp
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={motionTok.reveal.viewport}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Comp>
  );
}
