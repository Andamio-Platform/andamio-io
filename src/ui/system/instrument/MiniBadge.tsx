"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { ProofRingBadge } from "../proof-badge";
import {
  DEFAULT_CREDENTIAL,
  type ProofCredential,
  type ProofTheme,
} from "../proof-badge/credential";

/**
 * A small, still Proof Ring badge for grids and cards (use cases, the problem
 * section). It never animates — only the hero badge moves continuously — and
 * it is inert, so its copy buttons and QR stay out of the tab order.
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
  const innerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    innerRef.current?.setAttribute("inert", "");
  }, []);
  return (
    <div
      role="img"
      aria-label={label ?? `Sample credential: ${credential.course}`}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, maxWidth: "100%" }}
    >
      <div ref={innerRef} aria-hidden>
        <ProofRingBadge credential={credential} animated={false} intro={false} />
      </div>
    </div>
  );
}
