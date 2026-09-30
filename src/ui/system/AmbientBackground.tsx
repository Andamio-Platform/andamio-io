"use client";

/**
 * AmbientBackground — page motion background (MOT-01 / MOT-02).
 *
 * Soft scaffold lattice (trust structure) drifts slowly behind content.
 * Motion is transform + opacity only; heavily blurred so nothing reads as a
 * hard CAD line. Reduced-motion freezes to a still; tab-hidden pauses via
 * `html.is-page-hidden` in globals.css.
 */

import React from "react";
import { useReducedMotion } from "motion/react";

/** Soft scaffold beam — wide, low-contrast, meant to be blurred further in CSS. */
function Beam({
  orient,
  pos,
  thick,
  accent,
}: {
  orient: "v" | "h";
  pos: string;
  thick: string;
  accent?: "orange" | "blue" | "teal";
}) {
  const color =
    accent === "orange"
      ? "255 107 53"
      : accent === "teal"
        ? "63 169 184"
        : accent === "blue"
          ? "47 107 255"
          : "23 90 114"; // scaffold blue

  if (orient === "v") {
    return (
      <div
        style={{
          position: "absolute",
          left: pos,
          top: "-10%",
          width: thick,
          height: "120%",
          background: `linear-gradient(180deg, transparent 0%, rgb(${color} / 0.42) 18%, rgb(${color} / 0.55) 50%, rgb(${color} / 0.42) 82%, transparent 100%)`,
        }}
      />
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        top: pos,
        left: "-10%",
        height: thick,
        width: "120%",
        background: `linear-gradient(90deg, transparent 0%, rgb(${color} / 0.36) 20%, rgb(${color} / 0.48) 50%, rgb(${color} / 0.36) 80%, transparent 100%)`,
      }}
    />
  );
}

function Joint({
  x,
  y,
  tone,
}: {
  x: string;
  y: string;
  tone: "orange" | "teal" | "blue";
}) {
  const rgb =
    tone === "orange"
      ? "255 107 53"
      : tone === "teal"
        ? "63 169 184"
        : "47 107 255";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "8rem",
        height: "8rem",
        marginLeft: "-4rem",
        marginTop: "-4rem",
        borderRadius: "50%",
        background: `radial-gradient(circle, rgb(${rgb} / 0.62) 0%, rgb(${rgb} / 0.18) 42%, transparent 72%)`,
      }}
    />
  );
}

export function AmbientBackground() {
  const reduce = useReducedMotion();
  const drift = reduce ? "sys-ambient-static" : "sys-scaffold-drift";
  const driftAlt = reduce ? "sys-ambient-static" : "sys-scaffold-drift-alt";
  const breathe = reduce ? "sys-ambient-static" : "sys-ambient-breathe";

  return (
    <div
      aria-hidden
      className="sys-motion-bg pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Room tone — drift on outer, opacity breath on inner (two animations can't share one node) */}
      <div
        className={drift}
        style={{
          position: "absolute",
          inset: "-22%",
        }}
      >
        <div
          className={breathe}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 85% 65% at 38% 28%, rgb(23 90 114 / 0.26), transparent 68%)," +
              "radial-gradient(ellipse 70% 55% at 72% 78%, rgb(255 107 53 / 0.14), transparent 62%)," +
              "radial-gradient(ellipse 55% 45% at 12% 70%, rgb(63 169 184 / 0.12), transparent 60%)",
            filter: "blur(32px)",
          }}
        />
      </div>

      {/* Primary scaffold lattice — structure of trust, blurred as a whole */}
      <div
        className={`sys-scaffold-blur ${drift}`}
        style={{
          position: "absolute",
          inset: "-28%",
          opacity: 0.62,
        }}
      >
        <Beam orient="v" pos="10%" thick="5rem" />
        <Beam orient="v" pos="36%" thick="3.4rem" accent="blue" />
        <Beam orient="v" pos="58%" thick="4.2rem" />
        <Beam orient="v" pos="78%" thick="3.6rem" accent="teal" />
        <Beam orient="v" pos="92%" thick="4.8rem" />
        <Beam orient="h" pos="14%" thick="4rem" />
        <Beam orient="h" pos="42%" thick="4.6rem" accent="orange" />
        <Beam orient="h" pos="68%" thick="3.6rem" />
        <Beam orient="h" pos="88%" thick="4.2rem" accent="teal" />
        <Joint x="10%" y="14%" tone="orange" />
        <Joint x="36%" y="42%" tone="blue" />
        <Joint x="58%" y="14%" tone="teal" />
        <Joint x="78%" y="68%" tone="orange" />
        <Joint x="36%" y="88%" tone="teal" />
        <Joint x="92%" y="42%" tone="blue" />
      </div>

      {/* Secondary lattice — deeper, slower, offset (parallax-lite depth) */}
      <div
        className={`sys-scaffold-blur-deep ${driftAlt}`}
        style={{
          position: "absolute",
          inset: "-38%",
          opacity: 0.4,
          transform: "rotate(-7deg)",
        }}
      >
        <Beam orient="v" pos="20%" thick="6.5rem" />
        <Beam orient="v" pos="48%" thick="5.5rem" accent="teal" />
        <Beam orient="v" pos="72%" thick="4.5rem" />
        <Beam orient="v" pos="90%" thick="5rem" accent="blue" />
        <Beam orient="h" pos="28%" thick="5.8rem" />
        <Beam orient="h" pos="62%" thick="5rem" accent="blue" />
        <Beam orient="h" pos="84%" thick="4.8rem" accent="orange" />
        <Joint x="48%" y="28%" tone="orange" />
        <Joint x="20%" y="62%" tone="blue" />
        <Joint x="72%" y="84%" tone="teal" />
      </div>

      {/* Soft ember — opacity-only pulse so the field never feels frozen */}
      <div
        className={reduce ? "sys-ambient-static" : "sys-ambient-breathe"}
        style={{
          position: "absolute",
          inset: "-15%",
          background:
            "radial-gradient(ellipse 40% 32% at 62% 36%, rgb(255 107 53 / 0.1), transparent 70%)," +
            "radial-gradient(ellipse 36% 28% at 28% 58%, rgb(23 90 114 / 0.14), transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Content veil — keeps copy readable; theme-aware paper falloff */}
      <div
        className="sys-motion-bg-veil"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 68% 58% at 50% 40%, transparent 12%, rgb(var(--sys-paper-rgb) / 0.42) 100%)",
        }}
      />
    </div>
  );
}
