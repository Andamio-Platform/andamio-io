import React from "react";
import { color, font } from "../tokens";

/**
 * A hairline with one tick per counted thing (steps, items, years). The tick
 * count must mean something; `active` marks the current one in cyan.
 */
export function TickRule({
  count,
  active,
  label,
  className = "",
}: {
  count: number;
  active?: number;
  label?: string;
  className?: string;
}) {
  const ticks = Array.from({ length: Math.max(count, 1) }, (_, i) => i);
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label ? (
        <span
          className="shrink-0 text-[11px] tabular-nums"
          style={{ fontFamily: font.mono, color: color.inkFaint }}
        >
          {label}
        </span>
      ) : null}
      <div className="relative h-3 flex-1" aria-hidden>
        <div
          className="absolute inset-x-0 top-1/2 h-px"
          style={{ background: color.cell }}
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {ticks.map((i) => {
            const on = i === active;
            return (
              <span
                key={i}
                className="block w-px"
                style={{
                  height: on ? 12 : 7,
                  background: on ? color.cyan : color.inkGhost,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
