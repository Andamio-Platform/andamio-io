import Image from "next/image";

export function HowAndamioWorks() {
  return (
    <div className="z-20 flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex min-h-40 w-full flex-row items-center justify-center">
        <h1 className="my-12 scroll-m-20 text-3xl font-semibold text-black md:mb-0 md:mt-7 md:text-8xl">
          How&nbsp;
        </h1>
        <Image
          width={600}
          height={600}
          className="h-10 w-auto md:h-40"
          src="/andamio-logo-w-typography.jpg"
          alt="Andamio"
        />
        <h1 className="scroll-m-20 text-3xl font-semibold text-black md:mt-7 md:text-8xl">
          works
        </h1>
      </div>
      <div className="flex h-1/5 w-screen flex-col text-black md:flex-row md:text-xl">
        <div className="flex h-full w-full flex-col items-center justify-end md:w-1/3">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/step_1.png"
            alt="step-1"
          />
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/view-cool-3d-woman-posing.png"
            alt="ceo-sarah"
          />
          <div className="flex h-full w-full flex-col items-center justify-start px-20">
            <text className="my-5 justify-center font-bold">
              Meet CEO Sarah
            </text>
            Sarah needs to get some work done and is looking for a skilled
            contributor. So she creates a course on Andamio to teach the skills
            needed to get the job done.
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-end md:w-1/3">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/step_2.png"
            alt="step-2"
          />
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/view-3d-businessman.png"
            alt="skilled-pete"
          />
          <div className="flex h-full w-full flex-col items-center justify-start px-20">
            <text className="my-5 justify-center font-bold">
              Meet Skilled Pete
            </text>
            Pete is excited about the opportunity and takes Sarah&apos;s course
            on Andamio and earns a skill
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-end md:w-1/3">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/step_3.png"
            alt="step-3"
          />
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/coins.png"
            alt="coin"
          />
          <div className="flex h-full w-full flex-col items-center justify-start px-20">
            <text className="my-5 justify-center font-bold">
              Pete gets paid
            </text>
            Pete does the job and gets paid. Pete learns a new skill and the
            process repeats
            <h1 className="mt-10 hidden font-bold text-red-400 md:block">
              COMING SOON
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
