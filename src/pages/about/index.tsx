import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";
import { fadeIn as fadeInFactory, staggerContainer } from "~/ui/landing/V2Landing/motion-variants";
import { EXTERNAL_LINKS } from "~/lib/external-links";

/* ─── Animation variants ─── */

const fadeIn = fadeInFactory();
const containerVariants = staggerContainer(0.08);
const cardVariants = fadeInFactory();

/* ─── Data ─── */

const teamMembers = [
  {
    name: "Yoram Ben Zvi",
    title: "Business Models Lead",
    summary:
      "With 20+ years in tech strategy and partnerships, Yoram integrates impact-focused models, supporting sustainability in agriculture and Cardano ecosystems.",
    image: "/images/team/yoram.jpeg",
  },
  {
    name: "James Dunseith",
    title: "Teacher, Developer and Facilitator",
    summary:
      "With experience in project-based learning and mastery-based grading, James contributes resilient, reusable components and deep learning design expertise.",
    image: "/images/team/james.webp",
  },
  {
    name: "Adrian Hüetter",
    title: "Smart Contract Developer",
    summary:
      "A former civil engineer and Plutus pioneer, Adrian specializes in smart contracts and promotes open-source community growth.",
    image: "/images/team/adrian.webp",
  },
  {
    name: "HongJing (Jingles) K",
    title: "Innovative Solutions Developer",
    summary:
      "Specializing in NLP and machine learning, Jingles brings 10+ years in software development, focusing on analytics and user-centered solutions.",
    image: "/images/team/jingles.webp",
  },
  {
    name: "Nelson Kshetrimayum",
    title: "Full-Stack Developer",
    summary:
      "A Physics graduate turned Cardano developer, Nelson is passionate about open-source software and innovative educational structures.",
    image: "/images/team/nelson.webp",
  },
  {
    name: "Roberto Mayen",
    title: "Product Manager",
    summary:
      "With 10 years in global project management, Roberto drives product strategy and impactful solutions for Andamio.",
    image: "/images/team/rmh.webp",
  },
  {
    name: "M. Ali Modiri",
    title: "Smart Contract Developer",
    summary:
      "A malware analyst and CIP 96 author, Ali's expertise spans from assembly to high-level languages, focused on Plutus smart contract development.",
    image: "/images/team/mix.webp",
  },
  {
    name: "Nori Nishigaya",
    title: "Software Development Expert",
    summary:
      "A founder and Agile leader with 30+ years in software, Nori supports decentralized governance, inclusivity, and community-led collaboration.",
    image: "/images/team/nori.jpeg",
  },
  {
    name: "Sebastian Pabon",
    title: "Ecosystem Lead",
    summary: "Educator and facilitator. Open Source advocate.",
    image: "/images/team/sebastian.png",
  },
];

interface TechCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const learningCards: TechCard[] = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Hands-On Learning",
    description: "Gain practical experience with real-world projects.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Skill-Based Approach",
    description: "Acquire targeted skills for effective contribution.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Verified Credentials",
    description: "Take your skills with you everywhere.",
  },
];

const smartContractFeatures = [
  {
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Verified Credentials",
    description: "Contributors validate skills and earn certifications.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Automatic Onboarding",
    description: "Seamlessly onboard talent using validated credentials.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Decentralized Decision-Making",
    description: "Empower contributors to shape your organization's growth.",
  },
];

/* ─── Component ─── */

export default function AboutPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <V2PageLayout
      title="About Andamio"
      description="Learn about Andamio's vision, team, and technology, and explore how we're transforming the future of collaboration and learning."
    >
      {/* ─── Mission ─── */}
      <motion.section
        className="mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground"
          variants={cardVariants}
        >
          Andamio is a{" "}
          <strong className="text-foreground">
            Trust Protocol for Distributed Work
          </strong>{" "}
          that provides infrastructure for decentralized access control,
          credential issuance, contributor onboarding, and treasury management.
          We believe in enabling local participation that opens global
          opportunity.
        </motion.p>

        <motion.div
          className="rounded-xl border border-border bg-card p-8"
          variants={cardVariants}
        >
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground">
            To create trust networks that enable purpose-driven, collaborative
            work by providing the tools and infrastructure needed for
            distributed organizations to thrive.
          </p>
        </motion.div>

        {/* Whitepaper link */}
        <motion.div className="mt-6" variants={cardVariants}>
          <a
            href={EXTERNAL_LINKS.docsWhitepaper}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Read the Andamio Whitepaper &rarr;
          </a>
        </motion.div>
      </motion.section>

      {/* ─── Team ─── */}
      <section id="team" className="mb-16 scroll-mt-24">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
            THE TEAM
          </p>
          <h2 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
            Founding Team
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              variants={cardVariants}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg className="h-24 w-24 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mb-2 text-sm font-medium text-primary">
                  {member.title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {member.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Join CTA */}
        <motion.div
          className="mt-8 flex items-center justify-between rounded-xl border border-border bg-card p-6"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <h3 className="font-bold text-foreground">Join Our Team</h3>
            <p className="text-sm text-muted-foreground">
              Interested in contributing to the future of distributed work?
            </p>
          </div>
          <a
            href="mailto:careers@andamio.io"
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:shadow-sm"
          >
            Get in Touch
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ─── Technology ─── */}
      <section id="technology" className="relative -mx-4 mb-16 scroll-mt-24 overflow-hidden rounded-xl bg-muted/30 px-4 py-12 sm:-mx-6 sm:px-6 sm:py-16 lg:-mx-8 lg:px-8">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              THE TECHNOLOGY
            </p>
            <h2 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
              How Andamio Works
            </h2>
          </motion.div>

          {/* Learning Framework */}
          <motion.div
            className="mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h3 className="mb-6 text-xl font-bold text-foreground">
              Learning Framework
            </h3>
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {learningCards.map((card) => (
                <motion.div
                  key={card.title}
                  className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  variants={cardVariants}
                >
                  <div className="mb-3 text-primary">{card.icon}</div>
                  <h4 className="mb-2 font-bold text-foreground">
                    {card.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Smart Contracts */}
          <motion.div
            className="flex flex-col gap-8 rounded-xl border border-border bg-card p-8 lg:flex-row lg:items-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="lg:w-1/2">
              <h3 className="mb-4 text-xl font-bold text-foreground">
                Smart Contracts
              </h3>
              <p className="mb-6 text-muted-foreground">
                Blockchain-based smart contracts that deliver secure, automated,
                and transparent solutions for organizations.
              </p>
              <ul className="space-y-4">
                {smartContractFeatures.map((f) => (
                  <li key={f.title} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">{f.icon}</div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {f.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center lg:w-1/2">
              <Image
                src="/andamio-smart-contracts.png"
                alt="Smart Contract Flow"
                className="w-full max-w-lg cursor-pointer rounded-lg transition-transform duration-300 hover:scale-105"
                onClick={() => setIsFullscreen(true)}
                width={1200}
                height={1200}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Image Overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        >
          <Image
            src="/andamio-smart-contracts.png"
            alt="Smart Contract Flow"
            className="max-h-screen max-w-full"
            width={1800}
            height={1800}
          />
          <button
            className="absolute right-4 top-4 rounded-md border border-white/20 bg-black/50 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            onClick={() => setIsFullscreen(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* ─── Bottom CTA ─── */}
      <motion.div
        className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-4"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link
          href={EXTERNAL_LINKS.app}
          className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get Started Free &rarr;
        </Link>
        <Link
          href={EXTERNAL_LINKS.docs}
          className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
        >
          Explore the Docs
        </Link>
      </motion.div>
    </V2PageLayout>
  );
}
