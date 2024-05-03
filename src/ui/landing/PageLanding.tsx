import { useEffect } from "react";
import { useTheme } from "next-themes";

import MenuBar from "./MenuBar";
import Hero from "./Hero";
import LogoCloud from "./LogoCloud";
import Features from "./Features";
import FeaturedCourses from "./FeaturedCourses";
import Testimonial from "./Testimonial";
import Pricing from "./Pricing";
import FAQs from "./FAQs";
import CTA from "./CTA";
import Footer from "./Footer";

export default function PageLanding() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="bg-white">
      <MenuBar />

      <main className="isolate mb-24">
        <Hero />

        {/* Todo: collect logos from partner organizations */}
        {/* <LogoCloud /> */}

        <FeaturedCourses />

        <Features />

        {/* <Testimonial /> */}

        {/* <Pricing /> */}

        {/* Todo */}
        {/* <FAQs /> */}

        {/* Todo */}
        {/* <CTA /> */}
      </main>

      {/* <Footer /> */}
    </div>
  );
}
