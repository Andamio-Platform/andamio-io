// import { Metadata } from "next";
import { getBlogPageContent } from "../../lib/blogposts";
import Markdoc from "@markdoc/markdoc";
import { parseBlogMarkdocFrontmatter } from "../../utils/markdown";
import styles from "./Blog.module.css";
import { TransformedPageContent } from "../../utils/transformedPageContent";

export type Props = {
  blogPostId: string;
};

function getFrontmatter(blogPostId: string) {
  const content = getBlogPageContent(blogPostId);
  const pageAST = Markdoc.parse(content);
  const frontmatter = parseBlogMarkdocFrontmatter(pageAST);

  return frontmatter;
}

export default function Page({ params }: { params: Props }) {
  const content = getBlogPageContent(params.blogPostId);
  const data = getFrontmatter(params.blogPostId);

  return (
    <>
      <div className="bg-primary text-primary-content p-2 md:p-5 my-3 md:m-5 shadow-lg grid grid-cols-1 md:grid-cols-3">
        <div className="p-1 md:p-5">
          <p className="text-sm font-bold text-info pb-3">ANDAMIO BLOG</p>
          <h1 className="text-xl md:text-4xl leading-[3.5rem] font-bold">{data?.title}</h1>
          <h3 className="uppercase text-sm py-3">published: {data?.date}</h3>
          <p className="uppercase text-sm py-3">by {data?.author}</p>
        </div>
        <div className="md:col-span-2 p-1 md:p-5">
          <div className={styles.blogPostContainer}>{<TransformedPageContent content={content} />}</div>
        </div>
      </div>
    </>
  );
}
