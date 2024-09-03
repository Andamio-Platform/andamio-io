import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import DashboardDataComponent from "./DashboardDataComponent";
import AccessTokenComponent from "./AccessTokenComponent";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function DashboardHomeComponent() {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { creatorCoursePolicies } = useCreatorsCoursesPolicies(
    accessTokenAlias ?? "",
  );
  return (
    <div>
      <div className="mx-auto grid w-11/12 grid-cols-4">
        <div className="col-span-3 mx-auto my-5 flex min-h-[40vh] w-11/12 flex-col">
          <h2 className="my-5 font-beckman text-4xl">Your Next Steps:</h2>
          {!connected && (
            <div>
              <p className="my-3 text-lg font-bold">
                Connect a Preprod Wallet:
              </p>
              <CardanoWallet />
            </div>
          )}
          {connected && !accessTokenAlias && <AccessTokenComponent />}
          {!!accessTokenAlias &&
            !!globalStateDatum &&
            globalStateDatum.TokenInfos.length == 0 && (
              <div>
                <p className="my-3 text-lg font-bold">Start Learning!</p>
                <p className="mb-2">
                  Explore Andamio course list and try enrolling in one.
                </p>
                <Link href="/courses">
                  <Button>View Courses</Button>
                </Link>
              </div>
            )}
          {!!globalStateDatum && globalStateDatum.TokenInfos.length > 0 && (
            <div>
              <p className="my-3 text-lg font-bold">Keep Learning</p>
              <p>
                You are enrolled in {globalStateDatum.TokenInfos.length}{" "}
                courses. Select{" "}
                <Link href="/dashboard/learner">
                  <span className="font-beckman">LEARNER</span>
                </Link>{" "}
                to view course status.
              </p>
            </div>
          )}
          {!!creatorCoursePolicies && creatorCoursePolicies.length > 0 && (
            <div>
              <p className="my-3 text-lg font-bold">Build your course(s)</p>
              <p>
                You are the creator of {creatorCoursePolicies.length}. Select{" "}
                <span className="font-beckman">CREATORS</span> manage courses.
              </p>
            </div>
          )}
        </div>
        {globalStateDatum && (
          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-y-10">
              <DashboardDataComponent
                title="Courses Enrolled"
                data={globalStateDatum?.TokenInfos.length.toString() ?? ""}
              />
              <DashboardDataComponent
                title="Courses Owned"
                data={creatorCoursePolicies?.length.toString() ?? ""}
              />
              <DashboardDataComponent
                title="Access Token Info"
                data={globalStateDatum?.UserInfo ?? ""}
              />
              {/* When Contributor Platform is ready, add a data point here */}
              {/* <DashboardDataComponent title="Contributions" data="17" /> */}
            </div>
          </div>
        )}
        <div className="col-span-4 mx-auto mt-auto w-full gap-5 px-5">
          <div className="flex flex-col items-center gap-10 bg-primary py-10 text-primary-foreground">
            <h2 className="text-center font-beckman text-4xl">
              Learn About Andamio
            </h2>
            <Link href="/course/andamio101">
              <Button>View Getting Started with Andamio Course</Button>
            </Link>
          </div>
          {/* <div className="flex w-full items-center justify-center bg-secondary py-10"> */}
          {/*   <div className="mx-auto flex w-2/3 flex-col"> */}
          {/*     <h2 className="text-center font-beckman text-4xl"> */}
          {/*       current goals */}
          {/*     </h2> */}
          {/*     <p className="py-10 text-center"> */}
          {/*       If the holder of the connected Access token already has work in */}
          {/*       progress, this component will appear. */}
          {/*     </p> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
