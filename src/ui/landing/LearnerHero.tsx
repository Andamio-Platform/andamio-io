import Link from "next/link";
import { Button } from "~/components/ui/button";

export function LearnerHero() {
  return (
    <div className="flex h-[80vh] w-screen flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-center text-9xl font-extrabold text-black">
        Learn to Work
      </h1>
      <h3 className="m-20 scroll-m-20 text-center text-2xl text-black">
        Like you, we are frustrated with outdated systems that prevent us from
        solving important problems and doing meaningful work.
      </h3>
      <div className="flex space-x-4">
        <Link href="/get-started">
          <Button className="w-[350px] bg-black py-6 text-2xl font-extrabold text-white">
            GET STARTED
          </Button>
        </Link>
        <Link href="/courses">
          <Button className="w-[350px] border-2 border-solid border-black bg-white py-6 text-2xl font-extrabold text-black">
            EXPLORE COURSES
          </Button>
        </Link>
      </div>
    </div>
  );
}
