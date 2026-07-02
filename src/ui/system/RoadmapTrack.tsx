import React from "react";
import { type Epic, type Roadmap } from "~/roadmap";
import { color, font } from "./tokens";

/**
 * A product release timeline, styled to the Warm Index design system.
 * Light, ink-on-paper, Inter + JetBrains Mono. Status is carried by the node
 * dot (orange = in progress / the brand "active" signal, used sparingly; ink =
 * shipped; outline = planned/proposed); badges stay mono + neutral.
 */

function sortByDate(a: Epic, b: Epic): number {
  const ay = parseInt(a.years[0] ?? "0") || 0;
  const by = parseInt(b.years[0] ?? "0") || 0;
  if (ay !== by) return ay - by;
  return (a.quarter ?? 5) - (b.quarter ?? 5);
}

function yearLabel(epic: Epic): string {
  if (epic.years.length > 1) {
    const nums = epic.years.map(Number);
    return `${Math.min(...nums)}–${Math.max(...nums)}`;
  }
  return epic.years[0] ?? "";
}

interface NodeStyle {
  dot: React.CSSProperties;
  label: string;
}
const statusMeta: Record<Epic["status"], NodeStyle> = {
  complete: { dot: { background: color.ink, borderColor: color.ink }, label: "Shipped" },
  inProgress: { dot: { background: color.orange, borderColor: color.orange }, label: "In progress" },
  planned: { dot: { background: color.paper, borderColor: color.inkFaint }, label: "Planned" },
  proposed: { dot: { background: color.paper, borderColor: color.cell }, label: "Proposed" },
};

function Badge({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 border px-2 py-0.5 text-[11px] font-semibold tracking-[-0.01em]"
      style={{ borderColor: color.cell, color: color.inkFaint }}
    >
      {accent && (
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
      )}
      {children}
    </span>
  );
}

export default function RoadmapTrack({ product }: { product: Roadmap }) {
  const releases = [...product.epics].sort(sortByDate);

  return (
    <section className="scroll-mt-28">
      <div className="mb-8 border-b pb-5" style={{ borderColor: color.rule }}>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {product.category}
        </h2>
        {product.tagline && (
          <p className="mt-1.5 text-base" style={{ color: color.inkMuted }}>
            {product.tagline}
          </p>
        )}
      </div>

      <ol className="relative">
        {releases.map((epic, i) => {
          const isLast = i === releases.length - 1;
          const isLaunch = i === 0;
          const meta = statusMeta[epic.status];
          const quarter = epic.quarter ? `Q${epic.quarter}` : "TBD";
          const showBadge =
            epic.status === "inProgress" ||
            epic.status === "planned" ||
            epic.status === "proposed";

          return (
            <li key={i} className="relative flex gap-4 sm:gap-6">
              {/* Date column */}
              <div className="w-16 shrink-0 pt-0.5 text-right sm:w-20" style={{ fontFamily: font.mono }}>
                <div className="text-sm font-semibold tabular-nums">{yearLabel(epic)}</div>
                <div className="text-xs tabular-nums" style={{ color: color.inkGhost }}>
                  {quarter}
                </div>
              </div>

              {/* Rail + node */}
              <div className="relative flex w-4 shrink-0 justify-center">
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-2 h-full w-px -translate-x-1/2"
                    style={{ background: color.cell }}
                  />
                )}
                <span
                  className="relative z-10 mt-[3px] h-3.5 w-3.5 shrink-0 rounded-full border-2"
                  style={meta.dot}
                />
              </div>

              {/* Content */}
              <div className={`flex-1 ${isLast ? "pb-2" : "pb-9"}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold tracking-[-0.02em]">{epic.name}</h3>
                  {isLaunch && (
                    <span
                      className="inline-flex items-center border px-2 py-0.5 text-[11px] font-semibold tracking-[-0.01em]"
                      style={{ background: color.ink, borderColor: color.ink, color: color.onInk }}
                    >
                      Launch
                    </span>
                  )}
                  {showBadge && (
                    <Badge accent={epic.status === "inProgress" ? color.orange : undefined}>
                      {meta.label}
                    </Badge>
                  )}
                </div>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed" style={{ color: color.inkMuted }}>
                  {epic.description}
                </p>
                {epic.link && (
                  <a
                    href={epic.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium transition-colors hover:underline"
                    style={{ color: color.blue, fontFamily: font.mono }}
                  >
                    {epic.link.label} →
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
