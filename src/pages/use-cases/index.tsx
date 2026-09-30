import React, { useState } from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";
import { CASES, SECTORS, type Sector } from "~/ui/use-cases/cases";
import { CaseCard } from "~/ui/use-cases/chrome";

const PRESENT_SECTORS = SECTORS.filter((s) =>
  CASES.some((c) => c.sector === s),
);

export default function UseCasesIndex() {
  const [sector, setSector] = useState<Sector | "All">("All");
  const shown =
    sector === "All" ? CASES : CASES.filter((c) => c.sector === sector);

  return (
    <>
      <Metatags
        title="Use cases"
        description="How FC Barcelona, Intersect, Syngenta, Toha Network and LeadGen DAO use Andamio to issue verifiable credentials and run contribution programs."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        <Section bordered={false}>
          <div className="pb-10 pt-16 sm:pt-24">
            <Kicker>Use cases</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Programs running on Andamio
            </Display>
            <p
              className="mt-5 max-w-3xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Each case shows the challenge, the credential cycle, and outcomes
              labeled honestly as results, targets or public facts.
            </p>
          </div>
        </Section>

        <Section>
          <div className="py-12 sm:py-16">
            <div
              role="group"
              aria-label="Filter by sector"
              className="flex flex-wrap gap-2"
              style={{ fontFamily: font.mono }}
            >
              {(["All", ...PRESENT_SECTORS] as const).map((s) => {
                const on = s === sector;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSector(s)}
                    className="border px-3 py-1.5 text-[12px] transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_var(--sys-cyan)]"
                    style={{
                      borderColor: on ? color.cyan : color.rule,
                      color: on ? color.cyan : color.inkMuted,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((c) => (
                <CaseCard key={c.slug} study={c} />
              ))}
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
          caption="Use cases"
        />
      </Page>
    </>
  );
}
