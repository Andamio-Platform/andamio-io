"use client";

import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { motion as motionTok } from "../tokens";
import { useMotionGate } from "./useMotionGate";

export function usePageScrollProgress(): MotionValue<number> | null {
  const reduce = useMotionGate();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    skipInitialAnimation: true,
  });
  return reduce ? null : smooth;
}

/** Scroll-linked depth for the credential theater specimen. */
export function useTheaterParallax() {
  const reduce = useMotionGate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], motionTok.theater.y);
  const rotateRaw = useTransform(
    scrollYProgress,
    [0, 1],
    motionTok.theater.rotate,
  );
  const scaleRaw = useTransform(
    scrollYProgress,
    [0, 1],
    motionTok.theater.scale,
  );
  const y = useSpring(yRaw, {
    stiffness: 120,
    damping: 22,
    skipInitialAnimation: true,
  });
  const rotate = useSpring(rotateRaw, {
    stiffness: 120,
    damping: 22,
    skipInitialAnimation: true,
  });
  const scale = useSpring(scaleRaw, {
    stiffness: 120,
    damping: 22,
    skipInitialAnimation: true,
  });

  return {
    ref,
    style: reduce ? undefined : { y, rotate, scale },
  };
}
