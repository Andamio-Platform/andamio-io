import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import DashboardDataComponent from "./dashboard-home/DashboardDataComponent";
import AccessTokenComponent from "./dashboard-home/AccessTokenComponent";
import RoleStatus from "./dashboard-home/RoleStatus";
import { useSession } from "next-auth/react";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Button } from "~/components/ui/button";

export default function DashboardHomeComponent() {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { creatorCoursePolicies } = useCreatorsCoursesPolicies(
    accessTokenAlias ?? "",
  );
  const { data: sessionData } = useSession();
  return (
    <div className="mx-auto grid w-11/12 grid-cols-6 gap-10">
      <div className="col-span-6 mt-10 w-full text-center font-beckman text-4xl">
        Welcome to Andamio
      </div>
      <div className="col-span-3 my-5 flex w-full flex-col">
        <h2 className="pb-5 font-beckman text-2xl">Your Roles</h2>
        <div className="grid w-full grid-cols-2 gap-5">
          <div className="border border-primary p-3">
            <h2>Andamio Platform</h2>
            <RoleStatus
              roleName="Discord Account"
              userHasRole={!!sessionData}
              roleDetail={sessionData?.user.name ?? undefined}
            />
            <RoleStatus
              roleName="Learner Role"
              userHasRole={!!sessionData?.user.learnerId}
            />
            <RoleStatus
              roleName="Creator Role"
              userHasRole={!!sessionData?.user.creatorId}
              roleInfoUrl="/about"
            />
          </div>
          <div className="border border-primary p-3">
            <h2>NETWORK STUFF</h2>
            <RoleStatus
              roleName="Access Token"
              userHasRole={!!accessTokenAlias}
              roleDetail={accessTokenAlias}
            />
            <RoleStatus
              roleName="Enrolled in Courses"
              userHasRole={
                !!globalStateDatum && globalStateDatum.TokenInfos.length > 0
              }
            />
            <RoleStatus
              roleName="Course Creator"
              userHasRole={
                !!creatorCoursePolicies && creatorCoursePolicies.length > 0
              }
            />
            <RoleStatus
              roleName="Contributor: Coming Soon"
              userHasRole={false}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3 my-5 flex w-full flex-col">
        <h2 className="pb-5 font-beckman text-2xl">Your Next Steps</h2>
        {!connected && (
          <div>
            <p className="my-3 text-lg font-bold">Connect a Preprod Wallet:</p>
            <CardanoWallet />
          </div>
        )}
        {connected && !accessTokenAlias && <AccessTokenComponent />}
        {!!accessTokenAlias &&
          !!globalStateDatum &&
          globalStateDatum.TokenInfos.length == 0 && (
            <div>
              <p className="my-3 text-lg font-bold">Start Learning!</p>
              <p>Try enrolling in a course</p>
              <Button>View Courses</Button>
            </div>
          )}
        {!!globalStateDatum && globalStateDatum.TokenInfos.length > 0 && (
          <div>
            <p className="my-3 text-lg font-bold">Keep Learning</p>
            <p>You are enrolled in course...</p>
            <p>Click on Learners at the top of this page...</p>
          </div>
        )}
        {!!creatorCoursePolicies && creatorCoursePolicies.length > 0 && (
          <div>
            <p className="my-3 text-lg font-bold">Build your course(s)</p>
            <p>You are the course owner of:</p>
            <pre>{JSON.stringify(creatorCoursePolicies, null, 2)}</pre>
          </div>
        )}
      </div>
      <DashboardDataComponent title="Courses Completed" data="3" />
      <DashboardDataComponent title="Courses Owned" data="1" />
      <DashboardDataComponent title="Contributions" data="17" />
      <div className="col-span-6"></div>
      {accessTokenAlias && (
        <DashboardDataComponent
          title="Andamio Access Token"
          data={accessTokenAlias}
        />
      )}
      <div className="col-span-6 bg-primary py-10 text-primary-foreground">
        <h2 className="text-center font-beckman text-4xl">
          Learn More & Get Started
        </h2>
        <p className="py-10 text-center">
          For the newcomer, there is a getting started component that starts an
          integrated tour through Andamio.
        </p>
      </div>
      <div className="col-span-6 flex w-full items-center justify-center bg-secondary py-10">
        <div className="mx-auto flex w-2/3 flex-col">
          <h2 className="text-center font-beckman text-4xl">current goals</h2>
          <p className="py-10 text-center">
            If the holder of the connected Access token already has work in
            progress, this component will appear.
          </p>
        </div>
      </div>
    </div>
  );
}
