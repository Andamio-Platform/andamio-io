"use client";

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is a composable credential?",
    answer:
      "A credential that can be used as a prerequisite, input, or condition by a system that didn't issue it. A Credly badge is not composable — only Credly can decide what it unlocks. A composable credential is one where any issuer on the graph can reference any other issuer's credential as a condition of their own program, without an integration or data-sharing agreement.",
  },
  {
    question: "What is the credential graph?",
    answer:
      "The network of composable credentials across every issuer who participates. Today a learner's credentials live in as many silos as they have platforms. In the graph, they compose — a credential earned with Org A automatically unlocks paths with Org B, C, and D that reference it as a prerequisite. One graph per learner. Every issuer who joins makes the graph more valuable for every other.",
  },
  {
    question: "How is this different from Credly or Accredible?",
    answer:
      "Credly and Accredible are excellent issuance platforms. Their credentials are not composable — each one lives inside their database and unlocks things only inside their walled garden. Andamio credentials exist on an open protocol, can be referenced by any other issuer, and survive any vendor change. We interoperate with Credly and Accredible; we don't replace them on day one.",
  },
  {
    question: "Do we have to migrate off our current platform?",
    answer:
      "No. Andamio runs alongside your LMS, CRM, or certification system. Issue through the API while leaving the rest of your stack where it is. Most pilots start on a single product line or partner tier — no rip-and-replace required on day one.",
  },
  {
    question: "What does the workflow look like?",
    answer:
      "Three steps: Commit, Assess, Claim. You define what a credential means and what's required to earn it. Learners complete the work through whatever LMS or assessment platform you already use. On completion, the credential is issued on the protocol. Your users never touch crypto — your organization sponsors the transactions.",
  },
  {
    question: "How fast can we get a pilot running?",
    answer:
      "Most integrations take weeks, not quarters. The API is REST, the smart contracts are audited, and the protocol has been live since February 2026. Talk to our team and we'll scope a pilot against one of your active credentialing programs.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <polyline points="5 8 10 13 15 8" />
    </svg>
  );
}

export default function V2FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
          Questions we get asked.
        </h2>
        <p className="mt-6 mb-12 text-lg text-muted-foreground sm:text-xl">
          What composable means, what the graph is, and how this actually
          gets implemented.
        </p>

        <div className="border-t border-border">
          {faqItems.map((item, index) => (
            <div key={item.question} className="border-b border-border">
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary"
              >
                <span className="pr-4">{item.question}</span>
                <ChevronIcon open={openIndex === index} />
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
