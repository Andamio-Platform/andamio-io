import React from "react";
import ReactMarkdown from "react-markdown";

/* Renders a synced Andamio Paper (markdown) as long-form prose on the dark
 * page. `longform` retints Tailwind typography from near-black to cream
 * (see globals.css). */
export default function PaperArticle({ body }: { body: string }) {
  return (
    <article
      className="longform prose max-w-none sm:prose-lg prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-h1:text-4xl prose-h1:leading-[1.0] prose-a:font-medium prose-a:text-[var(--sys-cyan)] prose-a:no-underline hover:prose-a:underline"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  );
}
