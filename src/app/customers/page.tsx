import { Suspense } from "react";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import Image from "next/image";
import fs from "fs";
import path from "path";
import Markdoc from "@markdoc/markdoc";
import { parseBlogMarkdocFrontmatter } from "~/utils/markdown";


type CustomerFrontmatter = {
  title?: string;
  [key: string]: any;
};

type Customer = {
  id: string;
  frontmatter: CustomerFrontmatter;
};

export default function CustomersPage() {
  const customersDir = path.join(process.cwd(), "src", "customers");
  const files = fs.readdirSync(customersDir).filter(f => f.endsWith(".md"));
  const customers: Customer[] = files.map(file => {
    const id = file.replace(/\.md$/, "");
    const content = fs.readFileSync(path.join(customersDir, file), "utf-8");
    const pageAST = Markdoc.parse(content);
    const frontmatter = parseBlogMarkdocFrontmatter(pageAST) || {};
    return { id, frontmatter };
  });

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
            Customers
          </h1>
        </div>
        <p className="max-w-3xl text-xl text-muted-foreground">
          Celebrating the global community of people building local states on Andamio. Teams of all sizes - tech teams, collaborative team, educational teams, institutions, and more.
        </p>
        <br />
        <p className="max-w-3xl text-xl text-muted-foreground">
          Discover their stories and how they are impacting lives in their distributed way of work.
        </p>

      </div>

      {/* Customers Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading customers...</div>
          </div>
        }>
          {customers && customers.map(customer => (
            <Card key={customer.id} className="group relative overflow-hidden border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                  <Link href={`/customers/${customer.id}`} className="block">
                    {/* Featured Image */}
                    {customer.frontmatter.image && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={customer.frontmatter.image}
                          height={400}
                          width={800}
                          alt={customer.frontmatter.title || customer.id}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Customer Logo at top right */}
                        {customer.frontmatter.logo && (
                          <div className="absolute top-2 right-2 z-10">
                            <Image
                              src={customer.frontmatter.logo}
                              alt={customer.frontmatter.title || customer.id + ' logo'}
                              width={72}
                              height={72}
                              className="rounded shadow-lg bg-card/90 p-1 object-contain"
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                      </div>
                    )}
                    {/* Content */}
                    <div className="p-6">
                      {/* Category/Type Badge */}
                      <div className="mb-3">
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/30">
                          Customer
                        </span>
                      </div>
                      {/* Title */}
                      <h2 className="mb-4 text-xl font-bold text-foreground transition-colors duration-200 group-hover:text-primary lg:text-2xl">
                        {customer.frontmatter.title || customer.id}
                      </h2>
                      {/* Meta Information: Tags */}
                      {customer.frontmatter.tags && Array.isArray(customer.frontmatter.tags) && (
                        <div className="mb-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          {customer.frontmatter.tags.map((tag: string) => (
                            <span key={tag} className="inline-block rounded bg-primary/10 px-2 py-1 text-xs text-primary border border-primary/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Meta Information (add more fields as needed) */}
                      {/* Read More Arrow */}
                      <div className="flex items-center gap-2 text-primary transition-colors duration-200 group-hover:text-primary/80">
                        <span className="text-xs font-medium">Read More</span>
                        <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
            </Card>
          ))}
        </Suspense>
      </div>

      {/* Empty State */}
      {customers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-6xl opacity-20">👥</div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">No customers yet</h3>
          <p className="text-muted-foreground">Check back soon for new customer stories.</p>
        </div>
      )}
    </div>
  );
}
