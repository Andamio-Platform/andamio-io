import React, { useState, useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
// import { Target, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function ModernLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Wheel scroll handler
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = (e: WheelEvent) => {
      if (!sectionRef.current || !stepsContainerRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (isInView) {
        // If on last step and scrolling down, navigate to next section
        if (e.deltaY > 0 && activeStep === 5) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          return;
        }

        // Only prevent default if we're not at the boundaries
        if ((e.deltaY > 0 && activeStep < 5) || (e.deltaY < 0 && activeStep > 0)) {
          e.preventDefault();

          // Debounce rapid scrolling
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
              setActiveStep(prev => Math.min(5, prev + 1));
            } else if (e.deltaY < 0) {
              setActiveStep(prev => Math.max(0, prev - 1));
            }
          }, 50);
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

      if (isInView) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          // If on last step and pressing down/right, scroll to next section
          if (activeStep === 5) {
            document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            setActiveStep(prev => Math.min(5, prev + 1));
          }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveStep(prev => Math.max(0, prev - 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStep]);

  // Smooth scroll to active step
  useEffect(() => {
    if (stepsContainerRef.current) {
      stepsContainerRef.current.scrollTo({
        left: activeStep * stepsContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [activeStep]);

  // Track current section with IntersectionObserver
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section.snap-start'));
    sectionsRef.current = sections as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isScrollingRef.current) {
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setCurrentSectionIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Collect all sections and handle global section navigation
  useEffect(() => {
    const sections = sectionsRef.current;
    if (sections.length === 0) return;

    const navigateToSection = (index: number) => {
      if (index < 0 || index >= sections.length || isScrollingRef.current) return;

      isScrollingRef.current = true;
      setCurrentSectionIndex(index);

      sections[index]?.scrollIntoView({ behavior: 'smooth' });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    const handleWheelScroll = (e: WheelEvent) => {
      // Check if we're in the "How It Works" section
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInHowItWorks = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

        // If in "How It Works" section, let the existing handler manage it
        if (isInHowItWorks && ((e.deltaY > 0 && activeStep < 5) || (e.deltaY < 0 && activeStep > 0))) {
          return;
        }
      }

      // Allow normal scrolling if at the boundaries
      if (e.deltaY > 0 && currentSectionIndex >= sections.length - 1) {
        // Scrolling down from last section - allow normal scroll to footer
        return;
      }
      if (e.deltaY < 0 && currentSectionIndex <= 0) {
        // Scrolling up from first section - allow normal scroll
        return;
      }

      e.preventDefault();

      if (isScrollingRef.current) return;

      if (e.deltaY > 0) {
        // Scroll down
        navigateToSection(currentSectionIndex + 1);
      } else {
        // Scroll up
        navigateToSection(currentSectionIndex - 1);
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if we're in the "How It Works" section
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInHowItWorks = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

        // If in "How It Works" section and using arrow keys, let the existing handler manage it
        if (isInHowItWorks && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' ||
            e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
          return;
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        // If on last section, scroll to footer
        if (currentSectionIndex >= sections.length - 1) {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
          navigateToSection(currentSectionIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToSection(currentSectionIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheelScroll, { passive: false });
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('wheel', handleWheelScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSectionIndex, activeStep]);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ scrollbarWidth: 'auto' }}>
      {/* Angular Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent"></div>
        <div className="grid h-full grid-cols-16">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-primary/30"></div>
          ))}
        </div>
        <div className="absolute inset-0">
          <div className="flex h-full flex-col">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex-1 border-b border-primary/20"></div>
            ))}
          </div>
        </div>
        {/* Additional vertical accent lines */}
        <div className="absolute left-1/4 top-0 h-full w-px bg-primary/25"></div>
        <div className="absolute left-1/2 top-0 h-full w-px bg-primary/30"></div>
        <div className="absolute left-3/4 top-0 h-full w-px bg-primary/25"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <Image
                  className="h-8 sm:h-10 w-auto"
                  src="/andamio-logo-no-white-overflow.png"
                  alt="Andamio"
                  width={100}
                  height={100}
                />
                <span className="text-lg sm:text-xl font-bold text-foreground">Andamio</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              <a
                href="https://docs.andamio.io"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Docs
              </a>
              <Link
                href="/roadmap"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Roadmap
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="https://app.andamio.io/course/86affc4de251b0fb7636c376383bcebf6ca7ca426528f9b7a5adc298"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Andamio 101
              </Link>
              <Link
                href="/customers"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                Customers
              </Link>
              <Link
                href="/fund/14"
                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                <span role="img" aria-label="rocket">🚀</span> Catalyst
              </Link>
              <Link
                href="https://app.andamio.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-3 xl:px-4 py-2 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg"
              >
                <span>Enter App</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <a
                href="https://docs.andamio.io"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </a>
              <Link
                href="/roadmap"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="https://app.andamio.io/course/86affc4de251b0fb7636c376383bcebf6ca7ca426528f9b7a5adc298"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Andamio 101
              </Link>
              <Link
                href="/customers"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Customers
              </Link>
              <Link
                href="/fund/14"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span role="img" aria-label="rocket">🚀</span> Project Catalyst
              </Link>
              <Link
                href="https://app.andamio.io"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center rounded-md border border-primary bg-primary px-4 py-3 text-base font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enter App
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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

      {/* How It Works */}
      <section
        ref={sectionRef}
        id="how-it-works"
        className="relative flex flex-col border-t border-border bg-muted/30 snap-start min-h-screen"
      >
        {/* Minimal Header */}
        <div className="sticky top-16 sm:top-20 z-10 flex-shrink-0 bg-background/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4">
          <div className="mx-auto max-w-full">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">
                  How Andamio Works
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  A practical workflow for building and scaling your distributed team
                </p>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {[0, 1, 2, 3, 4, 5].map((step) => (
                  <button
                    key={step}
                    onClick={() => setActiveStep(step)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeStep === step
                        ? 'w-8 sm:w-12 bg-primary shadow-md shadow-primary/50'
                        : 'w-2 bg-border hover:bg-muted-foreground hover:w-4'
                    }`}
                    aria-label={`Go to step ${step + 1}`}
                  />
                ))}
                <span className="ml-2 text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {activeStep + 1}/6
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          className={`absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 rounded-full border border-border bg-card/80 p-2 sm:p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-xl hover:scale-110 ${
            activeStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-60 hover:opacity-100'
          }`}
          aria-label="Previous step"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
          className={`absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 rounded-full border border-border bg-card/80 p-2 sm:p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-card hover:shadow-xl hover:scale-110 ${
            activeStep === 5 ? 'opacity-0 pointer-events-none' : 'opacity-60 hover:opacity-100'
          }`}
          aria-label="Next step"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Horizontal Scrolling Steps Container */}
        <div
          ref={stepsContainerRef}
          className="flex overflow-x-hidden overflow-y-hidden flex-1 snap-x snap-mandatory mt-24 sm:mt-28"
          style={{ scrollbarWidth: 'none', minHeight: 'calc(100vh - 16rem)' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Step 1 */}
          <div className="min-w-full h-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1fr,1.2fr]">
                <div className="order-1 lg:order-1">
                  <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-primary text-lg sm:text-xl font-bold text-primary-foreground shadow-lg flex-shrink-0">
                      1
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Create a Project</h3>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    Think of it like posting gigs appropriate for a contributor. Not a full job opening—just tasks, bounties, challenges.
                  </p>
                </div>
                <div className="order-2 lg:order-2 flex items-center justify-center">
                  <div className="group relative w-full max-w-4xl">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                    <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-card shadow-2xl">
                      <Image
                        src="/steps/001.png"
                        alt="Create a Project - Project creation interface"
                        width={1600}
                        height={900}
                        className="w-full h-auto max-h-[60vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="min-w-full h-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1.2fr,1fr]">
                <div className="order-2 lg:order-1 flex items-center justify-center">
                  <div className="group relative w-full max-w-4xl">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-success/20 to-success/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                    <div className="relative overflow-hidden rounded-xl border-2 border-success/30 bg-card shadow-2xl">
                      <Image
                        src="/steps/002.png"
                        alt="Define Prerequisites - Prerequisites setup interface"
                        width={1600}
                        height={900}
                        className="w-full h-auto max-h-[60vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-success text-lg sm:text-xl font-bold text-success-foreground shadow-lg flex-shrink-0">
                      2
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Define Prerequisites</h3>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    What does someone need to know to join? For example: 'We need someone who knows TypeScript, understands Cardano architecture, and is familiar with our application stack.'
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="min-w-full h-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1fr,1.2fr]">
                <div className="order-1 lg:order-1">
                  <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-secondary text-lg sm:text-xl font-bold text-secondary-foreground shadow-lg flex-shrink-0">
                      3
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Contributors Submit Evidence</h3>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    Not resumes. Actual tasks defined by the project team. They show what they can do.
                  </p>
                </div>
                <div className="order-2 lg:order-2 flex items-center justify-center">
                  <div className="group relative w-full max-w-4xl">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-secondary/20 to-secondary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                    <div className="relative overflow-hidden rounded-xl border-2 border-secondary/30 bg-card shadow-2xl">
                      <Image
                        src="/steps/003.png"
                        alt="Contributors Submit Evidence - Assignment submission interface"
                        width={1600}
                        height={900}
                        className="w-full h-auto max-h-[60vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="min-w-full h-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1.2fr,1fr]">
                <div className="order-2 lg:order-1 flex items-center justify-center">
                  <div className="group relative w-full max-w-4xl">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                    <div className="relative overflow-hidden rounded-xl border-2 border-accent/30 bg-card shadow-2xl">
                      <Image
                        src="/steps/004.png"
                        alt="Teach What They Don't Know - Team Goals learning module"
                        width={1600}
                        height={900}
                        className="w-full h-auto max-h-[60vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-accent text-lg sm:text-xl font-bold text-accent-foreground shadow-lg flex-shrink-0">
                      4
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Teach What They Don't Know</h3>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    You can teach people what they're missing. Share a bit about your platform stack, your processes, your culture. We're doing this to build the Andamio team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="min-w-full h-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1fr,1.2fr]">
                <div className="order-1 lg:order-1">
                  <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-secondary text-lg sm:text-xl font-bold text-secondary-foreground shadow-lg flex-shrink-0">
                      5
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Approve Assignments</h3>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    They complete learning, you approve it. They earn credentials.
                  </p>
                </div>
                <div className="order-2 lg:order-2 flex items-center justify-center">
                  <div className="group relative w-full max-w-4xl">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-secondary/20 to-secondary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                    <div className="relative overflow-hidden rounded-xl border-2 border-secondary/30 bg-card shadow-2xl">
                      <Image
                        src="/steps/005.png"
                        alt="Approve Assignments - Assignment review and approval interface"
                        width={1600}
                        height={900}
                        className="w-full h-auto max-h-[60vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="min-w-full h-full flex items-center justify-center snap-center px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1.2fr,1fr]">
                <div className="order-2 lg:order-1 flex items-center justify-center">
                  <div className="group relative w-full max-w-4xl">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                    <div className="relative overflow-hidden rounded-xl border-2 border-accent/30 bg-card shadow-2xl max-h-[60vh]">
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/5 to-muted/30 p-4 sm:p-6 lg:p-8 min-h-[30vh]">
                        <div className="text-center">
                          <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl lg:text-5xl">💰</div>
                          <div className="text-sm sm:text-base lg:text-lg text-muted-foreground">Screenshot placeholder</div>
                          <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">Task contribution dashboard</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-accent text-lg sm:text-xl font-bold text-accent-foreground shadow-lg flex-shrink-0">
                      6
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Contribute to Real Tasks with Real Rewards</h3>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                    Now they can start contributing. Paid bounties. Open tasks. Trial projects. The team practices working together. You see what they can actually do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk-Free Team Building */}
      <section
        id="outcomes"
        className="relative flex items-center overflow-hidden snap-start min-h-screen border-t-0"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 lg:py-16">
          <div className="grid items-center gap-6 lg:gap-10 xl:gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="relative flex flex-col justify-center">
              <h2 className="mb-3 sm:mb-4 lg:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                <span className="block tracking-tight text-foreground">Risk-Free</span>
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text tracking-tight text-transparent">
                  Team Building
                </span>
              </h2>

              <div className="relative">
                <p className="mb-2 sm:mb-3 lg:mb-4 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground">
                  Either way, everyone wins.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Skip the traditional interview theater.
                </p>
              </div>
            </div>

            {/* Right side - Stacked Outcomes */}
            <div className="flex flex-col justify-center" style={{ gap: 'clamp(1rem, 2vh, 1.5rem)', paddingTop: 'clamp(1rem, 2vh, 1.5rem)', paddingBottom: 'clamp(1rem, 2vh, 1.5rem)' }}>
              {/* Works Out */}
              <div className="group relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-success/20 to-success/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                  <div className="mb-2.5 sm:mb-3 lg:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-success shadow-lg flex-shrink-0">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-success-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">If It Works Out</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    <p>
                      You've built{" "}
                      <strong className="text-foreground">real trust</strong> by working
                      together on actual tasks.
                    </p>
                    <p>
                      They're already{" "}
                      <strong className="text-foreground">onboarded and enrolled</strong>{" "}
                      in your project workflows.
                    </p>
                    <p>
                      You skip the traditional interview theater and hire someone{" "}
                      <strong className="text-foreground">
                        you've actually worked with
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Doesn't Work Out */}
              <div className="group relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                  <div className="mb-2.5 sm:mb-3 lg:mb-4 flex items-center gap-2.5 sm:gap-3">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-primary shadow-lg flex-shrink-0">
                      <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">If It Doesn't Work Out</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    <p>
                      The time wasn't wasted—your{" "}
                      <strong className="text-foreground">team still got work done</strong>.
                    </p>
                    <p>
                      The contributor has{" "}
                      <strong className="text-foreground">
                        verifiable credentials
                      </strong>{" "}
                      for what they learned and how they contributed.
                    </p>
                    <p>
                      Those credentials are{" "}
                      <strong className="text-foreground">portable across apps</strong>
                      —someone else likely needs a Cardano TypeScript developer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      

      

      {/* Andamio Protocol Components */}
      <section
        id="protocol"
        className="relative flex items-center border-t-0 snap-start min-h-screen pt-20 sm:pt-24"
        style={{ paddingBottom: 'clamp(1.5rem, 3vh, 3.5rem)' }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Section header */}
            <div className="mb-4 sm:mb-5 lg:mb-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-0.5 w-6 bg-gradient-to-r from-primary to-transparent"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Three Ways to Build with Andamio
                </h2>
              </div>
              <p className="mb-1 max-w-3xl text-sm sm:text-base text-muted-foreground">
                <strong className="text-foreground">
                Accessible professional identity{" "}
                </strong>
                  that works for your team
              </p>
              <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground">
                Andamio is built to be integrated across applications. Whether you want a ready-to-use solution, developer tools, or protocol-level integration, these tools help you get started. 
              </p>
            </div>

            {/* Three column grid */}
            <div className="grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Platform */}
              <Link href="https://app.andamio.io">
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/30 to-primary/20 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: "url(/images/landing/global.jpeg)",
                    }}
                  ></div>

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-card">
                        Platform
                      </h3>
                      <div className="h-0.5 w-10 sm:w-12 bg-card"></div>
                      <p className="text-xs leading-relaxed text-card line-clamp-4">
                        A complete, hosted solution at{" "}
                        <strong className="text-card">app.andamio.io</strong>.
                        Start building your team immediately with no infrastructure setup required.
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>
              </Link>

              {/* SDK + API */}
              <Link href="https://sdk.andamio.io/">
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-success/30 to-success/20 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: "url(/images/landing/local.jpeg)",
                    }}
                  ></div>

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-success/80 via-success/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-success/30 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-card">
                        SDK + API
                      </h3>
                      <div className="h-0.5 w-10 sm:w-12 bg-card"></div>
                      <p className="text-xs leading-relaxed text-card line-clamp-4">
                        Developer tools that{" "}
                        <strong className="text-card">
                          integrate with your existing applications
                        </strong>. Add credentialing to your product in days, not months.
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-success/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>
              </Link>


              {/* Andamio Protocol */}
              <Link href="https://docs.andamio.io">
              <div className="group relative md:col-span-2 lg:col-span-1">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-secondary/30 to-secondary/20 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: "url(/images/landing/access-token.jpeg)",
                    }}
                  ></div>

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-card">
                        Andamio Protocol
                      </h3>
                      <div className="h-0.5 w-10 sm:w-12 bg-card"></div>
                      <p className="text-xs leading-relaxed text-card line-clamp-4">
                        Open credentialing infrastructure built on{" "}
                        <strong className="text-card">Cardano blockchain</strong>.
                        Portable identity for distributed work.
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>
              </Link>

            </div>
          </div>
        </div>


      </section>

      {/* Built on Cardano */}
      <section
        id="cardano"
        className="relative flex min-h-screen items-center overflow-hidden border-t-0 snap-start"
        style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)', paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Left side - Stats Cards */}
            <div className="flex flex-col order-2 lg:order-1" style={{ gap: 'clamp(1rem, 2vh, 1.5rem)' }}>
              <div className="group relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                  <Image
                    src="/cardano-horizontal-blue.svg"
                    alt="Cardano"
                    className="mb-3 sm:mb-4 h-10 sm:h-12 w-auto"
                    width={500}
                    height={500}
                  />
                  <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl font-bold text-primary">100%</div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">Verifiable</div>
                  <div className="mt-2 sm:mt-3 h-1.5 w-full rounded-full bg-primary/20"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-secondary/20 to-secondary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                  <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl font-bold text-secondary">∞</div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">Permanent</div>
                  <div className="mt-2 sm:mt-3 h-1.5 w-full rounded-full bg-secondary/20"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                  <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl font-bold text-accent">24/7</div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">Accessible</div>
                  <div className="mt-2 sm:mt-3 h-1.5 w-full rounded-full bg-accent/20"></div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative order-1 lg:order-2">
              <h2 className="mb-4 sm:mb-6 lg:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                <span className="block tracking-tight text-foreground">Built on</span>
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text tracking-tight text-transparent">
                  Cardano
                </span>
              </h2>

              <div className="relative">
                <p className="mb-3 sm:mb-4 lg:mb-5 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-foreground">
                  Leveraging the security and sustainability of the Cardano blockchain.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
                  Andamio harnesses Cardano's proof-of-stake blockchain to provide secure, energy-efficient, and transparent credentialing. Every certificate and achievement is{" "}
                  <strong className="text-foreground">immutably recorded</strong>, ensuring your credentials are always verifiable and portable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
}


// {/* Trust Framework */}
//       <section
//         id="trust"
//         className="relative flex min-h-screen items-center overflow-hidden border-t border-border py-20 snap-start"
//       >
//         <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
//           <div className="relative">
//             {/* Section header */}
//             <div className="mb-8">
//               <div className="mb-4 flex items-center gap-4">
//                 <div className="h-1 w-12 bg-gradient-to-r from-secondary to-transparent"></div>
//                 <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
//                   Building Teams That Work
//                 </h2>
//               </div>
//               <p className="max-w-3xl text-lg text-muted-foreground">
//                 Great teams are built on trust. Andamio is credentialing
//                 infrastructure for high-trust professional collaboration. Now, distributed teams can establish purpose,
//                 manage participation, and verify capabilities based on the ways they really work together.
//               </p>
//             </div>

//             {/* Vertical Process Flow */}
//             <div className="relative">
//               {/* Central connecting line */}
//               <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 transform bg-gradient-to-b from-primary via-success to-secondary"></div>

//               {/* Process flow items */}
//               <div className="space-y-8 lg:space-y-12">
//                 {/* Purpose - Slides in from left */}
//                 <div className="relative animate-[slideInLeft_1s_ease-out_0.2s_both]">
//                   <div className="flex flex-col items-center justify-between lg:flex-row">
//                     <div className="w-full pr-0 lg:w-5/12 lg:pr-8">
//                       <div className="group relative">
//                         <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
//                         <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl">
//                           <div className="mb-4 flex items-center gap-4">
//                             <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80 text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/25">
//                               <Target className="h-8 w-8" />
//                             </div>
//                             <div>
//                               <h3 className="mb-2 text-2xl font-bold text-foreground">
//                                 Purpose
//                               </h3>
//                               <div className="h-0.5 w-16 bg-primary"></div>
//                             </div>
//                           </div>
//                           <p className="mb-3 text-base font-semibold text-primary">
//                             Do we trust that our work matters?
//                           </p>
//                           <p className="text-base leading-relaxed text-muted-foreground">
//                             Infrastructure for projects to define their mission,
//                             manage treasuries, and create
//                             <strong className="text-foreground">
//                               {" "}
//                               transparent governance structures
//                             </strong>{" "}
//                             that ensure meaningful work.
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Central node */}
//                     <div className="relative z-10 hidden lg:block">
//                       <div className="h-8 w-8 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/50"></div>
//                       <div className="absolute -inset-2 animate-pulse rounded-full bg-primary/20"></div>
//                     </div>

//                     <div className="hidden w-5/12 pl-8 lg:block">
//                       <div className="text-right">
//                         <div className="text-6xl font-bold text-primary/40">
//                           01
//                         </div>
//                         <div className="mt-2 text-muted-foreground">Foundation</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Participation - Slides in from right */}
//                 <div className="relative animate-[slideInRight_1s_ease-out_0.4s_both]">
//                   <div className="flex flex-col items-center justify-between lg:flex-row">
//                     <div className="hidden w-5/12 pr-8 lg:block">
//                       <div className="text-left">
//                         <div className="text-6xl font-bold text-success/40">
//                           02
//                         </div>
//                         <div className="mt-2 text-muted-foreground">Connection</div>
//                       </div>
//                     </div>

//                     {/* Central node */}
//                     <div className="relative z-10 hidden lg:block">
//                       <div className="h-8 w-8 rounded-full border-4 border-background bg-success shadow-lg shadow-success/50"></div>
//                       <div className="absolute -inset-2 animate-pulse rounded-full bg-success/20"></div>
//                     </div>

//                     <div className="w-full pl-0 lg:w-5/12 lg:pl-8">
//                       <div className="group relative">
//                         <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-success/20 to-success/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
//                         <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl">
//                           <div className="mb-4 flex items-center gap-4">
//                             <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br from-success to-success/80 text-2xl font-bold text-success-foreground shadow-lg shadow-success/25">
//                               <Users className="h-8 w-8" />
//                             </div>
//                             <div>
//                               <h3 className="mb-2 text-2xl font-bold text-foreground">
//                                 Participation
//                               </h3>
//                               <div className="h-0.5 w-16 bg-success"></div>
//                             </div>
//                           </div>
//                           <p className="mb-3 text-base font-semibold text-success">
//                             Do we trust the people we are working with?
//                           </p>
//                           <p className="text-base leading-relaxed text-muted-foreground">
//                             Credentials and rewards systems that enable
//                             contributor onboarding,
//                             <strong className="text-foreground">
//                               {" "}
//                               role-based access control
//                             </strong>
//                             , and recognition of valuable contributions.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Proof - Slides in from left */}
//                 <div className="relative animate-[slideInLeft_1s_ease-out_0.6s_both]">
//                   <div className="flex flex-col items-center justify-between lg:flex-row">
//                     <div className="w-full pr-0 lg:w-5/12 lg:pr-8">
//                       <div className="group relative">
//                         <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-secondary/20 to-secondary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
//                         <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl">
//                           <div className="mb-4 flex items-center gap-4">
//                             <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br from-secondary to-secondary/80 text-2xl font-bold text-secondary-foreground shadow-lg shadow-secondary/25">
//                               <CheckCircle className="h-8 w-8" />
//                             </div>
//                             <div>
//                               <h3 className="mb-2 text-2xl font-bold text-foreground">
//                                 Proof
//                               </h3>
//                               <div className="h-0.5 w-16 bg-secondary"></div>
//                             </div>
//                           </div>
//                           <p className="mb-3 text-base font-semibold text-secondary">
//                             Do people have the qualifications they say they do?
//                           </p>
//                           <p className="text-base leading-relaxed text-muted-foreground">
//                             Verify capabilities with portable, verifiable credentials.
//                             Discovery and connection tools enable
//                             <strong className="text-foreground">
//                               {" "}
//                               global opportunities through local participation
//                             </strong>
//                             .
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Central node */}
//                     <div className="relative z-10 hidden lg:block">
//                       <div className="h-8 w-8 rounded-full border-4 border-background bg-secondary shadow-lg shadow-secondary/50"></div>
//                       <div className="absolute -inset-2 animate-pulse rounded-full bg-secondary/20"></div>
//                     </div>

//                     <div className="hidden w-5/12 pl-8 lg:block">
//                       <div className="text-right">
//                         <div className="text-6xl font-bold text-secondary/40">
//                           03
//                         </div>
//                         <div className="mt-2 text-muted-foreground">
//                           Verification
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll down arrow */}
//         <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform lg:flex">
//           <button
//             onClick={() =>
//               document
//                 .getElementById("how-it-works")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//             className="group flex flex-col items-center text-muted-foreground transition-colors duration-300 hover:text-primary"
//           >
//             <div className="mb-2 text-xs font-medium uppercase tracking-widest">
//               Next
//             </div>
//             <div className="h-8 w-px bg-border transition-colors duration-300 group-hover:bg-primary/40"></div>
//             <svg
//               className="mt-2 h-4 w-4 animate-[throb_2s_ease-in-out_infinite]"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 14l-7 7m0 0l-7-7m7 7V3"
//               />
//             </svg>
//           </button>
//         </div>
//       </section>