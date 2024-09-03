import MenuBar from "../landing/MenuBar";
import GetStartedSteps from "./GetStartedSteps";
import SectionStudio from "./SectionStudio";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import SectionWelcome from "./SectionWelcome";

export default function PageHome() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <>
      <MenuBar />
      <div className="flex w-full flex-col">
        <div className="flex min-h-[80vh] items-center justify-center bg-primary text-primary-foreground">
          <SectionWelcome />
        </div>
        <div className="mx-auto flex w-full sm:w-11/12 md:w-2/3 lg:w-1/2">
          <GetStartedSteps />
        </div>
        <div className="mt-24 flex min-h-screen items-center bg-primary text-primary-foreground">
          <SectionStudio />
        </div>
      </div>
    </>
  );
}
