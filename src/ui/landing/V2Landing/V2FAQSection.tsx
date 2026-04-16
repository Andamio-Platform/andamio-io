"use client";

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What's the difference between the API and the App?",
    answer:
      "The API is for developers building their own applications — bring your own frontend, your own UX. The App is a hosted solution for organizations that want to get started without writing code. Think Stripe vs. Shopify.",
  },
  {
    question: "Do users need crypto wallets?",
    answer:
      "No. Email signup. Your organization sponsors transactions. The blockchain is invisible to your users.",
  },
  {
    question: "What if Andamio disappears?",
    answer:
      "Your credentials survive. They're permanent records on Cardano mainnet — open source, verifiable by anyone, with or without Andamio.",
  },
  {
    question: "Is the platform audited?",
    answer:
      "Yes. Smart contracts audited by TxPipe. 152 end-to-end tests. Live on Cardano mainnet since February 2026.",
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
          Questions.
        </h2>

        <div className="border-t border-border">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-border">
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
