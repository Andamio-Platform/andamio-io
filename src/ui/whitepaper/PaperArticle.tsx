import React from "react";
import ReactMarkdown from "react-markdown";

/* Renders a synced Andamio Paper (markdown) as long-form prose. Uses the
 * Tailwind typography plugin (`prose`); dark-themed to match the site. */
export default function PaperArticle({ body }: { body: string }) {
  return (
    <article
      className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground sm:prose-lg"
    >
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  );
}
