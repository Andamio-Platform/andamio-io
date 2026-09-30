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
 * A small, still Proof Ring badge for grids and cards (use cases, the problem
 * section). It never animates — only the hero badge moves continuously — and
 * it is inert, so its copy buttons and QR stay out of the tab order. It mounts
 * only near the viewport so off-screen badges cost nothing at load.
 */
export function MiniBadge({
  brand,
  course,
  module,
  theme,
  size = 160,
  label,
  className = "",
}: {
  brand?: string;
  course?: string;
  module?: string;
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
      holderIsSample: true,
      theme: { ...DEFAULT_CREDENTIAL.theme, ...theme },
    }),
    [brand, course, module, theme],
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
          <ProofRingBadge credential={credential} animated={false} intro={false} />
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
