import React from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import { Page, Kicker, Display, Footer } from "~/ui/system/kit";
import { ProofCard } from "~/ui/system/instrument";
import { PAPERS } from "~/lib/papers";

export default function PapersHub() {
  return (
    <>
      <Metatags
        title="Papers"
        description="The Andamio Papers — Introducing Andamio, the Issuer paper, Building on Andamio, and the glossary. What Andamio is and how it works."
      />

      <Page nav={{ items: nav.items }}>
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
          <header>
            <Kicker>The Andamio Papers</Kicker>
            {/* The resources introduction shares its headline with hero button 3's
                payoff (story-flows storyboard, 2026-07-02): the exploring path and
                the browsing path arrive at the same idea. */}
            <Display as="h1" size="lg" className="mt-4">
              Write your own rules
            </Display>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: color.ink }}
            >
              At the core of Andamio is one idea: you decide what a credential
              means, what earns it, and who reviews it, inside the programs you
              run. These papers show how. Introducing Andamio, the Issuer paper,
              Building on Andamio, and the glossary each have their own page.
            </p>
          </header>

          <nav
            className="mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2"
            style={{ borderColor: color.rule }}
          >
            {PAPERS.map((p, i) => (
              <ProofCard
                key={p.slug}
                href={`/papers/${p.slug}`}
                kicker={`Paper ${String(i + 1).padStart(2, "0")}`}
                title={p.title}
                bodyColor={color.ink}
                footer={<span style={{ color: color.cyan }}>Read →</span>}
                bodyClassName="p-5"
              >
                {p.summary}
              </ProofCard>
            ))}
          </nav>
        </main>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Andamio Papers"
        />
      </Page>
    </>
  );
}
