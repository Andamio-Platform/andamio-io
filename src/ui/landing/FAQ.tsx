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
          &apos;Get in touch&apos; button or write to us at hello@andamio.is
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
