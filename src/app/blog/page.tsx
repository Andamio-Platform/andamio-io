import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { type BlogPost, getBlogPostData } from "~/lib/blogposts";
import { Card } from "~/components/ui/card";

export default async function BlogPage() {
  const blogPosts = await getBlogPostData();

  const sortedBlogPosts = blogPosts.sort((a: BlogPost, b: BlogPost) => b.title.localeCompare(a.title));

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      {/* Header */}
      <div className="relative mb-16">
        {/* Angular accent lines */}
        <div className="absolute -top-8 left-0 h-1 w-32 bg-gradient-to-r from-primary to-transparent shadow-md shadow-primary/20"></div>
        <div className="absolute -top-4 left-8 h-1 w-16 bg-gradient-to-r from-muted-foreground/40 to-transparent"></div>

        <div className="mb-6 flex items-center gap-4">
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent"></div>
          <h1 className="text-4xl font-bold text-foreground lg:text-6xl">
            Andamio Blog
          </h1>
        </div>
        <p className="max-w-3xl text-xl text-muted-foreground">
          Insights, updates, and stories from the Andamio ecosystem. Explore our journey building trust protocols for distributed work.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading posts...</div>
          </div>
        }>
          {sortedBlogPosts &&
            sortedBlogPosts.map((blogPost: BlogPost) => (
              <Card key={blogPost.title} className="group relative overflow-hidden border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                <Link href={`/blog/${blogPost.title}`} className="block">
                  {/* Featured Image */}
                  {blogPost.frontmatter.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={blogPost.frontmatter.image}
                        height={400}
                        width={800}
                        alt={blogPost.frontmatter.title || blogPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Category/Type Badge */}
                    <div className="mb-3">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/30">
                        Blog Post
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-4 text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary lg:text-2xl">
                      {blogPost.frontmatter.title || blogPost.title}
                    </h2>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        {blogPost.frontmatter.date && (
                          <span className="font-mono">
                            {blogPost.frontmatter.date}
                          </span>
                        )}
                        {blogPost.frontmatter.author && (
                          <span>
                            by {blogPost.frontmatter.author}
                          </span>
                        )}
                      </div>

                      {/* Read More Arrow */}
                      <div className="flex items-center gap-2 text-primary transition-colors duration-200 group-hover:text-primary/80">
                        <span className="text-xs font-medium">Read More</span>
                        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
        </Suspense>
      </div>

      {/* Empty State */}
      {sortedBlogPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-6xl opacity-20">📝</div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">No posts yet</h3>
          <p className="text-muted-foreground">Check back soon for insights from the Andamio team.</p>
        </div>
      )}
    </div>
  );
}