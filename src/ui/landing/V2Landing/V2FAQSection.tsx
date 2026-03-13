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
      "The Andamio API is for developers who want to build their own applications on top of the protocol — bring your own frontend, your own UX, your own brand. The Andamio App is a hosted, turnkey solution for organizations that want credentialing and contribution management without building anything themselves. Think Stripe API vs. Shopify.",
  },
  {
    question: "If I buy an API tier, do I get App features?",
    answer:
      "No. They are separate products. API tiers give you protocol access and API call volume. App tiers give you a hosted application with support, branding, and managed features. You can use either or both.",
  },
  {
    question: "Can I use the App without the API?",
    answer:
      "Yes. Most App customers never touch the API directly. The App calls the API on your behalf. However, if you're also building custom integrations alongside your App usage, you'd need a separate API subscription for those API calls.",
  },
  {
    question: "Why do App customers still pay commission?",
    answer:
      "Commission is a protocol-level fee on project task rewards, not an app fee. It exists regardless of how you access the protocol — through the API, through the App, or through any other frontend built on Andamio. Commission discount add-ons are purchased at the protocol level via NFT add-ons, not through subscriptions.",
  },
  {
    question: "How do commission discount add-ons work?",
    answer:
      "When you create a project, you start at a 5% base commission rate. As your project grows, you can purchase one-time NFT add-ons that permanently reduce the commission for that specific project — down to 3%, 2%, 1%, or even 0%. Each project has its own economics, so you only invest in commission reduction where it's justified.",
  },
  {
    question: "Why Cardano?",
    answer:
      "~$0.17 per credential*. Native multi-asset support. Predictable costs. At scale, that's ~$17K for 100K credentials — compared to ~$2.5M on Ethereum*. No gas fee surprises.",
  },
  {
    question: "Why not just use Credly or Accredible?",
    answer:
      "Your credentials are locked to their platform. If they shut down or change terms, your records disappear. With Andamio, your recipients own their credentials permanently on-chain. No platform lock-in. At scale, you also pay a fraction of the cost.",
  },
  {
    question: "Do users need wallets?",
    answer:
      "No. Email signup. Your organization sponsors transactions. The blockchain is invisible to your users. Transaction Sponsorship availability depends on your plan.",
  },
  {
    question: "What about privacy?",
    answer:
      "Personal data stays off-chain. Only credential proofs go on-chain — no personally identifiable information. Private by design, not bolted on.",
  },
  {
    question: "What if Andamio disappears?",
    answer:
      "Your credentials survive. They're permanent records on Cardano mainnet that anyone can verify, with or without Andamio. Open source protocol. You're never locked in.",
  },
  {
    question: "What's the cost at scale?",
    answer:
      "~$0.17 per credential on Cardano*. At 100K credentials, that's roughly $17K in protocol costs. API subscription or App subscription costs are on top of that, depending on which product you use. *Approximate; actual costs depend on transaction complexity and network conditions.",
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
          variants={fadeInVariants}
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
