import MenuBar from "../landing/MenuBar";
import AboutUser from "./AboutUser";
import SectionStartLearning from "./SectionStartLearning";
import SectionStudio from "./SectionStudio";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Footer from "../landing/Footer";

export default function PageHome() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <>
      <MenuBar />

      <SectionStudio />

      <AboutUser />

      <SectionStartLearning />

      <Footer />
    </>
  );
}
