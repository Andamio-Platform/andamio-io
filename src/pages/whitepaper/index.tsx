import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";
import V2Navigation from "~/ui/landing/V2Landing/V2Navigation";
import V2CTAFooter from "~/ui/landing/V2Landing/V2CTAFooter";
import PaperArticle from "~/ui/whitepaper/PaperArticle";
import { primaryBtnClass, outlineBtnClass } from "~/ui/landing/V2Landing/_ui";
import { SUB_PAPERS } from "~/lib/papers";
import { readPaperBody } from "~/lib/papers.server";

interface Props {
  body: string;
}

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
      <div className="dark min-h-screen bg-background text-foreground">
        <V2Navigation />
        <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
          <header>
            <p className="text-sm font-semibold text-muted-foreground">The Andamio Papers</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.0] tracking-[-0.02em] text-foreground sm:text-6xl">
              Read the papers
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The single source for what Andamio is and how it works. The Light Paper leads. The
              Issuer paper, Building on Andamio, and the glossary go deeper, each on its own page.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/papers/andamio-whitepapers.pdf" className={primaryBtnClass}>
                Download the PDF
              </a>
            </div>
          </header>

          <nav className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
            {SUB_PAPERS.map((p) => (
              <Link
                key={p.slug}
                href={`/whitepaper/${p.slug}`}
                className="group rounded-lg border border-border bg-card/40 p-5 transition-colors hover:border-foreground/40"
              >
                <span className="font-display text-lg font-semibold tracking-[-0.01em] text-foreground">
                  {p.title}
                </span>
                <span className="mt-1.5 block text-[14px] leading-relaxed text-muted-foreground">
                  {p.summary}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-16 border-t border-border pt-12">
            <PaperArticle body={body} />
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
            {SUB_PAPERS.map((p) => (
              <Link key={p.slug} href={`/whitepaper/${p.slug}`} className={outlineBtnClass}>
                {p.title} →
              </Link>
            ))}
          </div>
        </main>
        <V2CTAFooter />
      </div>
    </>
  );
}
