import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import DashboardDataComponent from "./DashboardDataComponent";
import AccessTokenComponent from "./AccessTokenComponent";
import RoleStatus from "./RoleStatus";
import { useSession } from "next-auth/react";
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
  const { data: sessionData } = useSession();
  return (
    <div>
      <div className="mx-auto grid w-full grid-cols-5">
        <div className="col-span-1 row-span-3 flex w-full flex-col">
          <div className="my-5 pl-2 font-beckman text-xl">
            Andamio Dashboard Home
          </div>
          <div className="grid w-full grid-cols-1 gap-1">
            <div className="bg-primary text-primary-foreground">
              <h2 className="p-2 text-lg font-bold">Andamio Platform Roles</h2>
              <RoleStatus
                roleName="Discord Account"
                userHasRole={!!sessionData}
                roleDetail={sessionData?.user.name ?? undefined}
              />
              <RoleStatus
                roleName="Learner Role"
                userHasRole={!!sessionData?.user.learnerId}
                roleInfoUrl="/about"
              />
              <RoleStatus
                roleName="Creator Role"
                userHasRole={!!sessionData?.user.creatorId}
                roleInfoUrl="/about"
              />
            </div>
            <div className="bg-primary text-primary-foreground">
              <h2 className="p-2 text-lg font-bold">Andamio Network Status</h2>
              <RoleStatus
                roleName="Access Token"
                userHasRole={!!accessTokenAlias}
                roleDetail={accessTokenAlias}
                roleInfoUrl="/about"
              />
              <RoleStatus
                roleName="Enrolled in Courses"
                userHasRole={
                  !!globalStateDatum && globalStateDatum.TokenInfos.length > 0
                }
                roleInfoUrl="/courses"
              />
              <RoleStatus
                roleName="Course Creator"
                userHasRole={
                  !!creatorCoursePolicies && creatorCoursePolicies.length > 0
                }
                roleInfoUrl="/about"
              />
              <RoleStatus
                roleName="Contributor: Coming Soon"
                userHasRole={false}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3 mx-auto my-5 flex min-h-[40vh] w-11/12 flex-col">
          <h2 className="pb-5 font-beckman text-2xl">Your Next Steps</h2>
          {!connected && (
            <div>
              <p className="my-3 text-lg font-bold">
                Connect a Preprod Wallet:
              </p>
              <CardanoWallet />
            </div>
          )}
          {connected && !accessTokenAlias && <AccessTokenComponent />}
          {connected && accessTokenAlias && (
            <p>Access Token Info: {globalStateDatum?.UserInfo}</p>
          )}
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
                courses. Select <span className="font-beckman">LEARNERS</span>{" "}
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
        <div className="col-span-1">
          <div className="grid grid-cols-1 gap-y-10">
            <DashboardDataComponent
              title="Learner Courses"
              data={globalStateDatum?.TokenInfos.length.toString() ?? ""}
            />
            <DashboardDataComponent
              title="Courses Owned"
              data={creatorCoursePolicies?.length.toString() ?? ""}
            />
            {/* When Contributor Platform is ready, add a data point here */}
            {/* <DashboardDataComponent title="Contributions" data="17" /> */}
          </div>
        </div>
        <div className="col-span-5 mt-10 grid grid-cols-2 gap-5 px-5">
          <div className="bg-primary py-10 text-primary-foreground">
            <h2 className="text-center font-beckman text-4xl">
              Learn More & Get Started
            </h2>
            <p className="py-10 text-center">
              For the newcomer, there is a getting started component that starts
              an integrated tour through Andamio.
            </p>
          </div>
          <div className="flex w-full items-center justify-center bg-secondary py-10">
            <div className="mx-auto flex w-2/3 flex-col">
              <h2 className="text-center font-beckman text-4xl">
                current goals
              </h2>
              <p className="py-10 text-center">
                If the holder of the connected Access token already has work in
                progress, this component will appear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
