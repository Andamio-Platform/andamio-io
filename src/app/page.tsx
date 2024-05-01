import { BlogPost, getBlogPostData } from "../lib/blogposts";
import { Suspense } from "react";
import Link from "next/link";

export default async function BlogPage() {
  const blogPosts = await getBlogPostData();

  return (
    <>
      <h1 className="w-2/3 mx-auto py-10 md:py-12 text-4xl font-bold">Andamio Blog</h1>
      <div className="w-2/3 mx-auto grid md:grid-cols-2 gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          {blogPosts &&
            blogPosts.map((blogPost: BlogPost) => (
              <Link href={`${blogPost.title}`}>
                <div
                  key={blogPost.title}
                  className="card shadow-lg bg-secondary text-secondary-content p-3 border-primary-content"
                >
                  <h2 className="text-2xl font-bold py-3 mb-3 border-b border-primary">
                    {blogPost.title}: {blogPost.frontmatter.title}
                  </h2>
                  <hr className="bg-primary" />
                  <div className="flex flex-row justify-between font-mono ">
                    <p>{blogPost.frontmatter.date}</p>
                    <p>{blogPost.frontmatter.author}</p>
                  </div>
                </div>
              </Link>
            ))}
        </Suspense>
      </div>
    </>
  );
}
