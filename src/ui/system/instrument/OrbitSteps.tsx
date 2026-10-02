"use client";

import React, { useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { color, font } from "../tokens";
import { useMotionGate } from "../motion";

export interface OrbitStep {
  id: string;
  label: string;
  detail?: React.ReactNode;
  /** Short lines under the step sentence. Rendered as 01, 02, 03. */
  points?: readonly string[];
}

const W = 400;
const H = 216;
const CX = 200;
const CY = 204;
const R = 180;
const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

/** Published figures and the names the steps are allowed to emphasize. */
const FIGURE_SOURCE =
  "\\d{1,3}(?:,\\d{3})+|\\d+\\+|\\d+%|\\d+\\s+million|\\d+|Te Kautuku|Kotare Station|Palmyra|NMKR|Socious";

function nodeAt(i: number, n: number) {
  const deg = n === 1 ? 90 : 180 - (i * 180) / (n - 1);
  const rad = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY - R * Math.sin(rad), deg };
}

function GlowText({ text, still }: { text: string; still: boolean }) {
  const parts = text.split(new RegExp(`(${FIGURE_SOURCE})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          still ? (
            <span key={i} style={{ fontFamily: font.mono, color: color.cyan }}>
              {part}
            </span>
          ) : (
            <motion.span
              key={i}
              style={{ fontFamily: font.mono, color: color.cyan }}
              animate={{
                textShadow: [
                  `0 0 2px ${color.cyan}`,
                  `0 0 16px ${color.cyan}`,
                  `0 0 2px ${color.cyan}`,
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {part}
            </motion.span>
          )
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

/**
 * A lifecycle laid on an arc. Each node is a real step; the cyan arc fills up
 * to the selected step, and the selected node glows orange (the live state).
 * The next node is a quiet cyan ring, and the segment between them breathes.
 * Works controlled (`active` + `onActiveChange`, e.g. synced to demo panes)
 * or uncontrolled. Keyboard: arrow keys move between steps.
 */
export function OrbitSteps({
  steps,
  active,
  onActiveChange,
  label,
  className = "",
  showDetail = true,
}: {
  steps: readonly OrbitStep[];
  active?: number;
  onActiveChange?: (index: number) => void;
  /** Accessible name for the step list, e.g. "Earner lifecycle". */
  label: string;
  className?: string;
  showDetail?: boolean;
}) {
  const [own, setOwn] = useState(0);
  const current = active ?? own;
  const still = useMotionGate();
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = steps.length;
  const progress = n === 1 ? 1 : current / (n - 1);
  const hasNext = n > 1 && current < n - 1;
  const stepLen = n > 1 ? 1 / (n - 1) : 0;

  const select = (i: number) => {
    const next = (i + n) % n;
    if (active === undefined) setOwn(next);
    onActiveChange?.(next);
    tabs.current[next]?.focus();
  };

  const step = steps[current];

  return (
    <div className={className}>
      <div className="px-5 sm:px-12">
        <div
          className="relative mx-auto w-full max-w-[560px]"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path d={ARC} fill="none" stroke={color.cell} strokeWidth="1" />
            <path
              d={ARC}
              fill="none"
              stroke={color.cyan}
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray={`${progress} 1`}
              className={
                still
                  ? ""
                  : "transition-[stroke-dasharray] duration-500 ease-out"
              }
            />
            {hasNext ? (
              <motion.path
                d={ARC}
                fill="none"
                stroke={color.cyan}
                strokeWidth="2"
                pathLength={1}
                strokeDasharray={`${stepLen} 1`}
                strokeDashoffset={-progress}
                strokeLinecap="round"
                initial={false}
                animate={
                  still
                    ? { opacity: 0.4, strokeWidth: 1.5 }
                    : {
                        opacity: [0.35, 0.9, 0.35, 0.35],
                        strokeWidth: [1.5, 2.75, 1.5, 1.5],
                      }
                }
                transition={
                  still
                    ? { duration: 0 }
                    : {
                        duration: 1.6,
                        repeat: Infinity,
                        times: [0, 0.28, 0.62, 1],
                        ease: "easeInOut",
                      }
                }
              />
            ) : null}
          </svg>

          <div role="tablist" aria-label={label} className="absolute inset-0">
            {steps.map((s, i) => {
              const p = nodeAt(i, n);
              const on = i === current;
              const done = i < current;
              const ahead = hasNext && i === current + 1;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={showDetail ? `${uid}-panel` : undefined}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                      e.preventDefault();
                      select(i + 1);
                    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                      e.preventDefault();
                      select(i - 1);
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      select(0);
                    } else if (e.key === "End") {
                      e.preventDefault();
                      select(n - 1);
                    }
                  }}
                  className="group absolute flex flex-col items-center focus:outline-none"
                  style={{
                    left: `${(p.x / W) * 100}%`,
                    top: `${(p.y / H) * 100}%`,
                    transform: "translate(-50%, -16px)",
                  }}
                >
                  <CircleMark
                    n={String(i + 1).padStart(2, "0")}
                    on={on}
                    done={done}
                    ahead={ahead}
                    still={still}
                  />
                  <span
                    className="mt-2 hidden whitespace-nowrap text-[12px] font-medium sm:block"
                    style={{ color: on ? color.ink : color.inkMuted }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showDetail && step ? (
        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${current}`}
          aria-live="polite"
          className="mx-auto mt-6 max-w-[560px] border-t pt-5 text-center"
          style={{ borderColor: color.hairline }}
        >
          <p
            className="text-[12px] tabular-nums"
            style={{ fontFamily: font.mono, color: color.inkFaint }}
          >
            Step {current + 1} of {n}
          </p>
          <p
            className="mt-1 text-[18px] font-semibold tracking-[-0.02em]"
            style={{ color: color.ink }}
          >
            {step.label}
          </p>
          <StepCopy step={step} still={still} />
        </div>
      ) : null}
    </div>
  );
}

