"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { ProofRingBadge } from "../proof-badge";
import {
  DEFAULT_CREDENTIAL,
  type ProofCredential,
  type ProofSkill,
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
  face,
  size = 160,
  fill = false,
  label,
  className = "",
}: {
  brand?: string;
  course?: string;
  module?: string;
  /** Program logo drawn top-center on the open plate. */
  mark?: string;
  theme?: ProofTheme;
  /** Program-specific face. Omits explorer links so stand-in IDs are not claimed. */
  face?: {
    earner: string;
    skills: readonly ProofSkill[];
    courseId: string;
    sltHash: string;
    issuedAt: string;
  };
  size?: number;
  /** Use the parent width, capped at `size`, so a large badge fits the screen. */
  fill?: boolean;
  /** Accessible description, e.g. "Sample credential: Intersect Governance". */
  label?: string;
  className?: string;
}) {
  const credential = useMemo<ProofCredential>(() => {
    const alias = (face?.earner ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
    return {
      ...DEFAULT_CREDENTIAL,
      brand: brand ?? DEFAULT_CREDENTIAL.brand,
      course: course ?? DEFAULT_CREDENTIAL.course,
      module: module ?? DEFAULT_CREDENTIAL.module,
      mark,
      theme: { ...DEFAULT_CREDENTIAL.theme, ...theme },
      ...(face
        ? {
            holder: {
              alias: alias || "earner",
              displayName: face.earner,
            },
            holderIsSample: false,
            skills: [...face.skills],
            courseId: face.courseId,
            sltHash: face.sltHash,
            issuedAt: face.issuedAt,
            courseUrl: undefined,
            hashUrl: undefined,
            claimUrl: undefined,
            verifyUrl: "#",
          }
        : { holderIsSample: true }),
    };
  }, [brand, course, module, mark, theme, face]);
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
      style={
        fill
          ? { width: "100%", maxWidth: size }
          : { width: size, maxWidth: "100%" }
      }
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
