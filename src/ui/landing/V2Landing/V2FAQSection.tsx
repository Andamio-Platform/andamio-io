"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Why Cardano?",
    answer:
      "~$0.17 per credential*. Native multi-asset support. Predictable costs. At scale, that\u2019s ~$17K for 100K credentials \u2014 compared to ~$2.5M on Ethereum*. No gas fee surprises.",
  },
  {
    question: "Why not just use Credly or Accredible?",
    answer:
      "Your credentials are locked to their platform. If they shut down or change terms, your records disappear. With Andamio, your recipients own their credentials permanently on-chain. No platform lock-in. At scale, you also pay a fraction of the cost.",
  },
  {
    question: "Do users need wallets?",
    answer:
      "No. Email signup. Your organization sponsors transactions. The blockchain is invisible to your users. Transaction Sponsorship availability depends on your plan tier.",
  },
  {
    question: "What about privacy?",
    answer:
      "Personal data stays off-chain. Only credential proofs go on-chain \u2014 no personally identifiable information. Private by design, not bolted on.",
  },
  {
    question: "What if Andamio disappears?",
    answer:
      "Your credentials survive. They\u2019re permanent records on Cardano mainnet that anyone can verify, with or without Andamio. Open source protocol. You\u2019re never locked in.",
  },
  {
    question: "How long does integration take?",
    answer:
      "Build a transaction, sign it, submit it. Most teams integrate in days to a couple of weeks, depending on your use case.",
  },
  {
    question: "What\u2019s the cost at scale?",
    answer:
      "~$0.17 per credential on Cardano*. At 100K credentials, that\u2019s roughly $17K. API subscription tiers give you additional cost predictability. *Approximate; actual costs depend on transaction complexity and network conditions.",
  },
  {
    question: "Is the protocol audited?",
    answer:
      "Yes. Audited by TxPipe. 152 end-to-end tests. Live on Cardano mainnet since February 2026.",
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
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center"
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
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
          variants={fadeIn}
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
