export function FAQ() {
  return (
    <div className="z-20 flex min-h-screen w-screen flex-col items-start justify-center px-2 md:px-40">
      <h1 className="scroll-m-20 text-2xl font-bold text-black md:text-7xl">
        FAQ
      </h1>
      <ul className="mt-5 space-y-2 text-black md:mt-20 md:text-2xl">
        <li className="font-bold">
          Can I enroll in more than one course at a time?
        </li>
        <li className="pb-2 md:pb-10">
          Yes, you can browse and enroll in any public course on Andamio.
        </li>
        <li className="font-bold">What network does Andamio use?</li>
        <li className="pb-2 md:pb-10">
          Preprod for now, but check out our roadmap for information on our
          mainnet launch.
        </li>
        <li className="font-bold">How do I learn to use Andamio?</li>
        <li className="pb-2 md:pb-10">
          Be sure to check out our Andamio 101 course to master the use of our
          platform.
        </li>
        <li className="font-bold">How do I become a course creator?</li>
        <li className="pb-2 md:pb-10">
          Right now, the best way to become a course creator is to click on the
          &apos;Get in touch&apos; button or write to us at hello@andamio.io
        </li>
        <li className="font-bold">How do I get in touch?</li>
        <li className="pb-2 md:pb-10">
          Follow us on X (@AndamioPlatform) or write to hello@andamio.io
        </li>
      </ul>
    </div>
  );
}
