import Image from "next/image";
import React, { useEffect } from "react";

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
          src="/andamio-summit-coverv4.png"
          alt="andamio banner"
          className="h-auto w-full"
          width={6176}
          height={800}
        />
      </header>

      {/* Main Section */}
      <main className="container mx-auto flex-grow px-4 py-12 md:px-0">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {/* Attention Grabbing Headline */}
          <h2 className="mb-6 text-justify text-3xl font-bold text-primary">
            Revolutionizing How the World Solves Problems with Verifiable Skills
          </h2>

          {/* Introductory Statement */}
          <p className="mb-6 text-justify text-xl text-gray-700">
            Imagine a world where individuals own their skills, and
            organizations can quickly find the talent they need to solve
            real-world problems.
          </p>

          {/* Core Message */}
          <p className="mb-8 text-justify text-lg text-gray-600">
            At Andamio, we are breaking down outdated recruitment and education
            systems. By voting for us in{" "}
            <strong>Fund 13 of Project Catalyst</strong>, you are empowering
            individuals to gain verifiable skills and helping organizations
            reduce the time and cost to find them.
          </p>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="https://cardano.ideascale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-md px-6 py-3 text-xl font-bold"
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
          <div className="relative w-full pb-56">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/3FaMyb8MxOY"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="mb-6 text-center text-3xl font-bold">
            The Benefits of Voting for Andamio
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <i className="fas fa-user-graduate mb-4 text-4xl text-primary"></i>
              <h4 className="text-xl font-bold">Verifiable Skills</h4>
              <p className="text-gray-600">
                Earn skills recognized across the industry, secured on the
                blockchain.
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-stopwatch mb-4 text-4xl text-primary"></i>
              <h4 className="text-xl font-bold">Faster Recruitment</h4>
              <p className="text-gray-600">
                Save time and money by finding skilled contributors in a
                fraction of the time.
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-users mb-4 text-4xl text-primary"></i>
              <h4 className="text-xl font-bold">Community Impact</h4>
              <p className="text-gray-600">
                Help create an ecosystem where skills and opportunities are
                verifiable and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Time is Running Out to Vote!
          </h2>
          <div
            id="countdown"
            className="text-4xl font-bold text-blue-900"
          ></div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-4 text-lg">
            Be the first to know about Andamio&apos;s updates and progress!
          </p>
          <form className="flex flex-col items-center">
            <input
              type="email"
              className="mb-4 w-80 rounded-lg p-3 text-gray-900"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="btn-secondary rounded-md px-6 py-3 text-xl font-bold transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4">
              <h4 className="font-bold">What is Project Catalyst Fund 13?</h4>
              <p className="text-gray-600">
                Project Catalyst is a series of innovation funds to support
                proposals that benefit the Cardano ecosystem.
              </p>
            </div>
            <div className="mb-4">
              <h4 className="font-bold">Why should I vote for Andamio?</h4>
              <p className="text-gray-600">
                Andamio enables individuals to own verifiable skills and
                organizations to efficiently find skilled contributors, solving
                meaningful problems.
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
