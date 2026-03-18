"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./motion-variants";

const fadeInVariants = fadeIn(30);

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
      strokeWidth="2"
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
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="text-center"
        >
          <p className="mb-6 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
            FAQ
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Common questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
        >
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-foreground transition-colors hover:text-primary"
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
        </motion.div>
      </div>
    </section>
  );
}
