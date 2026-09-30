import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPageContent } from "~/lib/blogposts";
import { extractExcerpt, parseBlogMarkdocFrontmatter } from "~/utils/markdown";
import { TransformedPageContent } from "~/utils/transformedPageContent";
import SocialShareButton from "~/components/media/SocialShareButton";
import { color, font } from "~/ui/system/tokens";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  absoluteUrl,
} from "~/lib/seo";

export type Props = {
  blogPostId: string;
};

function getFrontmatter(blogPostId: string) {
  const content = getBlogPageContent(blogPostId);
  const pageAST = Markdoc.parse(content);
  return parseBlogMarkdocFrontmatter(pageAST);
}

export function generateMetadata({ params }: { params: Props }): Metadata {
  const content = getBlogPageContent(params.blogPostId);
  const data = parseBlogMarkdocFrontmatter(Markdoc.parse(content));

  const title = data?.title ?? "Andamio Blog";
  const description = data?.description ?? extractExcerpt(content);
  const url = `${SITE_URL}/blog/${params.blogPostId}`;
  const image = absoluteUrl(data?.image ?? DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [image],
      publishedTime: data?.date,
      authors: data?.author ? [data.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
  };
}


export default function Page({ params }: { params: Props }) {
  const content = getBlogPageContent(params.blogPostId);
  const data = getFrontmatter(params.blogPostId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data?.title,
    datePublished: data?.date,
    author: data?.author
      ? { "@type": "Person", name: data.author }
      : undefined,
    image: absoluteUrl(data?.image ?? DEFAULT_OG_IMAGE),
    mainEntityOfPage: `${SITE_URL}/blog/${params.blogPostId}`,
  };

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:text-foreground"
        style={{ color: color.inkFaint }}
      >
        ← Back to Blog
      </Link>

      {/* Meta + title */}
      <header className="mt-8 border-b pb-8" style={{ borderColor: color.rule }}>
        <div className="flex items-center gap-4 text-[12px] font-medium tracking-[-0.01em]" style={{ color: color.inkGhost }}>
          {data?.date && <span className="tabular-nums">{data.date}</span>}
          {data?.author && <span>by {data.author}</span>}
        </div>
        <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.0] tracking-[-0.03em]">
          {data?.title}
        </h1>
      </header>

      {/* Article */}
      <article
        className="prose mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-headings:text-[#0A0A0A] prose-a:font-medium prose-a:text-[var(--sys-cyan)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0A0A0A] sm:prose-lg"
        style={{ fontFamily: font.sans }}
      >
        <TransformedPageContent content={content} />
      </article>

      {/* Footer nav */}
      <div className="mt-16 flex items-center justify-between border-t pt-8" style={{ borderColor: color.rule }}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:text-white"
          style={{ border: `1px solid ${color.ink}`, color: color.ink }}
        >
          ← All Posts
        </Link>
        <div style={{ color: color.inkMuted }}>
          <SocialShareButton />
        </div>
      </div>
    </div>
  );
}
