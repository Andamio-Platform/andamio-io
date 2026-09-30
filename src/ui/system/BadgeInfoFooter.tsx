"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { OUTER_RING, INNER_RING, SHIFT, LEFT_WITH } from "./proof-badge/field-notes";
import { color, font } from "./tokens";

const mono = { fontFamily: font.mono };
const sans = { fontFamily: font.sans };

/* Info circle: a compact label + "i" that opens its explanation. */
function InfoChip({ label, body }: { label: string; body: string }) {
  return (
    <Popover>
      <PopoverTrigger
        className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] transition-colors hover:bg-black/[0.03] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_#2F6BFF]"
        style={{ borderColor: color.rule, color: color.ink }}
      >
        {label}
        <span
          aria-hidden
          className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border text-[9px]"
          style={{ borderColor: color.cell, color: color.inkFaint }}
        >
          i
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-72 overflow-hidden rounded-none border p-0 shadow-[0_18px_44px_-20px_rgba(0,0,0,0.45)]"
        style={{ borderColor: color.rule, background: color.paper }}
      >
        {/* Kicker header + hairline, then body — matches the section's
            editorial idiom (square card, ink rule, system type). */}
        <div
          className="border-b px-3.5 py-2"
          style={{ borderColor: color.cell }}
        >
          <span
            className="text-[11px] font-semibold tracking-[-0.01em]"
            style={{ color: color.inkFaint }}
          >
            {label}
          </span>
        </div>
        <p
          className="px-3.5 py-3 text-[13px] leading-relaxed"
          style={{ ...sans, color: color.inkMuted }}
        >
          {body}
        </p>
      </PopoverContent>
    </Popover>
  );
}

/* The card's info footer — ring-anatomy chips + the address footnote. Shared by
   the standalone builder (chrome) and the how-it-works tabs, so every card has
   the same footer. */
export function BadgeInfoFooter({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-4 py-2.5 ${className}`}
      style={{ borderColor: color.rule }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <InfoChip label="Course identity" body={OUTER_RING.body} />
        <InfoChip label="Learning targets" body={INNER_RING.body} />
        <InfoChip label="What changes" body={SHIFT.body} />
        <InfoChip label="What you keep" body={LEFT_WITH.body} />
      </div>
      <p className="text-[11px]" style={{ color: color.inkMuted }}>
        Identified by{" "}
        <span
          className="whitespace-nowrap"
          style={{ ...mono, color: color.ink }}
        >
          &lt;course_id&gt;.&lt;slt_hash&gt;
        </span>
        <span style={{ color: color.inkGhost }}> · illustrative only</span>
      </p>
    </div>
  );
}
