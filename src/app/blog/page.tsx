import Link from "next/link";
import Image from "next/image";
import { type BlogPost, getBlogPostData } from "~/lib/blogposts";
import { color, font, containerCls, layout } from "~/ui/system/tokens";

/* Andamio Blog index — Warm Index design system (light, Inter, ink on paper,
 * blue accents). Server component; styled with system tokens (no client
 * components needed here). */
export default async function BlogPage() {
  const blogPosts = await getBlogPostData();
  const sortedBlogPosts = blogPosts.sort((a: BlogPost, b: BlogPost) =>
    b.title.localeCompare(a.title),
  );

  return (
    <div className={containerCls} style={{ maxWidth: layout.maxWidth }}>
      {/* Header */}
      <header className="pb-12 pt-16 sm:pt-24">
        <p
          className="text-[11px] uppercase tracking-[0.18em]"
          style={{ fontFamily: font.mono, color: color.inkMuted }}
        >
          The Andamio Journal
        </p>
        <h1
          className="mt-4 text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
        >
          Blog
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: color.inkMuted }}>
          Insights, updates, and stories from the Andamio ecosystem — building trust
          infrastructure for distributed work.
        </p>
      </header>

      {/* Posts */}
      {sortedBlogPosts.length > 0 ? (
        <div className="grid gap-6 py-14 sm:py-16 lg:grid-cols-2">
          {sortedBlogPosts.map((blogPost: BlogPost) => (
            <Link
              key={blogPost.title}
              href={`/blog/${blogPost.title}`}
              className="group flex flex-col transition-colors"
              style={{ border: `1px solid ${color.cell}` }}
            >
              {blogPost.frontmatter.image && (
                <div className="relative aspect-video overflow-hidden border-b" style={{ borderColor: color.cell }}>
                  <Image
                    src={blogPost.frontmatter.image}
                    height={400}
                    width={800}
                    alt={blogPost.frontmatter.title || blogPost.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3" style={{ fontFamily: font.mono }}>
                  <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: color.blue }}>
                    Post
                  </span>
                  {blogPost.frontmatter.date && (
                    <span className="text-[10px] uppercase tracking-[0.14em] tabular-nums" style={{ color: color.inkGhost }}>
                      {blogPost.frontmatter.date}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.02em] lg:text-2xl">
                  {blogPost.frontmatter.title || blogPost.title}
                </h2>
                <div className="mt-auto flex items-center justify-between pt-6">
                  {blogPost.frontmatter.author ? (
                    <span className="text-sm" style={{ color: color.inkMuted }}>
                      by {blogPost.frontmatter.author}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ fontFamily: font.mono, color: color.blue }}
                  >
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <h3 className="text-xl font-semibold">No posts yet</h3>
          <p className="mt-2" style={{ color: color.inkMuted }}>
            Check back soon for insights from the Andamio team.
          </p>
        </div>
      )}
    </div>
  );
}
