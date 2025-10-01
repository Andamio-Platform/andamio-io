// import { Metadata } from "next";
import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import { getCustomerPageContent } from "~/lib/customers";
import { parseBlogMarkdocFrontmatter } from "~/utils/markdown";
import { TransformedPageContent } from "~/utils/transformedPageContent";

export type Props = {
  customerId: string;
};

function getFrontmatter(customerId: string) {
  const content = getCustomerPageContent(customerId);
  const pageAST = Markdoc.parse(content);
  const frontmatter = parseBlogMarkdocFrontmatter(pageAST);
  
  return frontmatter;
}

export default function Page({ params }: { params: Props }) {
  const content = getCustomerPageContent(params.customerId);
  const data = getFrontmatter(params.customerId);

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      {/* Header */}
      <div className="relative mb-16">
        {/* Angular accent lines */}
        <div className="absolute -top-8 left-0 h-1 w-32 bg-gradient-to-r from-blue-500 to-transparent shadow-lg shadow-blue-500/50"></div>
        <div className="absolute -top-4 left-8 h-1 w-16 bg-gradient-to-r from-white/60 to-transparent"></div>
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/customers"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Customers
          </Link>
        </div>

        {/* Post Meta */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4 text-sm text-gray-400">
            {Array.isArray(data?.tags) && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag: string) => (
                  <span key={tag} className="inline-block rounded bg-blue-500/10 px-2 py-1 text-xs text-blue-300 border border-blue-500/20 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white lg:text-6xl">
                {data?.title}
            </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="relative">
        {/* Content with styled prose */}
        <div className="prose prose-lg prose-invert max-w-none">
          <TransformedPageContent content={content} />
        </div>
      </article>

      {/* Footer Navigation */}
      <div className="mt-16 border-t border-white/20 pt-8">
        <div className="flex items-center justify-between">
          <Link
            href="/customers"
            className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white/40 hover:bg-gray-700/50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All Posts
          </Link>

          <div className="text-sm text-gray-400">Share this post</div>
        </div>
      </div>
    </div>
  );
}
