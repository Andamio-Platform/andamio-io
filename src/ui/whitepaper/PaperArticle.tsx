import React from "react";
import ReactMarkdown from "react-markdown";

/* Renders a synced Andamio Paper (markdown) as long-form prose, styled to the
 * Warm Index design system: light, Inter, ink on paper, blue links. Uses the
 * Tailwind typography plugin (`prose`). */
export default function PaperArticle({ body }: { body: string }) {
  return (
    <article
      className="prose max-w-none prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-headings:text-[#0A0A0A] prose-h1:text-4xl prose-h1:leading-[1.0] prose-a:font-medium prose-a:text-[var(--sys-cyan)] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0A0A0A] prose-code:text-[#0A0A0A] sm:prose-lg"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  );
}
