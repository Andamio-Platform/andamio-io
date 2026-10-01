"use client";

import { nav, footer as footerData, hero } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import {
  Page,
  Section,
  Kicker,
  Display,
  Button,
  Footer,
} from "~/ui/system/kit";
import { MiniBadge, Readout } from "~/ui/system/instrument";
import { InstrumentSpecimens } from "~/ui/system/instrument/Specimens";

const LOGOS = [
  {
    name: "Wordmark, for dark backgrounds",
    src: "/logo-with-typography-dark.svg",
    note: "Use this on the site and on navy or black.",
  },
  {
    name: "Wordmark, for light backgrounds",
    src: "/logo-with-typography.svg",
    note: "Use this on white or paper.",
  },
  {
    name: "Stacked wordmark",
    src: "/logo-with-typography-stacked-dark.svg",
    note: "Square placements, dark backgrounds.",
  },
] as const;

const SWATCHES = [
  { name: "paper", value: "#0b121b", role: "Page background" },
  { name: "surface", value: "#122131", role: "Cards and readouts" },
  { name: "ink", value: "#efe9dd", role: "Text" },
  { name: "orange", value: "#ff6b35", role: "One primary action per view" },
  { name: "cyan", value: "#3fd9e8", role: "Links, data, focus" },
] as const;

export default function BrandPress() {
  return (
    <Page nav={{ items: nav.items, cta: nav.cta }}>
      <Section bordered={false}>
        <div className="pb-12 pt-16 sm:pt-24">
          <Kicker>Brand and press</Kicker>
          <Display as="h1" size="lg" className="mt-5">
            Marks, color, and the credential
          </Display>
          <p
            className="mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            The public kit. The site is dark. Orange is the one action on a
            view. Cyan explains. The credential badge is the product, not a
            decoration.
          </p>
        </div>
      </Section>

      <Section id="logos">
        <div className="py-16 sm:py-20">
          <Kicker>Logos</Kicker>
          <Display as="h2" size="md" className="mt-5">
            Download the marks
          </Display>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="border p-6"
                style={{ borderColor: color.cell, background: color.surface }}
              >
                <div className="flex h-28 items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-auto max-h-16 w-auto max-w-[220px]"
                  />
                </div>
                <p
                  className="mt-4 text-[15px] font-semibold"
                  style={{ color: color.ink }}
                >
                  {logo.name}
                </p>
                <p
                  className="mt-1 text-[13px] leading-relaxed"
                  style={{ color: color.inkMuted }}
                >
                  {logo.note}
                </p>
                <a
                  href={logo.src}
                  download
                  className="mt-4 inline-block text-[14px] underline-offset-4 hover:underline"
                  style={{ color: color.cyan }}
                >
                  Download SVG →
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="color">
        <div className="py-16 sm:py-20">
          <Kicker>Color</Kicker>
          <Display as="h2" size="md" className="mt-5">
            The dark palette
          </Display>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((swatch) => (
              <div
                key={swatch.name}
                className="border"
                style={{ borderColor: color.cell }}
              >
                <div
                  className="h-16 border-b"
                  style={{ background: swatch.value, borderColor: color.cell }}
                />
                <div className="p-3">
                  <p className="text-[13px] font-semibold">{swatch.name}</p>
                  <p
                    className="text-[11px] tabular-nums"
                    style={{ fontFamily: font.mono, color: color.inkFaint }}
                  >
                    {swatch.value}
                  </p>
                  <p
                    className="mt-1 text-[12px]"
                    style={{ color: color.inkMuted }}
                  >
                    {swatch.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="badge">
        <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[auto_1fr] lg:items-center">
          <MiniBadge size={220} label={hero.badgeAlt} />
          <div>
            <Kicker>Credential</Kicker>
            <Display as="h2" size="md" className="mt-5">
              Badge anatomy
            </Display>
            <p
              className="mt-4 max-w-xl text-[16px] leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              {hero.badgeCaption}
            </p>
            <div className="mt-6 max-w-xl">
              <Readout
                rows={[
                  { k: "outer ring", v: "Course ID, one bar per bit" },
                  { k: "inner ring", v: "SLT hash of the learning target" },
                  { k: "standard", v: "Open Badges 3.0, anchored on Cardano" },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section id="kit">
        <div className="py-16 sm:py-20">
          <Kicker>System</Kicker>
          <Display as="h2" size="md" className="mt-5">
            The instrument kit
          </Display>
          <p
            className="mt-4 max-w-2xl text-[16px] leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            The parts the site is built from. Ticks count, arcs trace a cycle,
            and a card frames evidence.
          </p>
          <div className="mt-12">
            <InstrumentSpecimens />
          </div>
          <div className="mt-12">
            <Button variant="outline" href="/">
              See it on the homepage →
            </Button>
          </div>
        </div>
      </Section>

      <Footer
        tagline={footerData.tagline}
        meta={footerData.meta}
        copyright={footerData.copyright}
        columns={footerData.columns}
        backHref="/"
        backLabel="← Back to home"
        caption="Brand and press"
      />
    </Page>
  );
}
