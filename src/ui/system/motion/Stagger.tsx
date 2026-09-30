"use client";

import React from "react";
import { motion } from "motion/react";
import { motion as motionTok } from "../tokens";
import { staggerContainer, staggerItem } from "./variants";
import { useMotionGate } from "./useMotionGate";

export function Stagger({
  className,
  style,
  children,
  as: As = "div",
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useMotionGate();
  const Comp = As === "ul" ? motion.ul : As === "ol" ? motion.ol : motion.div;

  if (reduce) {
    return React.createElement(As, { className, style }, children);
  }

  return (
    <Comp
      className={className}
      style={style}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={motionTok.reveal.viewport}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  className,
  style,
  children,
  as: As = "div",
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  as?: "div" | "li";
}) {
  const reduce = useMotionGate();
  const Comp = As === "li" ? motion.li : motion.div;

  if (reduce) {
    return React.createElement(As, { className, style }, children);
  }

  return (
    <Comp className={className} style={style} variants={staggerItem}>
      {children}
    </Comp>
  );
}
