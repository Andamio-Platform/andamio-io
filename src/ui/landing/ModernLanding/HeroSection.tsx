import React from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden snap-start pt-16 sm:pt-20">
      {/* Background Andamio Logo */}
      <div className="absolute -left-20 sm:-left-40 top-1/2 -translate-y-1/2 transform opacity-30 sm:opacity-50">
        <Image
          src="/andamio-logo-no-white-overflow.png"
          alt=""
          width={800}
          height={800}
          className="h-[30vh] sm:h-[40vh] lg:h-[50vh] w-auto"
        />
      </div>

      {/* Left Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="relative max-w-3xl">
          <h1 className="mb-6 sm:mb-8 lg:mb-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-[1.1]">
            <span className="block tracking-tight text-foreground">Build</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text tracking-tight text-transparent">
              Great Teams
            </span>
          </h1>

          <div className="relative mb-6 sm:mb-8 lg:mb-12">
            <p className="mb-6 sm:mb-8 lg:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
              professional identity for distributed work
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl hover:text-success-foreground"
            >
              How It Works · Click or Press ↓
            </Button>
          </div>
        </div>
      </div>

      {/* Right side scaffolding grid - flush to viewport edge */}
      <div className="absolute right-0 top-1/2 hidden xl:block -translate-y-1/2 transform">
        <div className="flex flex-col gap-4 lg:gap-6 pr-0">
          {/* Image 1 */}
          <div className="relative h-[120px] w-[200px] lg:h-[150px] lg:w-[250px] xl:h-[180px] xl:w-[280px] overflow-hidden rounded-l-lg border-2 border-r-0 border-border shadow-lg">
            <Image
              src="/images/landing/example1.jpeg"
              alt=""
              width={380}
              height={220}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Image 2 */}
          <div className="relative h-[120px] w-[200px] lg:h-[150px] lg:w-[250px] xl:h-[180px] xl:w-[280px] overflow-hidden rounded-l-lg border-2 border-r-0 border-border shadow-lg">
            <Image
              src="/images/landing/example2.jpeg"
              alt=""
              width={380}
              height={220}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Image 3 */}
          <div className="relative h-[120px] w-[200px] lg:h-[150px] lg:w-[250px] xl:h-[180px] xl:w-[280px] overflow-hidden rounded-l-lg border-2 border-r-0 border-border shadow-lg">
            <Image
              src="/images/landing/example3.jpeg"
              alt=""
              width={380}
              height={220}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Image 4 */}
          <div className="relative h-[120px] w-[200px] lg:h-[150px] lg:w-[250px] xl:h-[180px] xl:w-[280px] overflow-hidden rounded-l-lg border-2 border-r-0 border-border shadow-lg">
            <Image
              src="/images/landing/example4.jpeg"
              alt=""
              width={380}
              height={220}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
