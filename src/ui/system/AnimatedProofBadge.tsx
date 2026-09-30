"use client";

/**
 * AnimatedProofBadge — presentation wrapper around the Proof Rings generator.
 * Dual-layer paint for ring spin without text flicker; all face fields focusable;
 * copy overlays for COURSE_ID / SLT_HASH / DID → full values to clipboard.
 */

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useTheme } from "next-themes";
import {
  buildBadgeSvg,
  PALETTES,
  withInterior,
} from "~/ui/landing/V2Landing/badge";
import { GETTING_STARTED } from "./BadgeBuilder";
import { CREDENTIAL_BADGE_SRC } from "~/ui/explore/content";
import { color, motion as motionTok } from "./tokens";
import { useMotionGate } from "./motion";

/** All inspectable regions on the evolved Proof Ring face. */
export type RingFocus =
  | "outer"
  | "inner"
  | "brand"
  | "course"
  | "module"
  | "earner"
  | "did"
  | "issued"
  | "network"
  | "skills"
  | "courseId"
  | "sltHash"
  | "qr"
  | "core"
  | null;

type BadgeLayers = {
  rings: string;
  /** Present when motion is enabled — static core overlay (no ring transforms). */
  labels: string | null;
};

const FOCUS_CLASS: Record<Exclude<RingFocus, null>, string> = {
  outer: "is-focus-outer",
  inner: "is-focus-inner",
  brand: "is-focus-brand",
  course: "is-focus-course",
  module: "is-focus-module",
  earner: "is-focus-earner",
  did: "is-focus-did",
  issued: "is-focus-issued",
  network: "is-focus-network",
  skills: "is-focus-skills",
  courseId: "is-focus-course-id",
  sltHash: "is-focus-slt-hash",
  qr: "is-focus-qr",
  core: "is-focus-core",
};

type HitZone = {
  id: Exclude<RingFocus, null>;
  label: string;
  style: React.CSSProperties;
};

