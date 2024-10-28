import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import DashboardDataComponent from "./DashboardDataComponent";
import AccessTokenComponent from "./AccessTokenComponent";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import useCreatorsCoursesPolicies from "~/hooks/onchain/useCreatorsCoursesPolicies";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Card } from "~/components/ui/card";

export default function DashboardHomeComponent() {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { creatorCoursePolicies } = useCreatorsCoursesPolicies(
    accessTokenAlias ?? "",
  );
  return (
    <div className="mx-auto grid h-screen w-11/12 grid-cols-4 items-center justify-center md:w-3/4">
      {!connected && (
        <div className="col-span-4">
          <Card>
            <p className="my-3 text-lg font-semibold">Welcome to Andamio!</p>
            <p className="my-3 text-lg font-semibold">
              To get started, connect a wallet (requires Cardano Preprod)
            </p>
            <CardanoWallet />
          </Card>
        </div>
      )}
      {connected && !accessTokenAlias && (
        <div className="col-span-4">
          <AccessTokenComponent />
        </div>
      )}

      <div className="col-span-3">
        <Card>
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
                  <span className="hover:text-success">My Courses</span>
                </Link>{" "}
                to view course status.
              </p>
            </div>
          )}
          {!!creatorCoursePolicies && creatorCoursePolicies.length > 0 && (
            <div>
              <p className="my-3 text-lg font-bold">Build your course(s)</p>
              <p>
                You are a Teacher in {creatorCoursePolicies.length} courses.
                Select <span className="font-semibold">Teacher Dashboard</span>{" "}
                manage courses.
              </p>
            </div>
          )}
        </Card>
      </div>
      {globalStateDatum && (
        <div className="col-span-1">
          <div className="grid grid-cols-1 gap-y-10">
            <DashboardDataComponent
              title="Courses Enrolled"
              data={globalStateDatum?.TokenInfos.length.toString() ?? ""}
            />
            {!!creatorCoursePolicies && creatorCoursePolicies.length > 0 && (
              <DashboardDataComponent
                title="Courses Owned"
                data={creatorCoursePolicies?.length.toString() ?? ""}
              />
            )}
            <DashboardDataComponent
              title="Access Token Info"
              data={globalStateDatum?.UserInfo ?? ""}
            />
            {/* When Contributor Platform is ready, add a data point here */}
            {/* <DashboardDataComponent title="Contributions" data="17" /> */}
          </div>
        </div>
      )}
      <div className="col-span-4 mx-auto mt-auto w-full gap-5">
        <div className="flex flex-col items-center gap-10 bg-primary py-10 text-primary-foreground">
          <h2 className="text-center text-4xl">Learn About Andamio</h2>
          <Link href="/course/andamio101">
            <Button>View Getting Started with Andamio Course</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
