import MenuBar from "../landing/MenuBar";
import AboutUser from "./AboutUser";
import SectionStudio from "./SectionStudio";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Footer from "../landing/Footer";
import SectionWelcome from "./SectionWelcome";

export default function PageHome() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <>
      <MenuBar />
      <div className="mt-[80px] grid grid-cols-1 md:grid-cols-2">
        <div className="min-h-screen bg-primary pt-12 text-primary-foreground md:pt-32">
          <SectionWelcome />
          <SectionStudio />
        </div>
        <AboutUser />
      </div>

      <Footer />
    </>
  );
}