/** Approximate hit targets mapped from the concept-40 face (1024 viewBox). */
const FIELD_HITS: HitZone[] = [
  {
    id: "brand",
    label: "Inspect brand",
    style: { left: "30%", top: "20%", width: "40%", height: "5%" },
  },
  {
    id: "course",
    label: "Inspect course",
    style: { left: "22%", top: "26%", width: "56%", height: "7%" },
  },
  {
    id: "module",
    label: "Inspect module",
    style: { left: "22%", top: "34%", width: "56%", height: "6%" },
  },
  {
    id: "earner",
    label: "Inspect earner",
    style: { left: "24%", top: "41%", width: "52%", height: "6%" },
  },
  {
    id: "did",
    label: "Inspect DID",
    style: { left: "18%", top: "48%", width: "30%", height: "6%" },
  },
  {
    id: "issued",
    label: "Inspect issued date",
    style: { left: "52%", top: "48%", width: "30%", height: "6%" },
  },
  {
    id: "network",
    label: "Inspect network",
    style: { left: "30%", top: "55%", width: "40%", height: "4%" },
  },
  {
    id: "skills",
    label: "Inspect skills",
    style: { left: "16%", top: "60%", width: "68%", height: "7%" },
  },
  {
    id: "courseId",
    label: "Inspect course ID",
    style: { left: "12%", top: "70%", width: "26%", height: "7%" },
  },
  {
    id: "qr",
    label: "Inspect verify QR",
    style: { left: "40%", top: "68%", width: "20%", height: "14%" },
  },
  {
    id: "sltHash",
    label: "Inspect SLT hash",
    style: { left: "62%", top: "70%", width: "26%", height: "7%" },
  },
];

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function AnimatedProofBadge({
  focus = null,
  className = "",
  style,
  alt = "An Andamio credential badge. Rings encode course identity and learning targets.",
  interactive = true,
  onFocusZone,
  /** Force light interior; default follows theme (dark page → canonical dark field). */
  forceLightInterior,
  /** Extra Motion “alive” drift on the whole specimen (in addition to CSS ring-wheel). */
  alive = true,
}: {
  focus?: RingFocus;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  interactive?: boolean;
  onFocusZone?: (zone: RingFocus) => void;
  forceLightInterior?: boolean;
  alive?: boolean;
}) {
  const reduce = useMotionGate();
  const { resolvedTheme } = useTheme();
  const reactId = useId().replace(/:/g, "");
  const [layers, setLayers] = useState<BadgeLayers | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useInView(hostRef, { amount: 0.35 });
  const [pageHidden, setPageHidden] = useState(false);

  const useLight = forceLightInterior ?? resolvedTheme === "light";
  const preferStatic = reduce === true;
  const runAlive = alive && !preferStatic && inView && !pageHidden;
  const params = GETTING_STARTED.params;

  useEffect(() => {
    const sync = () => {
      setPageHidden(
        document.visibilityState === "hidden" ||
          document.documentElement.classList.contains("is-page-hidden"),
      );
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      if (cancelled) return;
      const base = PALETTES[GETTING_STARTED.paletteIndex]!;
      const palette = useLight ? withInterior(base, "light") : base;
      const rings = buildBadgeSvg(params, palette, {
        idSuffix: `apb${reactId}r`,
        layout: "hero",
      });
      const labels = preferStatic
        ? null
        : buildBadgeSvg(params, palette, {
            idSuffix: `apb${reactId}l`,
            layout: "hero",
          });
      setLayers({ rings, labels });
      setHydrated(true);
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number },
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      }
    ).requestIdleCallback;

    if (typeof ric === "function") {
      idleId = ric(run, { timeout: 1200 });
    } else {
      timeoutId = setTimeout(run, 80);
    }

    return () => {
      cancelled = true;
      if (idleId != null) {
        (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, [reactId, useLight, preferStatic, params]);

  const toggle = useCallback(
    (zone: Exclude<RingFocus, null>) => {
      onFocusZone?.(focus === zone ? null : zone);
    },
    [focus, onFocusZone],
  );

  const onCopy = useCallback(
    async (key: string, value: string, zone: Exclude<RingFocus, null>) => {
      onFocusZone?.(zone);
      const ok = await copyText(value);
      if (ok) {
        setCopied(key);
        window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
      }
    },
    [onFocusZone],
  );

  const focusClass = focus ? (FOCUS_CLASS[focus] ?? "") : "";
  const motionClass = preferStatic ? "is-reduced" : "is-animated";
  const hostClass =
    "badge-svg-host h-auto w-full [&_svg]:h-auto [&_svg]:w-full";

  return (
    <div
      ref={hostRef}
      className={`animated-proof-badge relative ${motionClass} ${focusClass} ${className}`}
      style={style}
    >
      {!hydrated && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={CREDENTIAL_BADGE_SRC}
          alt={alt}
          width={1024}
          height={1024}
          className="h-auto w-full drop-shadow-[0_12px_40px_rgb(0_0_0_/_0.35)]"
        />
      )}
      {hydrated && layers && (
        <motion.div
          className="badge-svg-stack relative"
          animate={
            runAlive
              ? {
                  rotate: motionTok.alive.rotate,
                  scale: motionTok.alive.scale,
                }
              : { rotate: 0, scale: 1 }
          }
          transition={
            runAlive
              ? {
                  duration: motionTok.alive.duration,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
              : { duration: 0.3 }
          }
        >
          <div
            className={`${hostClass} badge-svg-rings drop-shadow-[0_12px_40px_rgb(0_0_0_/_0.35)]`}
            role={layers.labels ? undefined : "img"}
            aria-label={layers.labels ? undefined : alt}
            aria-hidden={layers.labels ? true : undefined}
            dangerouslySetInnerHTML={{ __html: layers.rings }}
          />
          {layers.labels && (
            <div
              className={`${hostClass} badge-svg-labels pointer-events-none absolute inset-0`}
              role="img"
              aria-label={alt}
              dangerouslySetInnerHTML={{ __html: layers.labels }}
            />
          )}
        </motion.div>
      )}

      {interactive && hydrated && (
        <>
          {/* Ring annulus hits */}
          <button
            type="button"
            className="absolute inset-[2%] z-[1] rounded-full bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
            style={{
              outlineColor: color.orange,
              clipPath: "circle(50% at 50% 50%)",
              WebkitClipPath: "circle(50% at 50% 50%)",
              // Hollow ring: outer disk minus inner disk via mask
              maskImage:
                "radial-gradient(circle, transparent 78%, black 79%, black 98%, transparent 99%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 78%, black 79%, black 98%, transparent 99%)",
            }}
            aria-label="Inspect outer ring — course identity"
            onClick={() => toggle("outer")}
            onFocus={() => onFocusZone?.("outer")}
          />
          <button
            type="button"
            className="absolute inset-[7%] z-[1] rounded-full bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
            style={{
              outlineColor: color.orange,
              maskImage:
                "radial-gradient(circle, transparent 72%, black 73%, black 96%, transparent 97%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 72%, black 73%, black 96%, transparent 97%)",
            }}
            aria-label="Inspect inner ring — learning targets"
            onClick={() => toggle("inner")}
            onFocus={() => onFocusZone?.("inner")}
          />

          {FIELD_HITS.map((z) => (
            <button
              key={z.id}
              type="button"
              className="absolute z-[2] bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
              style={{ ...z.style, outlineColor: color.orange }}
              aria-label={z.label}
              onClick={() => toggle(z.id)}
              onFocus={() => onFocusZone?.(z.id)}
            />
          ))}

          {/* Copy overlays — full hex / full DID to clipboard */}
          <button
            type="button"
            className="absolute z-[3] flex items-center justify-center rounded-sm bg-transparent text-[0] focus-visible:outline focus-visible:outline-2"
            style={{
              left: "18%",
              top: "74%",
              width: "10%",
              height: "5%",
              outlineColor: color.orange,
            }}
            aria-label={
              copied === "courseId"
                ? "Course ID copied"
                : "Copy full course ID hex"
            }
            onClick={(e) => {
              e.stopPropagation();
              void onCopy("courseId", params.courseId, "courseId");
            }}
          >
            {copied === "courseId" ? "✓" : "⎘"}
          </button>
          <button
            type="button"
            className="absolute z-[3] flex items-center justify-center rounded-sm bg-transparent text-[0] focus-visible:outline focus-visible:outline-2"
            style={{
              left: "72%",
              top: "74%",
              width: "10%",
              height: "5%",
              outlineColor: color.orange,
            }}
            aria-label={
              copied === "sltHash"
                ? "SLT hash copied"
                : "Copy full SLT hash hex"
            }
            onClick={(e) => {
              e.stopPropagation();
              void onCopy("sltHash", params.sltHash, "sltHash");
            }}
          >
            {copied === "sltHash" ? "✓" : "⎘"}
          </button>
          <button
            type="button"
            className="absolute z-[3] flex items-center justify-center rounded-sm bg-transparent text-[0] focus-visible:outline focus-visible:outline-2"
            style={{
              left: "42%",
              top: "50%",
              width: "8%",
              height: "4%",
              outlineColor: color.orange,
            }}
            aria-label={copied === "did" ? "DID copied" : "Copy full DID"}
            onClick={(e) => {
              e.stopPropagation();
              void onCopy("did", params.did ?? "", "did");
            }}
          >
            {copied === "did" ? "✓" : "⎘"}
          </button>
        </>
      )}
    </div>
  );
}
