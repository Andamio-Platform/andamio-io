import Markdoc from "@markdoc/markdoc";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCustomerPageContent } from "~/lib/customers";
import { parseBlogMarkdocFrontmatter } from "~/utils/markdown";
import { TransformedPageContent } from "~/utils/transformedPageContent";
import { color, font } from "~/ui/system/tokens";

export type Props = {
  customerId: string;
};

function getFrontmatter(customerId: string) {
  const content = getCustomerPageContent(customerId);
  const pageAST = Markdoc.parse(content);
  const frontmatter = parseBlogMarkdocFrontmatter(pageAST);

  return frontmatter;
}

const mono = { fontFamily: font.mono };

export default function Page({ params }: { params: Props }) {
  const content = getCustomerPageContent(params.customerId);
  const data = getFrontmatter(params.customerId);

  if (data?.redirectTo) {
    redirect(data.redirectTo);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
      {/* Breadcrumb */}
      <Link
        href="/customers"
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-black"
        style={{ ...mono, color: color.inkFaint }}
      >
        ← Back to Customers
      </Link>

      {/* Meta + title */}
      <header className="mt-8 border-b pb-8" style={{ borderColor: color.rule }}>
        {Array.isArray(data?.tags) && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-[10px] uppercase tracking-[0.12em]"
                style={{
                  ...mono,
                  color: color.inkMuted,
                  border: `1px solid ${color.cell}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
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
          href="/customers"
          className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-white"
          style={{ ...mono, border: `1px solid ${color.ink}`, color: color.ink }}
        >
          ← All Customers
        </Link>
      </div>
    </div>
  );
}
