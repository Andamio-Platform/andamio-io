"use client";

/**
 * Concept A prototype shell — isolated under /explore (robots-blocked).
 * Production homepage remains AndamioLanding via src/pages/index.tsx.
 * Structural quality fixes (landmarks, tabs, closing CTA, sitemap) ship on
 * the shared system components; this route only adds a prototype notice.
 */

import Link from "next/link";
import AndamioLanding from "~/ui/system/AndamioLanding";
import { color } from "~/ui/system/tokens";

export default function ConceptAPrototype() {
  return (
    <>
      <div
        className="sticky top-0 z-[60] border-b px-4 py-2.5 text-center text-[13px] font-semibold tracking-[-0.01em]"
        style={{
          background: color.ink,
          color: color.onInk,
          borderColor: color.rule,
        }}
      >
        <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>Concept A prototype — not production</span>
          <Link
            href="/explore/system"
            className="underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            ← Back to /explore/system
          </Link>
        </span>
      </div>
      <AndamioLanding />
    </>
  );
}
