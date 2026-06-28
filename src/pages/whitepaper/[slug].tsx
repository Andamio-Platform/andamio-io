import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Kicker, Footer, type RailItem } from "~/ui/system/kit";
import PaperArticle from "~/ui/whitepaper/PaperArticle";
import { paperBySlug, PAPERS, SUB_PAPERS } from "~/lib/papers";
import { readPaperBody } from "~/lib/papers.server";

interface Props {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

const paperRail: RailItem[] = PAPERS.map((p) => ({
  id: p.slug,
  label: p.title.replace(/^Andamio\s+/, ""),
  href: p.slug === "light-paper" ? "/whitepaper" : `/whitepaper/${p.slug}`,
}));

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SUB_PAPERS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug);
  const meta = paperBySlug(slug);
  if (!meta || slug === "light-paper") return { notFound: true };
  return {
    props: { slug, title: meta.title, summary: meta.summary, body: readPaperBody(slug) },
  };
};

export default function WhitepaperPage({ slug, title, summary, body }: Props) {
  return (
    <>
      <Head>
        <title>{`${title} — Andamio Papers`}</title>
        <meta name="description" content={summary} />
      </Head>

      <Page nav={{ items: nav.items, cta: nav.cta }} sections={paperRail} activeId={slug}>
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
          <Link
            href="/whitepaper"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-black"
            style={{ fontFamily: font.mono, color: color.inkFaint }}
          >
            ← All papers
          </Link>
          <div className="mt-6">
            <Kicker>Andamio Papers</Kicker>
          </div>
          <div className="mt-8">
            <PaperArticle body={body} />
          </div>
        </main>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/whitepaper"
          backLabel="← All papers"
          caption={title}
        />
      </Page>
    </>
  );
}
