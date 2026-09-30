import React from "react";
import type { GetStaticProps } from "next";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import { Page, Kicker, Display, Button, Footer } from "~/ui/system/kit";
import PaperArticle from "~/ui/whitepaper/PaperArticle";
import { ProofCard } from "~/ui/system/instrument";
import { SUB_PAPERS } from "~/lib/papers";
import { readPaperBody } from "~/lib/papers.server";

interface Props {
  body: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { body: readPaperBody("introducing-andamio") } };
};

export default function PapersHub({ body }: Props) {
  return (
    <>
      <Metatags
        title="Papers"
        description="The Andamio Papers — Introducing Andamio, the Issuer paper, Building on Andamio, and the glossary. What Andamio is and how it works."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
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
              style={{ color: color.inkMuted }}
            >
              At the core of Andamio is one idea: you decide what a credential
              means, what earns it, and who reviews it, inside the programs you
              run. These papers show how. Introducing Andamio leads; the Issuer
              paper, Building on Andamio, and the glossary go deeper, each on
              its own page.
            </p>
          </header>

          <nav
            className="mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2"
            style={{ borderColor: color.rule }}
          >
            {SUB_PAPERS.map((p, i) => (
              <ProofCard
                key={p.slug}
                href={`/papers/${p.slug}`}
                kicker={`Paper ${String(i + 2).padStart(2, "0")}`}
                title={p.title}
                footer={<span style={{ color: color.cyan }}>Read →</span>}
                bodyClassName="p-5"
              >
                {p.summary}
              </ProofCard>
            ))}
          </nav>

          <div
            className="mt-16 border-t pt-12"
            style={{ borderColor: color.rule }}
          >
            <PaperArticle body={body} />
          </div>

          <div
            className="mt-12 flex flex-wrap gap-3 border-t pt-8"
            style={{ borderColor: color.rule }}
          >
            {SUB_PAPERS.map((p) => (
              <Button key={p.slug} variant="outline" href={`/papers/${p.slug}`}>
                {p.title} →
              </Button>
            ))}
          </div>
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
