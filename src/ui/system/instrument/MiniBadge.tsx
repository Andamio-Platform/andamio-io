"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { ProofRingBadge } from "../proof-badge";
import {
  DEFAULT_CREDENTIAL,
  type ProofCredential,
  type ProofTheme,
} from "../proof-badge/credential";
import { useNearViewport } from "../useNearViewport";
import { color } from "../tokens";

/**
 * A small live Proof Ring badge for grids and cards. It uses the same
 * continuous motion as the homepage hero (rings, particles, tick scan, and
 * the one-time intro). It is inert, so its copy buttons and QR stay out of
 * the tab order. It mounts only near the viewport; CSS pauses motion
 * off-screen and under prefers-reduced-motion.
 */
export function MiniBadge({
  brand,
  course,
  module,
  mark,
  theme,
  size = 160,
  label,
  className = "",
}: {
  brand?: string;
  course?: string;
  module?: string;
  /** Program logo drawn top-center on the open plate. */
  mark?: string;
  theme?: ProofTheme;
  size?: number;
  /** Accessible description, e.g. "Sample credential: Intersect Governance". */
  label?: string;
  className?: string;
}) {
  const credential = useMemo<ProofCredential>(
    () => ({
      ...DEFAULT_CREDENTIAL,
      brand: brand ?? DEFAULT_CREDENTIAL.brand,
      course: course ?? DEFAULT_CREDENTIAL.course,
      module: module ?? DEFAULT_CREDENTIAL.module,
      mark,
      holderIsSample: true,
      theme: { ...DEFAULT_CREDENTIAL.theme, ...theme },
    }),
    [brand, course, module, mark, theme],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(rootRef, "300px");
  useEffect(() => {
    innerRef.current?.setAttribute("inert", "");
  }, [near]);
  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={label ?? `Sample credential: ${credential.course}`}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, maxWidth: "100%" }}
    >
      {near ? (
        <div ref={innerRef} aria-hidden>
          <ProofRingBadge credential={credential} animated intro />
        </div>
      ) : (
        <div
          aria-hidden
          className="aspect-square w-full rounded-full border"
          style={{ borderColor: color.cell }}
        />
      )}
    </div>
  );
}
