import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Kicker, Display, Footer, type RailItem } from "~/ui/system/kit";
import PaperArticle from "~/ui/whitepaper/PaperArticle";
import { PAPERS, SUB_PAPERS } from "~/lib/papers";
import { readPaperBody } from "~/lib/papers.server";

interface Props {
  body: string;
}

/** Rail = the four papers; the leader Light Paper is the active one on the hub. */
const paperRail: RailItem[] = PAPERS.map((p) => ({
  id: p.slug,
  label: p.title.replace(/^Andamio\s+/, ""),
  href: p.slug === "light-paper" ? "/whitepaper" : `/whitepaper/${p.slug}`,
}));

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { body: readPaperBody("light-paper") } };
};

export default function WhitepaperHub({ body }: Props) {
  return (
    <>
      <Head>
        <title>Andamio Papers</title>
        <meta
          name="description"
          content="The Andamio Papers — the Light Paper, the Issuer paper, Building on Andamio, and the glossary. What Andamio is and how it works."
        />
      </Head>

      <Page nav={{ items: nav.items, cta: nav.cta }} sections={paperRail} activeId="light-paper">
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
          <header>
            <Kicker>The Andamio Papers</Kicker>
            <Display as="h1" size="lg" className="mt-4">
              Read the papers
            </Display>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: color.inkMuted }}>
              The single source for what Andamio is and how it works. The Light Paper leads. The
              Issuer paper, Building on Andamio, and the glossary go deeper, each on its own page.
            </p>
          </header>

          <nav
            className="mt-12 grid gap-3 border-t pt-8 sm:grid-cols-2"
            style={{ borderColor: color.rule }}
          >
            {SUB_PAPERS.map((p) => (
              <Link
                key={p.slug}
                href={`/whitepaper/${p.slug}`}
                className="group p-5 transition-colors"
                style={{ border: `1px solid ${color.cell}` }}
              >
                <span className="text-lg font-semibold tracking-[-0.01em]">{p.title}</span>
                <span className="mt-1.5 block text-[14px] leading-relaxed" style={{ color: color.inkMuted }}>
                  {p.summary}
                </span>
                <span
                  className="mt-3 inline-block text-[11px] uppercase tracking-[0.14em] opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ fontFamily: font.mono, color: color.blue }}
                >
                  Read →
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-16 border-t pt-12" style={{ borderColor: color.rule }}>
            <PaperArticle body={body} />
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t pt-8" style={{ borderColor: color.rule }}>
            {SUB_PAPERS.map((p) => (
              <Button key={p.slug} variant="outline" href={`/whitepaper/${p.slug}`}>
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
