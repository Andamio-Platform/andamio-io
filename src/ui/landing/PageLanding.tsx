import { useEffect } from "react";
import { useTheme } from "next-themes";

import MenuBar from "./MenuBar";
import Hero from "./Hero";
import LogoCloud from "./LogoCloud";
import Features from "./Features";
import FeaturedCourses from "./FeaturedCourses";
import Footer from "./Footer";

export default function PageLanding() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="bg-white">
      <MenuBar />

      <main className="isolate">
        <Hero />

        {/* Todo: collect logos from partner organizations */}
        <LogoCloud />

        <FeaturedCourses />

        <Features />

        {/* <Testimonial /> */}

        {/* <Pricing /> */}

        {/* Todo */}
        {/* <FAQs /> */}

        {/* Todo */}
        {/* <CTA /> */}

        <Footer />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
