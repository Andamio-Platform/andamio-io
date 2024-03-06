// import { Metadata } from "next";
import { getBlogPageContent } from "../../../lib/blogposts";
import Markdoc from "@markdoc/markdoc";
import { parseBlogMarkdocFrontmatter } from "../../../utils/markdown";
import styles from "./Blog.module.css";
import Head from "next/head";
import { TransformedPageContent } from "../../../utils/transformedPageContent";

export type Props = {
  blogPostId: string;
};

function getFrontmatter(blogPostId: string) {
  const content = getBlogPageContent(blogPostId);
  const pageAST = Markdoc.parse(content);
  const frontmatter = parseBlogMarkdocFrontmatter(pageAST);

  return frontmatter;
}

// async function generateMetadata({ params }: { params: Props }): Promise<Metadata> {
//   const frontmatter = getFrontmatter(params);

//   if (frontmatter) {
//     return {
//       title: frontmatter.title,
//     };
//   } else {
//     return {
//       title: "A Blog Post",
//     };
//   }
// }

export default function Page({ params }: { params: Props }) {
  const content = getBlogPageContent(params.blogPostId);
  const data = getFrontmatter(params.blogPostId);

  const imageUrl = "/andamio.png";

  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="description" content={data?.title} />
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content="Andamio Blog" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={`https://andamio.io/blog/${params.blogPostId}`} />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@AndamioPlatform" />
        <meta name="twitter:title" content={data?.title} />
        <meta name="twitter:description" content="Andamio Blog" />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div className="bg-primary text-primary-content p-5 m-5 shadow-lg grid grid-cols-3">
        <div className="p-5">
          <p className="text-sm font-bold text-info pb-3">ANDAMIO BLOG</p>
          <h1 className="text-4xl leading-[3.5rem] font-bold">{data?.title}</h1>
          <h3 className="uppercase text-sm py-3">published: {data?.date}</h3>
          <p className="uppercase text-sm py-3">by {data?.author}</p>
        </div>
        <div className="col-span-2 p-5">
          <div className={styles.blogPostContainer}>{<TransformedPageContent content={content} />}</div>
        </div>
      </div>
    </>
  );
}
