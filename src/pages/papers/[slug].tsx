import React from "react";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import Metatags from "~/components/site/metatags";
import JsonLd from "~/components/site/JsonLd";
import { articleJsonLd } from "~/lib/seo";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import { Page, Kicker, Footer } from "~/ui/system/kit";
import PaperArticle from "~/ui/whitepaper/PaperArticle";
import { paperBySlug, PAPERS, SUB_PAPERS } from "~/lib/papers";
import { readPaperBody } from "~/lib/papers.server";

interface Props {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SUB_PAPERS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug);
  const meta = paperBySlug(slug);
  if (!meta || slug === "introducing-andamio") return { notFound: true };
  return {
    props: { slug, title: meta.title, summary: meta.summary, body: readPaperBody(slug) },
  };
};

export default function WhitepaperPage({ slug, title, summary, body }: Props) {
  return (
    <>
      <Metatags title={title} description={summary} ogType="article" />
      <JsonLd id="article" data={articleJsonLd({ title, description: summary, path: `/papers/${slug}` })} />

      <Page nav={{ items: nav.items, cta: nav.cta }}>
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
          <Link
            href="/papers"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:text-foreground"
            style={{ color: color.inkFaint }}
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
          backHref="/papers"
          backLabel="← All papers"
          caption={title}
        />
      </Page>
    </>
  );
}
