import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Metatags from "~/components/site/metatags";
import JsonLd from "~/components/site/JsonLd";
import { articleJsonLd } from "~/lib/seo";
import { nav, footer as footerData } from "~/ui/explore/content";
import { Page, Kicker, Footer, PageTrail } from "~/ui/system/kit";
import PaperArticle from "~/ui/whitepaper/PaperArticle";
import { paperBySlug, PAPERS } from "~/lib/papers";
import { readPaperBody } from "~/lib/papers.server";

interface Props {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: PAPERS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug);
  const meta = paperBySlug(slug);
  if (!meta) return { notFound: true };
  return {
    props: {
      slug,
      title: meta.title,
      summary: meta.summary,
      body: readPaperBody(slug),
    },
  };
};

export default function WhitepaperPage({ slug, title, summary, body }: Props) {
  const index = PAPERS.findIndex((paper) => paper.slug === slug);
  const following = index >= 0 ? PAPERS[index + 1] : undefined;
  return (
    <>
      <Metatags title={title} description={summary} ogType="article" />
      <JsonLd
        id="article"
        data={articleJsonLd({
          title,
          description: summary,
          path: `/papers/${slug}`,
        })}
      />

      <Page nav={{ items: nav.items }}>
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
          <PageTrail
            back={{ href: "/papers", label: "← All papers" }}
            next={
              following
                ? {
                    href: `/papers/${following.slug}`,
                    label: `${following.title} →`,
                  }
                : undefined
            }
          />
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
