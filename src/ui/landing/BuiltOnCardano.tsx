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
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-6 text-center text-4xl font-black uppercase text-primary sm:text-5xl md:text-6xl">
          Built for Trust and Transparency
        </h2>

        {/* Subheadline */}
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg font-light text-foreground">
          Andamio uses blockchain to ensure trust in every skill and
          contribution.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left Column: Key Features */}
          <div className="flex flex-col justify-center space-y-6">
            <Card className="flex items-start space-x-4 p-4">
              <CardIcon>
                <CheckBadgeIcon
                  className="h-8 w-8 text-secondary"
                  aria-hidden="true"
                />
              </CardIcon>
              <div>
                <CardHeader className="text-xl font-bold text-primary">
                  Blockchain Credentials
                </CardHeader>
                <CardContent>
                  <p className="text-md font-light text-foreground">
                    Verifiable, on-chain skills and work history.
                  </p>
                </CardContent>
              </div>
            </Card>

            <Card className="flex items-start space-x-4 p-4">
              <CardIcon>
                <WalletIcon
                  className="h-8 w-8 text-secondary"
                  aria-hidden="true"
                />
              </CardIcon>
              <div>
                <CardHeader className="text-xl font-bold text-primary">
                  Smart Contracts
                </CardHeader>
                <CardContent>
                  <p className="text-md font-light text-foreground">
                    Secure payments without intermediaries.
                  </p>
                </CardContent>
              </div>
            </Card>

            <Card className="flex items-start space-x-4 p-4">
              <CardIcon>
                <ShieldCheckIcon
                  className="h-8 w-8 text-secondary"
                  aria-hidden="true"
                />
              </CardIcon>
              <div>
                <CardHeader className="text-xl font-bold text-primary">
                  Trust and Reputation
                </CardHeader>
                <CardContent>
                  <p className="text-md font-light text-foreground">
                    Build a trusted reputation in the global marketplace.
                  </p>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Right Column: Illustration or Image */}
          <div className="flex items-center justify-center">
            <Image
              src="/cardano-horizontal-blue.svg" // Replace with your actual image
              alt="Cardano Blockchain Illustration"
              className="h-60 max-w-full px-4"
              width={400}
              height={200}
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link href="/learn-more-about-blockchain">
            <Button className="text-md hover:borderborder-primary font-montserrat rounded bg-primary px-6 py-3 font-semibold uppercase text-white transition-all duration-300 hover:border-2 hover:border-primary hover:bg-white hover:text-primary">
              Learn More About Our Technology
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
