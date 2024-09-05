import Image from "next/image";
import { Button } from "~/components/ui/button";

export function WhyAndamio() {
  return (
    <div
      id="why-andamio"
      className="z-20 flex h-screen w-screen flex-col items-center justify-center"
    >
      <div className="flex flex-row">
        <h1 className="mt-7 scroll-m-20 text-8xl font-semibold text-black">
          Why&nbsp;
        </h1>
        <Image
          width={600}
          height={600}
          className="h-40 w-auto"
          src="/andamio-logo-w-typography.jpg"
          alt="Andamio"
        />
        <h1 className="mt-7 scroll-m-20 text-8xl font-semibold text-black">
          ?
        </h1>
      </div>
      <div className="flex h-4/6 w-screen flex-row text-xl text-black">
        <div className="flex h-full w-1/2 flex-col items-center justify-center p-52">
          Are you tired of spending time and money on inefficient hiring and
          recruitment tools and never finding the right talent for your
          organization?
          <div className="my-4 flex flex-row items-center justify-end">
            <div className="flex flex-col items-center justify-center">
              <Image
                width={600}
                height={600}
                className="h-40 w-auto"
                src="/images/site/view-cool-3d-woman-posing.png"
                alt="ceo-sarah"
              />
              <text className="mt-2 justify-center font-bold">CEO Sarah</text>
            </div>
            <ul className="list-inside list-disc">
              <li>Find great talent</li>
              <li>Engage your contributors</li>
              <li>Build communities</li>
              <li>Create opportunities</li>
            </ul>
          </div>
          When you use Andamio you create opportunities for talented
          contributors to earn the skills they need to help you solve your
          problems.
          <div className="mt-10 flex space-x-4">
            <Button className="bg-black px-10 py-4 text-xl font-bold text-white">
              GET IN TOUCH
            </Button>
            <Button className=" border-2 border-solid border-black bg-white px-10 py-4 text-xl font-bold text-black">
              HOW IT WORKS
            </Button>
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center p-52">
          Are you tired of spending time and money on courses and certificates
          that never lead to real work opportunities?
          <div className="my-4 flex flex-row items-center justify-end">
            <div className="flex flex-col items-center justify-center">
              <Image
                width={600}
                height={600}
                className="h-40 w-auto"
                src="/images/site/view-3d-businessman.png"
                alt="skilled-pete"
              />
              <text className="mt-4 justify-center font-bold">
                Skilled Pete
              </text>
            </div>
            <ul className="list-inside list-disc">
              <li>Earn skills</li>
              <li>Access paid work opportunities</li>
              <li>Create verifiable credentials</li>
            </ul>
          </div>
          With Andamio, you earn sills and create credentials that open the door
          to actual work opportunities.
          <div className="mt-10 flex space-x-4">
            <Button className="border-2 border-solid border-black bg-white  px-10 py-4 text-xl font-bold text-black">
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
