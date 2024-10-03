import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function WhyAndamio() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4">
      <h2 className="text-center text-5xl font-bold text-black">
        Why Andamio?
      </h2>
      <p className="mt-4 max-w-3xl text-center text-lg text-gray-600">
        Andamio helps individuals acquire the skills they need to access
        meaningful work while enabling organizations to find skilled
        contributors more efficiently.
      </p>
      <div className="mt-10 flex space-x-6">
        <Button className="bg-black px-10 py-6 text-xl font-bold text-white">
          Learn More
        </Button>
        <Button className="border-2 border-black bg-white px-10 py-6 text-xl font-bold text-black">
          Get in Touch
        </Button>
      </div>
    </div>
  );
}
