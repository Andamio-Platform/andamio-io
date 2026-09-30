"use client";

/**
 * ClaimFence — consistent illustrative-demo labeling (CNT-02).
 * Use on any UI that looks like mint/verify but is local state only.
 */

import React from "react";
import { color, font } from "./tokens";

export function ClaimFence({
  children = "Illustrative demo — not a live mint or on-chain verify.",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      role="note"
      className={`text-[12px] leading-snug tracking-[-0.01em] ${className}`}
      style={{ color: color.inkFaint, fontFamily: font.mono }}
    >
      {children}
    </p>
  );
}
