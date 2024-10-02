import Link from "next/link";
import { Button } from "~/components/ui/button";

export function LearnerHero() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <h1 className="text-center text-6xl font-extrabold text-black">
        Learn to Work
      </h1>
      <p className="mt-6 text-center text-2xl text-gray-700">
        Like you, we are frustrated with outdated systems that prevent us from
        solving important problems and doing meaningful work.
      </p>
      <div className="mt-10 flex space-x-4">
        <Button className="bg-black px-12 py-6 text-2xl font-extrabold text-white">
          GET STARTED
        </Button>
        <Button className="border-2 border-black bg-white px-12 py-6 text-2xl font-extrabold text-black">
          EXPLORE COURSES
        </Button>
      </div>
    </div>
  );
}
