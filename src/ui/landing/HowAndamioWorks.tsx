import Image from "next/image";

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
      <div className="flex h-1/5 w-screen flex-row text-xl text-black">
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/1.png"
            alt="ceo-joe"
          />
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/2.png"
            alt="ceo-joe"
          />
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-end">
          <Image
            width={600}
            height={600}
            className="h-40 w-auto"
            src="/images/site/3.png"
            alt="ceo-joe"
          />
        </div>
      </div>
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
            className="h-40 w-auto"
            src="/images/site/coins.png"
            alt="coin"
          />
        </div>
      </div>
      <div className="flex h-1/3 w-screen flex-row text-xl text-black">
        <div className="flex h-full w-1/3 flex-col items-center justify-start px-20">
          <text className="my-5 justify-center font-bold">Meet CEO Joe</text>
          Joe needs to get some work done and is looking for a skilled
          contributor. So he creates a course on Andamio to teach the skills
          needed to get the job done.
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-start px-20">
          <text className="my-5 justify-center font-bold">
            Meet Skilled Pete
          </text>
          Pete is excited about the opportunity and takes Joe&apos;s course on
          Andamio and earns a skill
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-start px-20">
          <text className="my-5 justify-center font-bold">Pete gets paid</text>
          Pete does the job and gets paid. Pete learns a new skill and the
          process repeats
          <h1 className="mt-10 font-bold text-red-400">COMING SOON</h1>
        </div>
      </div>
    </div>
  );
}
