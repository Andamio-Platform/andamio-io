import MenuBar from "./MenuBar";
import Hero from "./Hero";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function PageLanding() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="">
      <MenuBar />

      <main className="isolate">
        <Hero />
      </main>
    </div>
  );
}
