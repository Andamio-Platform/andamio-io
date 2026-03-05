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
    question: "Why Cardano instead of Ethereum or Solana?",
    answer:
      "Your credentials cost a fraction of what they would on Ethereum (~$0.17 vs ~$25 per credential*). Cardano\u2019s architecture gives you predictable costs without the gas fee unpredictability of account-based chains.",
  },
  {
    question: "Why not just use Credly or Accredible?",
    answer:
      "With traditional platforms, your credentials are locked to that vendor \u2014 if they shut down or change terms, your records disappear. With Andamio, your recipients own their credentials permanently. At scale, you also pay a fraction of what traditional platforms charge.",
  },
  {
    question: "Do our users need crypto wallets or ADA?",
    answer:
      "No. Your organization can sponsor transaction costs so your users never touch the blockchain. They sign in with social login and receive a managed wallet automatically. Transaction Sponsorship availability depends on your plan tier.",
  },
  {
    question: "How does Andamio handle privacy?",
    answer:
      "Your users\u2019 personal data stays off-chain and under their control. Only the credential proof goes on-chain \u2014 and it contains no personally identifiable information. Private by design, not bolted on.",
  },
  {
    question: "What happens if Andamio shuts down?",
    answer:
      "Your credentials survive. They\u2019re permanent records on Cardano mainnet that anyone can verify, with or without Andamio\u2019s platform or API. You\u2019re never locked in.",
  },
  {
    question: "How long does integration take?",
    answer:
      "The API is designed to be straightforward \u2014 build a transaction, sign it, submit it. Most teams integrate in days to a couple of weeks, depending on your use case and existing infrastructure.",
  },
  {
    question: "What\u2019s the cost at scale?",
    answer:
      "On-chain costs on Cardano are approximately $0.17 per credential*. At 100K credentials, that\u2019s roughly $17K \u2014 compared to millions per year on traditional platforms. API subscription tiers give you additional cost predictability. *Approximate; actual costs depend on transaction complexity and network conditions.",
  },
  {
    question: "Is the protocol audited?",
    answer:
      "Yes. The V2 protocol was audited by TxPipe and includes 152 end-to-end tests. Smart contracts have been live on Cardano mainnet since February 6, 2026.",
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
