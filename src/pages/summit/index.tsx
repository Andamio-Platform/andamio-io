import Image from "next/image";
import React, { useEffect } from "react";
import MailchimpForm from "./mailchimp";
import styles from "../../styles/AndamioComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faSyncAlt,
  faFileSignature,
  faUserTie,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

const AndamioComponent = () => {
  useEffect(() => {
    const countdownElement = document.getElementById("countdown");
    const targetDate = new Date("2024-11-15T00:00:00").getTime();

    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (countdownElement) {
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      if (timeLeft < 0) {
        clearInterval(countdownTimer);
        if (countdownElement) {
          countdownElement.innerHTML = "Voting has closed!";
        }
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* Header Section */}
      <header className="w-full">
        <Image
          src="/andamio-summit-coverv5.png"
          alt="andamio banner"
          className="h-auto w-full"
          width={6176}
          height={800}
        />
      </header>

      {/* Main Section */}
      <main className="container mx-auto flex-grow px-4 py-12 md:px-0">
        <div className="px-6">
          {/* Attention Grabbing Headline */}
          <h2
            className={`mb-6 text-start text-3xl font-bold ${styles.textPrimary}`}
          >
            Break Free from Outdated Systems.
          </h2>
          <h2
            className={`mb-6 text-center text-3xl font-bold ${styles.textPrimary}`}
          >
            Focus on Solving Real Problems.
          </h2>
          <h2
            className={`mb-6 text-end text-3xl font-bold ${styles.textPrimary}`}
          >
            Create Meaningful Impact.
          </h2>
        </div>

        {/* Introductory Statement */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <p className="mb-6 text-justify text-xl text-gray-700">
            Imagine a world where individuals own their skills, and
            organizations can quickly find the talent they need to solve
            real-world problems.
          </p>

          {/* Core Message */}
          <p className="mb-8 text-justify text-lg">
            At Andamio, we are breaking down outdated recruitment and education
            systems. By voting for us in{" "}
            <strong>Fund 13 of Project Catalyst</strong>, you are empowering
            individuals to gain verifiable skills and helping organizations
            reduce the time and cost to find them.
          </p>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="https://projectcatalyst.io/search?q=andamio"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btnPrimary} rounded-sm px-6 py-3 text-xl font-bold`}
            >
              Vote for Andamio in Fund 13
            </a>
          </div>
        </div>
      </main>

      {/* Value Proposition Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <h2 className="mb-6 text-center text-3xl font-bold text-primary">
            Why Andamio?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-lg transition hover:shadow-xl">
              <FontAwesomeIcon
                icon={faUserTie}
                className={`mx-auto mb-4 ${styles.textPrimary}`}
                height={100}
              />
              <h3 className="mb-4 text-2xl font-bold text-primary">
                For Individuals
              </h3>
              <p className="text-lg text-gray-600">
                Acquire verifiable skills that open doors to meaningful work.
                Andamio gives you control over your career path by making your
                skills visible and valued.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <FontAwesomeIcon
                icon={faBuilding}
                className={`mx-auto mb-4 ${styles.textPrimary}`}
                height={100}
              />
              <h3 className="mb-4 text-2xl font-bold text-primary">
                For Organizations
              </h3>
              <p className="text-lg text-gray-600">
                Find and engage skilled talent faster and more efficiently.
                Andamio reduces recruitment time and cost while ensuring you
                work with verified experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Watch How Andamio Works</h2>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/_K9TcaYqYLw"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2
            className={`mb-12 text-center text-3xl font-bold ${styles.textPrimary}`}
          >
            The Benefits of Voting for Andamio
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faMicrochip}
                className="mx-auto mb-4 text-primary"
                height={100}
              />
              <h4 className="text-xl font-bold">
                Pioneering Technology on Cardano
              </h4>
              <p className="px-10 text-justify text-gray-600">
                Andamio is leveraging cutting-edge blockchain solutions to
                onboard large enterprises, driving innovation and efficiency.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faSyncAlt}
                className="mx-auto mb-4 text-primary"
                height={100}
              />
              <h4 className="text-xl font-bold">On-Chain Efficiency</h4>
              <p className="px-10 text-justify text-gray-600">
                Harness the power of multiple seamless on-chain transactions to
                ensure transparency and security at every step.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faFileSignature}
                className="mx-auto mb-4 text-primary"
                height={100}
              />
              <h4 className="text-xl font-bold">
                Next-Generation Smart Contracts
              </h4>
              <p className="px-10 text-justify text-gray-600">
                Experience the future of problem-solving with Andamio&apos;s
                advanced smart contract technology, designed to streamline
                business processes and build trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className={`mb-6 text-3xl font-bold ${styles.textPrimary}`}>
            Time is Running Out to Vote!
          </h2>
          <div id="countdown" className="text-4xl font-bold text-red-500"></div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-4 text-lg">
            Be the first to know about Andamio&apos;s updates and progress!
          </p>
          <MailchimpForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2
            className={`mb-6 text-center text-3xl font-bold ${styles.textPrimary}`}
          >
            Frequently Asked Questions
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 px-12 pb-6">
              <h4 className={`text-2xl font-bold ${styles.textPrimary}`}>
                What is Andamio&apos;s role in strengthening the Cardano
                ecosystem?
              </h4>
              <p className="text-justify text-gray-600">
                Andamio is designed to empower individuals and organizations
                within the Cardano ecosystem by creating a platform that
                connects skilled contributors with businesses. Our focus on
                verifiable, on-chain skill acquisition ensures that all
                participants can trust in the talent they engage. By
                streamlining recruitment and contribution processes, Andamio
                reduces friction and accelerates real-world problem-solving,
                benefiting the broader Cardano ecosystem through enhanced
                productivity and trust.
              </p>
            </div>
            <div className="mb-4 px-12 pb-6">
              <h4 className={`text-2xl font-bold ${styles.textPrimary}`}>
                How does Andamio support Cardano&apos;s long-term growth?
              </h4>
              <p className="text-justify text-gray-600">
                By bridging the gap between skilled individuals and
                organizations, Andamio creates a dynamic, trusted marketplace
                within the Cardano ecosystem. Our platform supports long-term
                growth by enabling faster talent onboarding, reducing
                operational costs, and fostering collaboration on meaningful
                projects. With every interaction validated on-chain, Andamio
                helps build the infrastructure for a more efficient and
                transparent Cardano-powered economy.
              </p>
            </div>
            <div className="mb-4 px-12 pb-6">
              <h4 className={`text-2xl font-bold ${styles.textPrimary}`}>
                Why should I support Andamio in Fund 13?
              </h4>
              <p className="text-justify text-gray-600">
                Supporting Andamio in Fund 13 means investing in a project that
                strengthens Cardano&apos;s ecosystem through innovation in
                talent acquisition and project collaboration. Andamio is built
                on verifiable, decentralized processes, ensuring that all
                participants—both individuals and businesses—can thrive. Your
                vote ensures that Cardano continues to lead in decentralized
                project management and skill verification, making it a more
                robust and interconnected ecosystem.
              </p>
            </div>
            <div className="mb-4 px-12 pb-6">
              <h4 className={`text-2xl font-bold ${styles.textPrimary}`}>
                How does Andamio benefit Cardano stakeholders?
              </h4>
              <p className="text-justify text-gray-600">
                As a stakeholder in the Cardano ecosystem, your investments
                depend on the health and success of the projects within it.
                Andamio provides the infrastructure to ensure that high-quality
                talent is accessible, and that projects have the resources they
                need to succeed. By voting for Andamio, you are supporting a
                platform that enhances efficiency, promotes verifiable
                collaboration, and ultimately increases the value and security
                of the Cardano ecosystem.
              </p>
            </div>
            <div className="mb-4 px-12 pb-6">
              <h4 className={`text-2xl font-bold ${styles.textPrimary}`}>
                How does Andamio ensure transparency and trust in contributor
                engagement?
              </h4>
              <p className="text-justify text-gray-600">
                Andamio leverages Cardano&apos;s blockchain technology to verify
                skills and contributions on-chain. Every transaction,
                contribution, and skill acquisition is recorded in a
                transparent, immutable way, ensuring that organizations can
                trust the credentials and capabilities of those they engage
                with. This verifiability reduces the risk for all parties and
                builds a system of trust, which is essential for the growth of
                decentralized ecosystems like Cardano.
              </p>
            </div>
            <div className="mb-4 px-12 pb-6">
              <h4 className={`text-2xl font-bold ${styles.textPrimary}`}>
                What problem is Andamio solving for the Cardano ecosystem?
              </h4>
              <p className="text-justify text-gray-600">
                One of the key challenges in any decentralized ecosystem is
                finding and verifying skilled contributors. Andamio solves this
                problem by offering a platform where individuals can acquire
                skills that are verifiable on-chain and organizations can
                efficiently onboard talent to work on meaningful projects. This
                reduces the time and cost traditionally associated with
                recruitment while ensuring that contributors are both skilled
                and engaged in solving the problems that matter most.
              </p>
            </div>
            <div className="mb-4 px-12 pb-6">
              <h4 className={`text-2xl font-bold ${styles.textPrimary}`}>
                How does Andamio integrate with other Cardano-based projects?
              </h4>
              <p className="text-justify text-gray-600">
                Andamio is built to seamlessly integrate with other
                Cardano-based projects by providing a verifiable contributor and
                skills platform that any Cardano project can leverage. Whether
                it&apos;s for DAOs, DApps, or other decentralized projects,
                Andamio makes it easier for teams to find the talent they need
                to execute their vision. By supporting Andamio, you&apos;re
                voting for a tool that enhances the collaborative potential of
                the entire Cardano ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="py-12 text-center">
        <a
          href="https://cardano.ideascale.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary rounded-md px-6 py-3 text-xl font-bold text-white"
        >
          Vote for Andamio in Fund 13
        </a>
      </div>

      {/* Footer Section */}
      <footer className="bg-primary py-6 text-white">
        <div className="container mx-auto text-center">
          <p className="text-sm">Follow us:</p>
          <div className="mt-4">
            <a href="https://x.com/AndamioPlatform" className="mx-2">
              <Image
                src="/logo-white.png"
                alt="Twitter"
                className="inline h-6 w-6"
                width={48}
                height={48}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/andamio-platform"
              className="mx-2"
            >
              <Image
                src="/In-Blue-128@2x.png"
                alt="LinkedIn"
                className="inline h-6 w-6"
                width={48}
                height={48}
              />
            </a>
          </div>
        </div>

        <div className="container mx-auto py-12 text-center">
          <p className="text-sm">© 2024 Andamio. All rights reserved.</p>
          <p className="text-sm">Built for the Cardano Summit 2024.</p>
        </div>
      </footer>
    </div>
  );
};

export default AndamioComponent;