function StepCopy({ step, still }: { step: OrbitStep; still: boolean }) {
  const body = (
    <>
      {typeof step.detail === "string" ? (
        <p
          className="text-[17px] leading-relaxed"
          style={{ color: color.inkMuted }}
        >
          <GlowText text={step.detail} still={still} />
        </p>
      ) : step.detail ? (
        <div
          className="text-[17px] leading-relaxed"
          style={{ color: color.inkMuted }}
        >
          {step.detail}
        </div>
      ) : null}
      {step.points?.length ? (
        <ol className="mx-auto mt-4 max-w-[46ch] space-y-3 text-left">
          {step.points.map((point, i) => (
            <PointRow key={point} index={i} text={point} still={still} />
          ))}
        </ol>
      ) : null}
    </>
  );

  if (still) return <div className="mt-2">{body}</div>;

  return (
    <motion.div
      key={step.id}
      className="mt-2"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {body}
    </motion.div>
  );
}

function CircleMark({
  n,
  on,
  done,
  ahead,
  still,
}: {
  n: string;
  on: boolean;
  done: boolean;
  ahead: boolean;
  still: boolean;
}) {
  const style: React.CSSProperties = {
    fontFamily: font.mono,
    borderColor: on ? color.orange : done || ahead ? color.cyan : color.cell,
    background: on ? color.orange : color.paper,
    color: on ? color.onInk : done || ahead ? color.cyan : color.inkMuted,
  };
  const className =
    "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] tabular-nums transition-colors group-focus-visible:[box-shadow:0_0_0_2px_var(--sys-paper),0_0_0_3.5px_var(--sys-cyan)]";
  if (ahead && !still) {
    return (
      <motion.span
        className={className}
        style={style}
        animate={{
          scale: [1, 1.12, 1, 1],
          boxShadow: [
            `0 0 0 0 ${color.cyan}`,
            `0 0 16px 0 ${color.cyan}`,
            `0 0 0 0 ${color.cyan}`,
            `0 0 0 0 ${color.cyan}`,
          ],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          times: [0, 0.28, 0.62, 1],
          ease: "easeInOut",
        }}
      >
        {n}
      </motion.span>
    );
  }
  return (
    <span className={className} style={style}>
      {n}
    </span>
  );
}

function PointRow({
  index,
  text,
  still,
}: {
  index: number;
  text: string;
  still: boolean;
}) {
  const row = (
    <>
      {still ? (
        <span
          className="pt-0.5 text-[12px] tabular-nums"
          style={{ fontFamily: font.mono, color: color.cyan }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : (
        <motion.span
          className="pt-0.5 text-[12px] tabular-nums"
          style={{ fontFamily: font.mono, color: color.cyan }}
          animate={{
            textShadow: [
              `0 0 2px ${color.cyan}`,
              `0 0 16px ${color.cyan}`,
              `0 0 2px ${color.cyan}`,
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      )}
      <span
        className="text-[17px] leading-relaxed"
        style={{ color: color.ink }}
      >
        <GlowText text={text} still={still} />
      </span>
    </>
  );

  if (still) {
    return <li className="grid grid-cols-[2rem_1fr] gap-3">{row}</li>;
  }

  return (
    <motion.li
      className="grid grid-cols-[2rem_1fr] gap-3"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 1.05,
        delay: 0.28 * (index + 1),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {row}
    </motion.li>
  );
}
