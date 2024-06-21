// import { Metadata } from "next";
import { getBlogPageContent } from "../../lib/blogposts";
import Markdoc from "@markdoc/markdoc";
import { parseBlogMarkdocFrontmatter } from "../../utils/markdown";
import { TransformedPageContent } from "../../utils/transformedPageContent";
import Link from "next/link";

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
    <div className="flex flex-col w-full md:w-5/6 lg:w-2/5 mx-auto my-24">
      <div className="">
        <p className="text-sm font-bold text-info">
          <Link href="/">ANDAMIO BLOG</Link>
        </p>
        <h1 className="">{data?.title}</h1>
        <p className="text-sm">
          {data?.date}: by {data?.author}
        </p>
      </div>
      <div className="pt-10">
        <div>{<TransformedPageContent content={content} />}</div>
      </div>
    </div>
  );
}
