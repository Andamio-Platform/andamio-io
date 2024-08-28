import { Button } from "~/components/ui/button";

export function OrganizationHero() {
  return (
    <div className="flex h-[80vh] w-screen flex-col items-center justify-center">
      <h1 className="mx-auto w-2/3 scroll-m-20 text-center text-9xl font-extrabold text-black">
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
