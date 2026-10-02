import Markdoc from "@markdoc/markdoc";
import type { Metadata } from "next";
import {
  getBlogPageContent,
  getBlogPostData,
  type BlogPost,
} from "~/lib/blogposts";
import { extractExcerpt, parseBlogMarkdocFrontmatter } from "~/utils/markdown";
import { TransformedPageContent } from "~/utils/transformedPageContent";
import SocialShareButton from "~/components/media/SocialShareButton";
import { color, font } from "~/ui/system/tokens";
import { PageTrail } from "~/ui/system/kit";
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

function byDateDesc(a: BlogPost, b: BlogPost): number {
  const byDate = (b.frontmatter.date ?? "").localeCompare(
    a.frontmatter.date ?? "",
  );
  return byDate || b.title.localeCompare(a.title);
}

export default async function Page({ params }: { params: Props }) {
  const content = getBlogPageContent(params.blogPostId);
  const data = getFrontmatter(params.blogPostId);
  const posts = (await getBlogPostData())
    .filter((post) => !post.frontmatter.redirectTo)
    .sort(byDateDesc);
  const index = posts.findIndex((post) => post.title === params.blogPostId);
  const following = index >= 0 ? posts[index + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data?.title,
    datePublished: data?.date,
    author: data?.author ? { "@type": "Person", name: data.author } : undefined,
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
      <PageTrail
        back={{ href: "/blog", label: "← Back to Blog" }}
        next={
          following
            ? {
                href: `/blog/${following.title}`,
                label: `${following.frontmatter.title || following.title} →`,
              }
            : undefined
        }
      />

      {/* Meta + title */}
      <header
        className="mt-8 border-b pb-8"
        style={{ borderColor: color.rule }}
      >
        <div
          className="flex items-center gap-4 text-[12px] font-medium tracking-[-0.01em]"
          style={{ color: color.ink }}
        >
          {data?.date && <span className="tabular-nums">{data.date}</span>}
          {data?.author && <span>by {data.author}</span>}
        </div>
        <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.0] tracking-[-0.03em]">
          {data?.title}
        </h1>
      </header>

      {/* Article */}
      <article
        className="longform prose mt-10 max-w-none sm:prose-lg prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-a:font-medium prose-a:text-[var(--sys-cyan)] prose-a:no-underline hover:prose-a:underline"
        style={{ fontFamily: font.sans }}
      >
        <TransformedPageContent content={content} />
      </article>

      {/* Footer nav */}
      <div
        className="mt-16 flex justify-end border-t pt-8"
        style={{ borderColor: color.rule }}
      >
        <div style={{ color: color.inkMuted }}>
          <SocialShareButton />
        </div>
      </div>
    </div>
  );
}
