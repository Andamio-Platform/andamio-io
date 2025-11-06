import React, { useEffect, useRef } from "react";
import Step from "./Step";

interface HowItWorksSectionProps {
  activeStep: number;
  setActiveStep: (step: number | ((prev: number) => number)) => void;
}

const steps = [
  {
    stepNumber: 1,
    title: "Create a Project",
    description:
      "Think of it like posting gigs appropriate for a contributor. Not a full job opening—just tasks, bounties, challenges.",
    imageSrc: "/steps/001.png",
    imageAlt: "Create a Project - Project creation interface",
    colorScheme: "primary" as const,
    layout: "left" as const,
  },
  {
    stepNumber: 2,
    title: "Define Prerequisites",
    description:
      "What does someone need to know to join? For example: 'We need someone who knows TypeScript, understands Cardano architecture, and is familiar with our application stack.'",
    imageSrc: "/steps/002.png",
    imageAlt: "Define Prerequisites - Prerequisites setup interface",
    colorScheme: "success" as const,
    layout: "right" as const,
  },
  {
    stepNumber: 3,
    title: "Contributors Submit Evidence",
    description:
      "Not resumes. Actual tasks defined by the project team. They show what they can do.",
    imageSrc: "/steps/003.png",
    imageAlt: "Contributors Submit Evidence - Assignment submission interface",
    colorScheme: "secondary" as const,
    layout: "left" as const,
  },
  {
    stepNumber: 4,
    title: "Teach What They Don't Know",
    description:
      "You can teach people what they're missing. Share a bit about your platform stack, your processes, your culture. We're doing this to build the Andamio team.",
    imageSrc: "/steps/004.png",
    imageAlt: "Teach What They Don't Know - Team Goals learning module",
    colorScheme: "accent" as const,
    layout: "right" as const,
  },
  {
    stepNumber: 5,
    title: "Approve Assignments",
    description:
      "They complete learning, you approve it. They earn credentials.",
    imageSrc: "/steps/005.png",
    imageAlt: "Approve Assignments - Assignment review and approval interface",
    colorScheme: "secondary" as const,
    layout: "left" as const,
  },
  {
    stepNumber: 6,
    title: "Contribute to Real Tasks with Real Rewards",
    description:
      "Now they can start contributing. Paid bounties. Open tasks. Trial projects. The team practices working together. You see what they can actually do.",
    placeholderIcon: "💰",
    placeholderText: "Task contribution dashboard",
    colorScheme: "accent" as const,
    layout: "right" as const,
  },
];

export default function HowItWorksSection({
  activeStep,
  setActiveStep,
}: HowItWorksSectionProps) {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
  }, [activeStep, setActiveStep]);

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
  }, [activeStep, setActiveStep]);

  // Smooth scroll to active step
  useEffect(() => {
    if (stepsContainerRef.current) {
      stepsContainerRef.current.scrollTo({
        left: activeStep * stepsContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [activeStep]);

  return (
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

        {steps.map((step) => (
          <Step key={step.stepNumber} {...step} />
        ))}
      </div>
    </section>
  );
}
