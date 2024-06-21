import { BlogPost, getBlogPostData } from "../lib/blogposts";
import { Suspense } from "react";
import Link from "next/link";
import { Card } from "../components/ui/card";
import Image from "next/image";

export default async function BlogPage() {
  const blogPosts = await getBlogPostData();

  const sortedBlogPosts = blogPosts.sort((a: BlogPost, b: BlogPost) => b.title.localeCompare(a.title));

  return (
    <>
      <h1 className="w-2/3 lg:w-1/2  mx-auto py-10 md:py-12 text-4xl font-bold">Andamio Blog</h1>
      <div className="w-2/3 lg:w-1/2 mx-auto grid grid-cols-1 gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          {sortedBlogPosts &&
            sortedBlogPosts.map((blogPost: BlogPost) => (
              <Link href={`${blogPost.title}`}>
                <Card key={blogPost.title} className="flex flex-col border-t-foreground rounded-none mb-8">
                  <h2 className="text-2xl font-bold py-3 mb-3 border-b">
                    {blogPost.title}: {blogPost.frontmatter.title}
                  </h2>
                  <div className="flex flex-row justify-between font-mono ">
                    <p>{blogPost.frontmatter.date}</p>
                    <p>{blogPost.frontmatter.author}</p>
                  </div>
                </Card>
                {blogPost.frontmatter.image && (
                  <Image src={blogPost.frontmatter.image} height={1675} width={1029} alt={blogPost.frontmatter.image} />
                )}
              </Link>
            ))}
        </Suspense>
      </div>
    </>
  );
}
