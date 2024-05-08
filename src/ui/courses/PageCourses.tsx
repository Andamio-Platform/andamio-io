import { signIn, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import AllCourses from "./components/AllCourses";
import MenuBar from "../landing/MenuBar";
// import FeaturedCourses from "./components/FeaturedCourses";

export default function PageCourses() {
  const { data: sessionData } = useSession();

  return (
    <>
      <MenuBar />

      <div className="mx-auto max-w-7xl px-6 sm:mt-48 lg:px-8 min-h-[50vh]">
        <div className="mx-auto lg:mx-0">
          <h1 className="my-[78px] text-[3rem] font-bold leading-[5rem]">
            Andamio Course List
          </h1>
          {/* <FeaturedCourses /> */}
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
              ? `Connected to Andamio as ${sessionData.user.name}`
              : "You are not logged in. Browse courses for free. When you are ready, connect to the Andamio Network."}
          </p>
        </div>
        <AllCourses />
      </div>
    </>
  );
}
