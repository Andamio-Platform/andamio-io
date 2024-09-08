import Image from "next/image";
import { Button } from "~/components/ui/button";

export function WhyAndamio() {
  return (
    <div
      id="why-andamio"
      className="z-20 flex min-h-screen w-screen flex-col items-center justify-center"
    >
      <div className="mx-auto flex w-full flex-row items-center justify-center">
        <h1 className="my-12 scroll-m-20 text-4xl font-semibold text-black md:mb-0 md:mt-7 md:text-8xl">
          Why&nbsp;
        </h1>
        <Image
          width={600}
          height={600}
          className="h-10 w-auto md:h-40"
          src="/andamio-logo-w-typography.jpg"
          alt="Andamio"
        />
        <h1 className="scroll-m-20 text-4xl font-semibold text-black md:mt-7 md:text-8xl">
          ?
        </h1>
      </div>
      <div className="min-h-4/6 flex w-screen flex-col gap-10 text-black md:flex-row md:gap-0 md:text-xl">
        <div className="flex h-full w-full flex-col items-center justify-center p-2 md:w-1/2 md:p-12 lg:p-52">
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
        </div>
        <div className="flex w-full flex-col items-center justify-center p-2 md:h-full md:w-1/2 md:p-12 lg:p-52">
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
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4 md:mt-0 md:flex-row">
        <Button size="heroBlack">GET IN TOUCH</Button>
        <Button size="heroWhite">HOW IT WORKS</Button>
        <Button size="heroWhite">GET STARTED</Button>
      </div>
    </div>
  );
}
