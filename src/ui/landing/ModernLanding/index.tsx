import React, { useState, useEffect, useRef } from "react";
import AngularGridOverlay from "./AngularGridOverlay";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import RiskFreeSection from "./RiskFreeSection";
import ProtocolSection from "./ProtocolSection";
import CardanoSection from "./CardanoSection";
import CTASection from "./CTASection";

export default function ModernLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      <AngularGridOverlay />
      <Navigation />
      <HeroSection />
      <HowItWorksSection
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <RiskFreeSection />
      <ProtocolSection />
      <CardanoSection />
      <CTASection />
    </div>
  );
}
