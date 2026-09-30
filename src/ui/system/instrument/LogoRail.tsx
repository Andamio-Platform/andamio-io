import React from "react";
import { color, font } from "../tokens";

export interface RailLogo {
  name: string;
  /** Omit to render the name as a wordmark (no logo file on hand). */
  src?: string;
  /** The use case this partner proves; every logo links to one. */
  href: string;
  /** Short mono caption under the mark, e.g. "Governance". */
  caption: string;
  height?: number;
}

/**
 * Partner marks, each linking to the use case it proves. Marks sit in cream
 * monochrome and take their own colors on hover or focus.
 */
export function LogoRail({
  logos,
  label = "Proof in production",
}: {
  logos: readonly RailLogo[];
  label?: string;
}) {
  return (
    <nav aria-label={label}>
      <ul
        className="grid grid-cols-2 border-l border-t sm:grid-cols-3 lg:grid-cols-5"
        style={{ borderColor: color.cell }}
      >
        {logos.map((l) => (
          <li key={l.name} className="border-b border-r" style={{ borderColor: color.cell }}>
            <a
              href={l.href}
              className="group flex h-full flex-col items-center justify-between gap-4 px-4 py-6 transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_var(--sys-cyan)]"
            >
              <span className="flex h-14 items-center justify-center">
                {l.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={l.src}
                    alt={l.name}
                    loading="lazy"
                    width={l.height ?? 48}
                    height={l.height ?? 48}
                    className="object-contain opacity-80 transition-[filter,opacity] duration-200 [filter:grayscale(1)] group-hover:opacity-100 group-hover:[filter:none] group-focus-visible:opacity-100 group-focus-visible:[filter:none]"
                  />
                ) : (
                  <span
                    className="whitespace-nowrap text-[16px] font-semibold tracking-[-0.02em] transition-colors group-hover:[color:var(--sys-ink)]"
                    style={{ color: color.inkMuted }}
                  >
                    {l.name}
                  </span>
                )}
              </span>
              <span
                className="text-[11px] transition-colors group-hover:[color:var(--sys-cyan)]"
                style={{ fontFamily: font.mono, color: color.inkFaint }}
              >
                {l.caption} →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
