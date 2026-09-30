import React from "react";
import { color, display, font } from "../tokens";

const R = 15;
const CIRC = 2 * Math.PI * R;

/**
 * Section heading with a progress arc: the arc fills `index / total`, so it
 * tells the reader where this section sits in the page's sequence.
 */
export function ArcHeading({
  index,
  total,
  kicker,
  title,
  as: Tag = "h2",
  size = "clamp(2rem, 4.5vw, 3.25rem)",
  id,
}: {
  index: number;
  total: number;
  kicker: string;
  title: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: string;
  id?: string;
}) {
  const fill = Math.min(Math.max(index / total, 0), 1);
  return (
    <div>
      <div className="flex items-center gap-3">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          aria-hidden
          className="shrink-0 -rotate-90"
        >
          <circle cx="18" cy="18" r={R} fill="none" stroke={color.cell} strokeWidth="1" />
          <circle
            cx="18"
            cy="18"
            r={R}
            fill="none"
            stroke={color.cyan}
            strokeWidth="1.5"
            strokeDasharray={`${CIRC * fill} ${CIRC}`}
          />
        </svg>
        <span
          className="text-[12px] tabular-nums"
          style={{ fontFamily: font.mono, color: color.inkFaint }}
        >
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="text-[13px] font-medium" style={{ color: color.inkMuted }}>
          {kicker}
        </span>
      </div>
      <Tag
        id={id}
        className="mt-5 max-w-[22ch] text-balance"
        style={{
          fontSize: size,
          fontWeight: display.weight,
          letterSpacing: display.tracking,
          lineHeight: 1.02,
          color: color.ink,
        }}
      >
        {title}
      </Tag>
    </div>
  );
}
