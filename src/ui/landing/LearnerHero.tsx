import Link from "next/link";
import { Button } from "~/components/ui/button";

export function LearnerHero() {
  return (
    <div className="relative z-20 flex h-[70vh] w-screen flex-col items-center justify-center md:h-[80vh]">
      <h1 className="scroll-m-20 text-center text-6xl font-extrabold text-black md:text-4xl lg:text-9xl">
        Learn to Work
      </h1>
      <h3 className="mx-5 my-10 scroll-m-20 text-center text-lg text-black md:m-20 lg:text-2xl">
        Like you, we are frustrated with outdated systems that prevent us from
        solving important problems and doing meaningful work.
      </h3>
      <div className="flex flex-col gap-4 md:flex-row">
        <Link href="/get-started">
          <Button size="heroBlack">GET STARTED</Button>
        </Link>
        <Link href="/courses">
          <Button size="heroWhite">EXPLORE COURSES</Button>
        </Link>
      </div>
    </div>
  );
}
