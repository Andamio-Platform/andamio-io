"use client";

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How is this different from Credly or Accredible?",
    answer:
      "Credly and Accredible store credentials in their databases. If they change pricing, get acquired, or change terms, your credentials are subject to that. Andamio credentials live on Cardano mainnet — verifiable forever, by anyone, with or without us. And we're the only protocol where a credential from Org A can gate access to Org B's program without the two orgs ever integrating.",
  },
  {
    question: "Do we have to migrate off our current platform?",
    answer:
      "No. Andamio runs alongside your LMS, CRM, or certification system. Issue through the API while leaving the rest of your stack where it is. Most pilots start on a single product line or partner tier — no rip-and-replace required on day one.",
  },
  {
    question: "What does the workflow look like?",
    answer:
      "Three steps: Commit, Assess, Claim. You define what a credential means and what's required to earn it. Learners complete the work through whatever LMS or assessment platform you already use. On completion, the credential is issued on-chain. Your users never touch crypto — your organization sponsors the transactions.",
  },
  {
    question: "How fast can we get a pilot running?",
    answer:
      "Most integrations take weeks, not quarters. The API is REST, the smart contracts are audited by TxPipe, and the protocol has been live on Cardano mainnet since February 2026. Talk to our team and we'll scope a pilot against one of your active credentialing programs.",
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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Questions buyers actually ask.
        </h2>

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
