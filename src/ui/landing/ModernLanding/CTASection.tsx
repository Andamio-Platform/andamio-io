import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-border snap-start"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="mb-6 sm:mb-8 lg:mb-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-[1.1]">
            <span className="block tracking-tight text-foreground">Ready to Build</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text tracking-tight text-transparent">
              Great Teams?
            </span>
          </h2>

          <div className="relative mb-8 sm:mb-12 lg:mb-16">
            <p className="mx-auto max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
              Stop rebuilding credentialing infrastructure.
            </p>
            <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Integrate Andamio's API and start building great teams today.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row justify-center">
            <Link href="https://app.andamio.io/course/86affc4de251b0fb7636c376383bcebf6ca7ca426528f9b7a5adc298">
              <Button
                size="lg"
                className="bg-primary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl w-full sm:w-auto"
              >
                Start with Andamio 101
              </Button>
            </Link>
            <Link href="https://docs.andamio.io/docs/">
              <Button
                size="lg"
                intent="outline"
                className="border-primary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-foreground shadow-md hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
              >
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
