import React from "react";
import { color, display, font, containerCls } from "../tokens";
import { Button } from "../kit";

export interface CtaQuote {
  text: string;
  name: string;
  role: string;
  href?: string;
}

/**
 * The closing band: one orange action, one quiet secondary link, and an
 * optional partner quote as the evidence next to the ask.
 */
export function CtaBand({
  title,
  body,
  primary,
  secondary,
  quote,
  id,
}: {
  title: React.ReactNode;
  body?: React.ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  quote?: CtaQuote;
  id?: string;
}) {
  return (
    <section id={id} className="relative z-10 border-t" style={{ borderColor: color.rule }}>
      <div className={`${containerCls} py-16 sm:py-24`} style={{ maxWidth: 1320 }}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <h2
              className="max-w-[18ch] text-balance"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: display.weight,
                letterSpacing: display.tracking,
                lineHeight: 1,
                color: color.ink,
              }}
            >
              {title}
            </h2>
            {body ? (
              <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed" style={{ color: color.inkMuted }}>
                {body}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button variant="primary" href={primary.href}>
                {primary.label}
              </Button>
              {secondary ? (
                <a
                  href={secondary.href}
                  className="text-[14px] font-medium underline-offset-4 hover:underline"
                  style={{ color: color.cyan }}
                >
                  {secondary.label}
                </a>
              ) : null}
            </div>
          </div>
          {quote ? (
            <figure className="border-l pl-6" style={{ borderColor: color.cyan }}>
              <blockquote className="text-[17px] leading-relaxed" style={{ color: color.ink }}>
                “{quote.text}”
              </blockquote>
              <figcaption className="mt-4 text-[12px]" style={{ fontFamily: font.mono, color: color.inkFaint }}>
                {quote.href ? (
                  <a href={quote.href} className="hover:underline" style={{ color: color.cyan }}>
                    {quote.name}
                  </a>
                ) : (
                  quote.name
                )}{" "}
                · {quote.role}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
