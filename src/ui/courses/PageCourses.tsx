import { signIn, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import AllCourses from "./components/AllCourses";
import FeaturedCourses from "./components/FeaturedCourses";

export default function PageCourses() {
  const { data: sessionData } = useSession();

  return (
    <div className="mx-auto max-w-2xl py-24  lg:max-w-7xl">
      <div className="mx-auto lg:mx-0">
        <h1 className="text-[4rem] font-bold leading-[5rem]">
          Andamio Course Listing
        </h1>
        <FeaturedCourses />
        {!sessionData && (
          <div className="flex basis-1/3 flex-col gap-4">
            <div className="grow">
              <Button
                onClick={() => {
                  void signIn(undefined, {
                    callbackUrl: `/courses`,
                  });
                }}
              >
                Connect to Andamio
              </Button>
            </div>
          </div>
        )}
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {sessionData
            ? "You are logged in. Now you can view all courses."
            : "You are not logged in. Browse courses for free. When you are ready, connect to the Andamio Network."}
        </p>
      </div>
      <AllCourses />
    </div>
  );
}