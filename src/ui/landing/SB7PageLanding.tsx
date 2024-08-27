import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

export default function SB7PageLanding() {
  const [role, setRole] = useState<"learner" | "organization">("learner");
  return (
    <div className="bg-white">
      <NavBar setRole={setRole} />
      {role === "learner" ? <LearnerHero /> : <OrganizationHero />}
      <WhyAndamio />
      <HowAndamioWorks />
      <FAQ />
    </div>
  );
}

export function NavBar({
  setRole,
}: {
  setRole: Dispatch<SetStateAction<"learner" | "organization">>;
}) {
  return (
    <NavigationMenu className="p-5">
      <NavigationMenuList className="flex w-screen items-center justify-between">
        <div className="ml-20">
          <NavigationMenuItem>
            <Image
              width={800}
              height={800}
              className="h-20 w-auto"
              src="/andamio-logo-w-typography.jpg"
              alt="Andamio"
            />
          </NavigationMenuItem>
          <div className="mt-2 flex space-x-4">
            <NavigationMenuItem
              onClick={() => {
                setRole("learner");
              }}
            >
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border-2 border-solid border-black bg-white`}
              >
                I&apos;m a&nbsp;
                <text className="font-extrabold">learner</text>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem
              onClick={() => {
                setRole("organization");
              }}
            >
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border-2 border-solid border-black bg-white`}
              >
                I&apos;m an&nbsp;
                <text className="font-extrabold">organization</text>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </div>
        <div className="flex space-x-4 pr-20">
          <NavigationMenuItem>
            <Link href="#why-andamio" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border-2 border-solid border-black bg-white`}
              >
                Why&nbsp;<text className="font-extrabold">ANDAMIO</text>?
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border-2 border-solid border-black bg-white`}
              >
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border-2 border-solid border-black bg-white`}
              >
                Roadmap
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-black`}
              >
                <text className="font-extrabold text-white">GET IN TOUCH</text>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function LearnerHero() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-center text-9xl font-extrabold text-black">
        Learn To Work
      </h1>
      <h3 className="m-20 scroll-m-20 text-center text-2xl text-black">
        Like you, we are frustrated with outdated systems that prevent us from
        solving important problems and doing meaningful work.
      </h3>
      <div className="flex space-x-4">
        <Button className="bg-black px-20 py-6 text-2xl font-extrabold text-white">
          GET STARTED
        </Button>
        <Button className="border-2 border-solid border-black bg-white px-20 py-6 text-2xl font-extrabold text-black">
          ENROLL
        </Button>
      </div>
    </div>
  );
}

export function OrganizationHero() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="scroll-m-20 text-center text-8xl font-extrabold text-black">
        Build communities that work
      </h1>
      <h3 className="m-20 scroll-m-20 text-center text-2xl text-black">
        It takes too much time, effort and money to build communities of
        collaborators that know and understand the problems you are trying to
        solve and have the right skills to help you solve them.
      </h3>
      <div className="flex space-x-4">
        <Button className="bg-black px-20 py-6 text-2xl font-extrabold text-white">
          GET IN TOUCH
        </Button>
        <Button className="border-2 border-solid border-black bg-white px-20 py-6 text-2xl font-extrabold text-black">
          HOW IT WORKS
        </Button>
      </div>
    </div>
  );
}

export function WhyAndamio() {
  return (
    <div
      id="why-andamio"
      className="flex h-screen w-screen flex-col items-center justify-center"
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
                src="/images/site/view-3d-man-holding-coffee-cup-showing-thumbs-up.png"
                alt="ceo-joe"
              />
              <text className="mt-2 justify-center font-bold">CEO Joe</text>
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

export function HowAndamioWorks() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-row">
        <h1 className="mt-7 scroll-m-20 text-8xl font-semibold text-black">
          How&nbsp;
        </h1>
        <Image
          width={600}
          height={600}
          className="h-40 w-auto"
          src="/andamio-logo-w-typography.jpg"
          alt="Andamio"
        />
        <h1 className="mt-7 scroll-m-20 text-8xl font-semibold text-black">
          works
        </h1>
      </div>
      {/* <div className="flex h-1/5 w-screen flex-row text-xl text-black">
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
        <h1 className="scroll-m-20 text-8xl font-semibold tracking-tight">1</h1>
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
        <h1 className="scroll-m-20 text-8xl font-semibold tracking-tight">2</h1>
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
          <h1 className="scroll-m-20 text-8xl font-semibold tracking-tight">3</h1>
        </div>
      </div> */}
      <div className="flex h-1/4 w-screen flex-row text-xl text-black">
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/view-3d-man-holding-coffee-cup-showing-thumbs-up.png"
            alt="ceo-joe"
          />
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/view-3d-businessman.png"
            alt="skilled-pete"
          />
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
          <Image
            width={600}
            height={600}
            className="h-10 w-auto"
            src="/images/site/coin.png"
            alt="coin"
          />
        </div>
      </div>
      <div className="flex h-1/3 w-screen flex-row text-xl text-black">
        <div className="flex h-full w-1/3 flex-col items-center justify-start px-20">
          <text className="justify-center font-bold my-5">Meet CEO Joe</text>
          Joe needs to get some work done and is looking for a skilled
          contributor. So he creates a course on Andamio to teach the skills
          needed to get the job done.
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-start px-20">
          <text className="justify-center font-bold my-5">Meet Skilled Pete</text>
          Pete is excited about the opportunity and takes Joe's course on
          Andamio and earns a skill
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-start px-20">
          <text className="justify-center font-bold my-5">Pete gets paid</text>
          Pete does the job and gets paid. Pete learns a new skill and the
          process repeats
          <h1 className="mt-10 font-bold text-red-400">COMING SOON</h1>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <div className="flex h-screen w-screen flex-col items-start justify-center px-40">
      <h1 className="scroll-m-20 text-7xl font-bold text-black">FAQ</h1>
      <ul className="mt-20 space-y-2 text-2xl text-black">
        <li className="font-bold">
          Can I enroll in more than one course at a time?
        </li>
        <li>
          Yes, fell free to browse and enroll in any of the available courses
        </li>
        <li className="font-bold">What network does Andamio use?</li>
        <li>
          Preprod for now, but check out our roadmap for information on our
          mainnet launch
        </li>
        <li className="font-bold">How do I learn to use Andamio?</li>
        <li>
          Be sure to check out our Andamio 101 course to master the use of our
          platform
        </li>
        <li className="font-bold">How do I become a course creator?</li>
        <li>
          Right now, the best way to become a course creator is to click on the
          'Get in touch' button or write to us at hello@andamio.is
        </li>
        <li className="font-bold">How do I get in touch?</li>
        <li>
          Fell free to follow us on X (@AndamioPlatform) or write to
          hello@andamio.io
        </li>
      </ul>
    </div>
  );
}
