import Image from "next/image";
import { type BlogPost, getBlogPostData } from "~/lib/blogposts";
import { color, containerCls, font, layout } from "~/ui/system/tokens";
import { Kicker } from "~/ui/system/kit";
import { ProofCard } from "~/ui/system/instrument";

function byDateDesc(a: BlogPost, b: BlogPost): number {
  const byDate = (b.frontmatter.date ?? "").localeCompare(
    a.frontmatter.date ?? "",
  );
  return byDate || b.title.localeCompare(a.title);
}

export default async function BlogPage() {
  const blogPosts = await getBlogPostData();
  const sortedBlogPosts = blogPosts
    .filter((post) => !post.frontmatter.redirectTo)
    .sort(byDateDesc);

  return (
    <div className={containerCls} style={{ maxWidth: layout.maxWidth }}>
      <header className="pb-12 pt-16 sm:pt-24">
        <Kicker>The Andamio Journal</Kicker>
        <h1 className="mt-4 text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Blog
        </h1>
        <p
          className="mt-5 max-w-2xl text-lg leading-relaxed"
          style={{ color: color.ink }}
        >
          Notes from building credential infrastructure on Cardano: protocol,
          partners, and the work in between.
        </p>
      </header>

      {sortedBlogPosts.length > 0 ? (
        <div className="grid gap-4 py-14 sm:grid-cols-2 sm:py-16">
          {sortedBlogPosts.map((blogPost) => (
            <ProofCard
              key={blogPost.title}
              href={`/blog/${blogPost.title}`}
              bodyClassName="p-0"
              footer={
                <span className="flex items-center justify-between gap-4">
                  <span>
                    {blogPost.frontmatter.author
                      ? `by ${blogPost.frontmatter.author}`
                      : "Andamio"}
                  </span>
                  <span style={{ color: color.cyan }}>Read →</span>
                </span>
              }
            >
              {blogPost.frontmatter.image ? (
                <div
                  className="relative aspect-video overflow-hidden border-b"
                  style={{ borderColor: color.cell }}
                >
                  <Image
                    src={blogPost.frontmatter.image}
                    height={400}
                    width={800}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <p
                  className="text-[11px] uppercase tabular-nums tracking-[0.16em]"
                  style={{ fontFamily: font.mono, color: color.ink }}
                >
                  {blogPost.frontmatter.date ?? "Undated"}
                </p>
                <h2
                  className="mt-3 text-xl font-semibold leading-tight tracking-[-0.02em]"
                  style={{ color: color.ink }}
                >
                  {blogPost.frontmatter.title || blogPost.title}
                </h2>
              </div>
            </ProofCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <h2 className="text-xl font-semibold">No posts yet</h2>
          <p className="mt-2" style={{ color: color.inkMuted }}>
            Check back soon for notes from the Andamio team.
          </p>
        </div>
      )}
    </div>
  );
}
