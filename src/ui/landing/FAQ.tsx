export function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-6 py-20">
      <h1 className="mb-10 text-4xl font-bold text-gray-900">
        Frequently Asked Questions
      </h1>
      <ul className="max-w-4xl space-y-6 text-lg text-gray-700">
        <li>
          <h3 className="font-semibold">
            Can I enroll in more than one course at a time?
          </h3>
          <p className="mt-2">
            Yes, you can browse and enroll in any public course on Andamio.
          </p>
        </li>
        <li>
          <h3 className="font-semibold">What network does Andamio use?</h3>
          <p className="mt-2">
            Preprod for now, but check out our roadmap for information on our
            mainnet launch.
          </p>
        </li>
        <li>
          <h3 className="font-semibold">How do I learn to use Andamio?</h3>
          <p className="mt-2">
            Be sure to check out our Andamio 101 course to master the use of our
            platform.
          </p>
        </li>
        <li>
          <h3 className="font-semibold">How do I become a course creator?</h3>
          <p className="mt-2">
            Right now, the best way to become a course creator is to click on
            the 'Get in Touch' button or write to us at hello@andamio.io.
          </p>
        </li>
        <li>
          <h3 className="font-semibold">How do I get in touch?</h3>
          <p className="mt-2">
            Follow us on X (@AndamioPlatform) or write to hello@andamio.io.
          </p>
        </li>
      </ul>
    </div>
  );
}
