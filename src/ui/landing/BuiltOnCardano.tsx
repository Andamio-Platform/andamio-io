import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardIcon, CardHeader, CardContent } from "~/components/ui/card";
import {
  CheckBadgeIcon,
  WalletIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export function BuiltOnCardano() {
  return (
    <section className="flex min-h-screen items-center justify-center py-12">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-6 text-center text-4xl font-black uppercase text-primary sm:text-5xl md:text-6xl">
          Built for Trust and Transparency
        </h2>

        {/* Subheadline */}
        <div className="mb-12 max-w-7xl text-center">
          <p className="text-lg font-light text-foreground">
            Andamio uses {/* Inline Logo for Medium Screens and Above */}
            <span className="hidden md:inline-block">
              <Image
                src="/cardano-horizontal-blue.svg" // Replace with your actual image
                alt="Cardano Logo"
                className="mx-2 inline-block h-6 w-auto md:h-8" // Responsive sizing
                width={80}
                height={24}
              />
            </span>
            blockchain technology to ensure trust in every skill and
            contribution.
          </p>
        </div>

        {/* Features - Flex Row on Small Screens */}
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:space-x-6">
          <Card className="flex w-full max-w-xs flex-col items-center space-y-4 p-6 text-center shadow-lg md:flex-grow">
            <CardIcon>
              <CheckBadgeIcon className="h-10 w-10 text-secondary" />
            </CardIcon>
            <CardHeader className="text-xl font-bold text-primary">
              Blockchain Credentials
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-foreground">
                Verifiable, on-chain skills and work history.
              </p>
            </CardContent>
          </Card>

          <Card className="flex w-full max-w-xs flex-col items-center space-y-4 p-6 text-center shadow-lg md:flex-grow">
            <CardIcon>
              <WalletIcon className="h-10 w-10 text-secondary" />
            </CardIcon>
            <CardHeader className="text-xl font-bold text-primary">
              Smart Contracts
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-foreground">
                Secure payments without intermediaries.
              </p>
            </CardContent>
          </Card>

          <Card className="flex w-full max-w-xs flex-col items-center space-y-4 p-6 text-center shadow-lg md:flex-grow">
            <CardIcon>
              <ShieldCheckIcon className="h-10 w-10 text-secondary" />
            </CardIcon>
            <CardHeader className="text-xl font-bold text-primary">
              Trust and Reputation
            </CardHeader>
            <CardContent>
              <p className="text-sm font-light text-foreground">
                Build a trusted reputation in the global marketplace.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cardano Logo Below for Small Screens Only */}
        <div className="mt-10 flex justify-center md:hidden">
          <Image
            src="/cardano-horizontal-blue.svg" // Replace with your actual image
            alt="Cardano Blockchain Illustration"
            className="h-16 w-auto" // Set logo size for smaller screens
            width={400}
            height={100}
          />
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link href="/learn-more-about-blockchain">
            <Button className="text-md hover:borderborder-primary rounded bg-primary px-6 py-3 font-montserrat font-semibold uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary">
              Learn More About Our Technology
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
