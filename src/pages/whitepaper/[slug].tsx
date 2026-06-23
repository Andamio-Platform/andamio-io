import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import V2Navigation from "~/ui/landing/V2Landing/V2Navigation";
import V2CTAFooter from "~/ui/landing/V2Landing/V2CTAFooter";
import PaperArticle from "~/ui/whitepaper/PaperArticle";
import { paperBySlug, SUB_PAPERS } from "~/lib/papers";
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
  if (!meta || slug === "light-paper") return { notFound: true };
  return {
    props: { slug, title: meta.title, summary: meta.summary, body: readPaperBody(slug) },
  };
};

export default function WhitepaperPage({ title, summary, body }: Props) {
  return (
    <>
      <Head>
        <title>{`${title} — Andamio Papers`}</title>
        <meta name="description" content={summary} />
      </Head>
      <div className="dark min-h-screen bg-background text-foreground">
        <V2Navigation />
        <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
          <Link
            href="/whitepaper"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All papers
          </Link>
          <div className="mt-8">
            <PaperArticle body={body} />
          </div>
        </main>
        <V2CTAFooter />
      </div>
    </>
  );
}
