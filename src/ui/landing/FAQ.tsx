import React from "react";

export function FAQ() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="mb-8 text-center text-4xl font-black uppercase text-primary sm:text-5xl md:text-6xl">
          Frequently Asked Questions
        </h1>

        {/* FAQ List */}
        <ul className="space-y-8 text-left">
          {/* Question 1 */}
          <li>
            <h3 className="text-xl font-bold text-primary md:text-2xl">
              Can I enroll in more than one course at a time?
            </h3>
            <p className="text-md mt-2 font-light text-foreground md:text-lg">
              Yes, you can browse and enroll in any public course on Andamio.
            </p>
          </li>

          {/* Question 2 */}
          <li>
            <h3 className="text-xl font-bold text-primary md:text-2xl">
              What network does Andamio use?
            </h3>
            <p className="text-md mt-2 font-light text-foreground md:text-lg">
              Preprod for now, but check out our roadmap for information on our
              mainnet launch.
            </p>
          </li>

          {/* Question 3 */}
          <li>
            <h3 className="text-xl font-bold text-primary md:text-2xl">
              How do I learn to use Andamio?
            </h3>
            <p className="text-md mt-2 font-light text-foreground md:text-lg">
              Be sure to check out our Andamio 101 course to master the use of
              our platform.
            </p>
          </li>

          {/* Question 4 */}
          <li>
            <h3 className="text-xl font-bold text-primary md:text-2xl">
              How do I become a course creator?
            </h3>
            <p className="text-md mt-2 font-light text-foreground md:text-lg">
              Right now, the best way to become a course creator is to click on
              the &quot;Get in touch&quot; button or write to us at
              hello@andamio.io.
            </p>
          </li>

          {/* Question 5 */}
          <li>
            <h3 className="text-xl font-bold text-primary md:text-2xl">
              How do I get in touch?
            </h3>
            <p className="text-md mt-2 font-light text-foreground md:text-lg">
              Follow us on X (@AndamioPlatform) or write to hello@andamio.io.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
