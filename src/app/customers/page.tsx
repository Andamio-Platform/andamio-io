import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import Markdoc from "@markdoc/markdoc";
import { parseBlogMarkdocFrontmatter } from "~/utils/markdown";
import { color, containerCls, layout } from "~/ui/system/tokens";
import { Kicker } from "~/ui/system/kit";

type CustomerFrontmatter = {
  title?: string;
  [key: string]: any;
};

type Customer = {
  id: string;
  frontmatter: CustomerFrontmatter;
};

/* Andamio Customers index — Warm Index design system (light, Inter, ink on
 * paper, blue accents). Server component; reads src/customers/*.md via fs +
 * Markdoc, styled with system tokens. */
export default function CustomersPage() {
  const customersDir = path.join(process.cwd(), "src", "customers");
  const files = fs.readdirSync(customersDir).filter((f) => f.endsWith(".md"));
  const customers: Customer[] = files.map((file) => {
    const id = file.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(customersDir, file), "utf-8");
    const pageAST = Markdoc.parse(content);
    const frontmatter = parseBlogMarkdocFrontmatter(pageAST) || {};
    return { id, frontmatter };
  });

  return (
    <div className={containerCls} style={{ maxWidth: layout.maxWidth }}>
      {/* Header */}
      <header className="pb-12 pt-16 sm:pt-24">
        <Kicker>The Andamio Community</Kicker>
        <h1 className="mt-4 text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Customers
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: color.inkMuted }}>
          Celebrating the global community of people building local states on Andamio. Teams
          of all sizes — tech teams, collaborative teams, educational teams, institutions, and
          more.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: color.inkMuted }}>
          Discover their stories and how they are impacting lives in their distributed way of
          work.
        </p>
      </header>

      {/* Customers Grid */}
      {customers.length > 0 ? (
        <div className="grid gap-6 py-14 sm:py-16 lg:grid-cols-2">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div style={{ color: color.inkMuted }}>Loading customers...</div>
              </div>
            }
          >
            {customers.map((customer) => (
              <Link
                key={customer.id}
                href={`/customers/${customer.id}`}
                className="group flex flex-col transition-colors"
                style={{ border: `1px solid ${color.cell}` }}
              >
                {customer.frontmatter.image && (
                  <div
                    className="relative aspect-video overflow-hidden border-b"
                    style={{ borderColor: color.cell }}
                  >
                    <Image
                      src={customer.frontmatter.image}
                      height={400}
                      width={800}
                      alt={customer.frontmatter.title || customer.id}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* Customer Logo at top right */}
                    {customer.frontmatter.logo && (
                      <div className="absolute right-2 top-2 z-10">
                        <Image
                          src={customer.frontmatter.logo}
                          alt={customer.frontmatter.title || customer.id + " logo"}
                          width={72}
                          height={72}
                          className="rounded object-contain p-1 shadow-md"
                          style={{ background: color.paper }}
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-medium tracking-[-0.01em]"
                      style={{ color: color.blue }}
                    >
                      Customer
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.02em] lg:text-2xl">
                    {customer.frontmatter.title || customer.id}
                  </h2>
                  {/* Tags */}
                  {customer.frontmatter.tags && Array.isArray(customer.frontmatter.tags) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {customer.frontmatter.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-[11px] font-medium tracking-[-0.01em]"
                          style={{
                            color: color.inkMuted,
                            border: `1px solid ${color.cell}`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span />
                    <span
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[-0.01em] opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: color.blue }}
                    >
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <h3 className="text-xl font-semibold">No customers yet</h3>
          <p className="mt-2" style={{ color: color.inkMuted }}>
            Check back soon for new customer stories.
          </p>
        </div>
      )}
    </div>
  );
}
