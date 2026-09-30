"use client";

import React, { useId, useRef, useState } from "react";
import { color, font } from "../tokens";
import { useMotionGate } from "../motion";

export interface OrbitStep {
  id: string;
  label: string;
  detail?: React.ReactNode;
}

const W = 400;
const H = 216;
const CX = 200;
const CY = 204;
const R = 180;

function nodeAt(i: number, n: number) {
  const deg = n === 1 ? 90 : 180 - (i * 180) / (n - 1);
  const rad = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY - R * Math.sin(rad), deg };
}

/**
 * A lifecycle laid on an arc. Each node is a real step; the cyan arc fills up
 * to the selected step, and the selected node glows orange (the live state).
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
            <path
              d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
              fill="none"
              stroke={color.cell}
              strokeWidth="1"
            />
            <path
              d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
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
          </svg>

          <div role="tablist" aria-label={label} className="absolute inset-0">
            {steps.map((s, i) => {
              const p = nodeAt(i, n);
              const on = i === current;
              const done = i < current;
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
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
                  style={{
                    left: `${(p.x / W) * 100}%`,
                    top: `${(p.y / H) * 100}%`,
                  }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-[11px] tabular-nums transition-colors group-focus-visible:[box-shadow:0_0_0_2px_var(--sys-paper),0_0_0_3.5px_var(--sys-cyan)]"
                    style={{
                      fontFamily: font.mono,
                      borderColor: on
                        ? color.orange
                        : done
                          ? color.cyan
                          : color.cell,
                      background: on ? color.orange : color.paper,
                      color: on
                        ? color.onInk
                        : done
                          ? color.cyan
                          : color.inkMuted,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
          {step.detail ? (
            <div
              className="mt-2 text-[14px] leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              {step.detail}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
