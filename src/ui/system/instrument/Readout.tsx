"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { color, font } from "../tokens";

export interface ReadoutRow {
  k: string;
  v: React.ReactNode;
  /** Plain-text value placed on the clipboard. Omit for rows that aren't copyable. */
  copy?: string;
  /** Makes the value a link (cyan: links explain). */
  href?: string;
  /** Short muted note under the value. */
  note?: string;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(value).then(() => {
          setDone(true);
          window.clearTimeout(timer.current);
          timer.current = window.setTimeout(() => setDone(false), 1400);
        });
      }}
      aria-label={done ? `${label} copied` : `Copy ${label}`}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center transition-colors hover:bg-white/[0.06] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_var(--sys-cyan)]"
      style={{ color: done ? color.cyan : color.inkFaint }}
    >
      {done ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

/**
 * Monospace key/value rows — the instrument's data display. Keys are muted
 * mono labels; values are cream, or cyan when they link somewhere.
 */
export function Readout({
  title,
  rows,
  className = "",
}: {
  title?: string;
  rows: readonly ReadoutRow[];
  className?: string;
}) {
  return (
    <div
      className={`border ${className}`}
      style={{ borderColor: color.cell, background: color.surface }}
    >
      {title ? (
        <div
          className="border-b px-4 py-2.5 text-[11px] uppercase tracking-[0.14em]"
          style={{ borderColor: color.cell, fontFamily: font.mono, color: color.inkFaint }}
        >
          {title}
        </div>
      ) : null}
      <dl>
        {rows.map((row, i) => (
          <div
            key={row.k}
            className={`grid grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1 px-4 py-3 sm:grid-cols-[minmax(8rem,12rem)_1fr_auto] sm:gap-x-4 ${i > 0 ? "border-t" : ""}`}
            style={{ borderColor: color.hairline }}
          >
            <dt
              className="col-span-2 pt-0.5 text-[12px] sm:col-span-1"
              style={{ fontFamily: font.mono, color: color.inkFaint }}
            >
              {row.k}
            </dt>
            <dd className="min-w-0">
              <div
                className="break-words text-[13px] leading-relaxed"
                style={{ fontFamily: font.mono, color: row.href ? color.cyan : color.ink }}
              >
                {row.href ? (
                  <a href={row.href} className="underline-offset-4 hover:underline">
                    {row.v}
                  </a>
                ) : (
                  row.v
                )}
              </div>
              {row.note ? (
                <p className="mt-1 text-[12px] leading-relaxed" style={{ color: color.inkMuted }}>
                  {row.note}
                </p>
              ) : null}
            </dd>
            {row.copy ? (
              <CopyButton value={row.copy} label={row.k} />
            ) : (
              <span aria-hidden />
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
