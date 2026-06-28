import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import { getBlogPageContent } from "~/lib/blogposts";
import { parseBlogMarkdocFrontmatter } from "~/utils/markdown";
import { TransformedPageContent } from "~/utils/transformedPageContent";
import SocialShareButton from "~/components/media/SocialShareButton";
import { color, font } from "~/ui/system/tokens";

export type Props = {
  blogPostId: string;
};

function getFrontmatter(blogPostId: string) {
  const content = getBlogPageContent(blogPostId);
  const pageAST = Markdoc.parse(content);
  return parseBlogMarkdocFrontmatter(pageAST);
}

const mono = { fontFamily: font.mono };

export default function Page({ params }: { params: Props }) {
  const content = getBlogPageContent(params.blogPostId);
  const data = getFrontmatter(params.blogPostId);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
      {/* Breadcrumb */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-black"
        style={{ ...mono, color: color.inkFaint }}
      >
        ← Back to Blog
      </Link>

      {/* Meta + title */}
      <header className="mt-8 border-b pb-8" style={{ borderColor: color.rule }}>
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkGhost }}>
          {data?.date && <span className="tabular-nums">{data.date}</span>}
          {data?.author && <span>by {data.author}</span>}
        </div>
        <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.0] tracking-[-0.03em]">
          {data?.title}
        </h1>
      </header>

      {/* Article */}
      <article
        className="prose mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-headings:text-[#0A0A0A] prose-a:font-medium prose-a:text-[#2F6BFF] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0A0A0A] sm:prose-lg"
        style={{ fontFamily: font.sans }}
      >
        <TransformedPageContent content={content} />
      </article>

      {/* Footer nav */}
      <div className="mt-16 flex items-center justify-between border-t pt-8" style={{ borderColor: color.rule }}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-white"
          style={{ ...mono, border: `1px solid ${color.ink}`, color: color.ink }}
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
