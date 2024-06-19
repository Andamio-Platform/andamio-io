import MenuBar from "../landing/MenuBar";
import AboutUser from "./AboutUser";
import SectionStudio from "./SectionStudio";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Footer from "../landing/Footer";
import AllCourses from "../courses/components/AllCourses";
import SectionWelcome from "./SectionWelcome";

export default function PageHome() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <>
      <MenuBar />
      <SectionWelcome />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AllCourses />
      </div>
      <SectionStudio />
      <AboutUser />

      <Footer />
    </>
  );
}
