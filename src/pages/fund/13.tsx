import MenuBar from "~/ui/landing/MenuBar";
import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import Link from "~/components/link";
import Footer from "~/ui/landing/Footer";
import { Card } from "~/components/ui/card";

const AndamioComponent = () => {
  useEffect(() => {
    // Countdown for "Register to vote"
    const registerCountdownElement =
      document.getElementById("registerCountdown");
    const registerEndDate = new Date("2024-11-20T21:45:00Z").getTime();

    const registerCountdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = registerEndDate - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (registerCountdownElement) {
        registerCountdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      if (timeLeft < 0) {
        clearInterval(registerCountdownTimer);
        if (registerCountdownElement) {
          registerCountdownElement.innerHTML = "Registration has closed!";
        }
      }
    }, 1000);

    // Countdown for "Time is Running Out to Vote"
    const voteCountdownElement = document.getElementById("voteCountdown");
    const voteEndDate = new Date("2024-12-12T11:00:00Z").getTime();

    const voteCountdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = voteEndDate - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (voteCountdownElement) {
        voteCountdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      if (timeLeft < 0) {
        clearInterval(voteCountdownTimer);
        if (voteCountdownElement) {
          voteCountdownElement.innerHTML = "Voting has closed!";
        }
      }
    }, 1000);

    return () => {
      clearInterval(registerCountdownTimer);
      clearInterval(voteCountdownTimer);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <VideoBackground>
        <MenuBar />
        <main className="relative mx-auto flex h-[80vh] w-full flex-col items-start justify-center px-8 text-start md:px-12 lg:justify-end">
          <h3 className="text-5xl font-black uppercase text-secondary sm:text-5xl md:text-6xl lg:text-7xl">
            The Benefits of Voting for Andamio
          </h3>
          <div className="flex w-full flex-col gap-4 md:flex-col lg:flex-row">
            {/* Benefits Section */}
            <div className="grid w-full grid-cols-1 gap-8 py-6 md:grid-cols-3 lg:grid-cols-3">
              <Card className="flex flex-col items-start space-y-4 rounded-lg bg-white p-6 shadow-md">
                <h4 className="text-lg font-bold text-primary sm:text-xl">
                  Enterprise-ready Solution
                </h4>
                <p className="text-darkGreyText text-sm font-light">
                  Andamio leverages Cardano’s robust blockchain technology to
                  onboard enterprises efficiently, supporting ecosystem growth
                  and driving adoption.
                </p>
              </Card>
              <Card className="flex flex-col items-start space-y-4 rounded-lg bg-white p-6 shadow-md">
                <h4 className="text-lg font-bold text-primary sm:text-xl">
                  Next-Generation Smart Contracts
                </h4>
                <p className="text-darkGreyText text-sm font-light">
                  Our next-generation smart contracts are built to optimize and
                  automate business processes, ensuring scalability,
                  transparency, and trust in every transaction.
                </p>
              </Card>
              <Card className="flex flex-col items-start space-y-4 rounded-lg bg-white p-6 shadow-md">
                <h4 className="text-lg font-bold text-primary sm:text-xl">
                  Transparent On-Chain Operations
                </h4>
                <p className="text-darkGreyText text-sm font-light">
                  Utilize streamlined, verifiable on-chain transactions that
                  prioritize efficiency and security, designed to meet the
                  demands of growing transaction volumes and support long-term
                  ecosystem sustainability.
                </p>
              </Card>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-4 py-6 xl:flex-row">
            {/* Vote Button */}
            <Link href="https://projectcatalyst.io/search?q=andamio">
              <Button className="rounded bg-primary px-12 py-4 text-lg font-bold uppercase text-white shadow-primary transition-all duration-300 hover:bg-opacity-90">
                Vote for Andamio in Fund 13
              </Button>
            </Link>
            {/* Register Countdown */}
            <div className="text-start 2xl:flex 2xl:flex-row">
              <h2 className="text-2xl font-bold text-primary md:text-3xl 2xl:pe-2">
                Register to Vote
              </h2>
              <div
                id="registerCountdown"
                className="text-2xl font-extrabold text-secondary md:text-3xl"
              ></div>
            </div>

            {/* Voting Countdown */}
            <div className="text-start 2xl:flex 2xl:flex-row">
              <h2 className="text-2xl font-bold text-primary md:text-3xl 2xl:pe-2">
                Time is Running Out to Vote!
              </h2>
              <div
                id="voteCountdown"
                className="text-2xl font-extrabold text-secondary md:text-3xl"
              ></div>
            </div>
          </div>
        </main>
      </VideoBackground>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AndamioComponent;

const VideoBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Video container */}
        <div className="fixed left-0 top-0 h-full w-full overflow-hidden opacity-70">
          <video
            className="min-h-screen min-w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video/bg-video-002.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content overlay */}
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
};
