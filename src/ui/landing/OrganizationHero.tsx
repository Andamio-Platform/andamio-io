import { Button } from "~/components/ui/button";

export function OrganizationHero() {
  return (
    <div className="relative z-20 flex h-[70vh] w-screen flex-col items-center justify-center md:h-[80vh]">
      <h1 className="scroll-m-20 text-center text-5xl font-extrabold text-black md:text-4xl lg:text-9xl">
        Build Organizations that Work
      </h1>
      <h3 className="mx-5 my-10 scroll-m-20 text-center text-lg text-black md:m-20 lg:text-2xl">
        It takes too much time, effort and money to build communities of
        collaborators that know and understand the problems you are trying to
        solve and have the right skills to help you solve them.
      </h3>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button size="heroBlack">GET IN TOUCH</Button>
        <Button size="heroWhite">HOW IT WORKS</Button>
      </div>
    </div>
  );
}
