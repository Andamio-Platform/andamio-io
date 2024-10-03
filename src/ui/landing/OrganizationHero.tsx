import Link from "next/link";
import { Button } from "~/components/ui/button";

export function OrganizationHero() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4">
      <h1 className="text-center text-6xl font-extrabold text-black">
        Build Organizations that Work
      </h1>
      <p className="mt-6 text-center text-2xl text-gray-700">
        It takes too much time, effort, and money to build communities of
        collaborators who understand your problems and have the right skills to
        help you solve them.
      </p>
      <div className="mt-10 flex space-x-4">
        <Button className="bg-black px-12 py-6 text-2xl font-extrabold text-white">
          GET IN TOUCH
        </Button>
        <Button className="border-2 border-black bg-white px-12 py-6 text-2xl font-extrabold text-black">
          HOW IT WORKS
        </Button>
      </div>
    </div>
  );
}
