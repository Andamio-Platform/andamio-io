"use client";

import { useReducedMotion } from "motion/react";

/**
 * Hard gate for nonessential motion (MOT-02 / plan 5a).
 * `true` → render static; kill loops, idle, and scroll-linked transforms.
 */
export function useMotionGate(): boolean {
  return useReducedMotion() === true;
}
