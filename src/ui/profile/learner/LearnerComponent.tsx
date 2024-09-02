import { CardanoWallet, useWallet } from "@meshsdk/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useLearnerAssignmentStatuses } from "~/hooks/course/useLearnerAssignmentStatuses";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import CourseDetails from "./CourseDetails";
import LearnerCourses from "./LearnerCourses";
import MintAccessTokenDialog from "~/components/transactions/dialogs/MintAccessTokenDialog";
import DashboardDataComponent from "../dashboard-home/DashboardDataComponent";
import { useRouter } from "next/router";

export default function LearnerComponent() {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  const router = useRouter();
  const { coursecode } = router.query;

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {/* If a course is selected, show COURSE DETAILS. Otherwise, show LEARNER OVERVIEW */}
        {!!coursecode && typeof coursecode === "string" ? (
          <CourseDetails
            currentCourseCode={coursecode}
            learnerAssignments={learnerAssignments}
            globalStateDatum={globalStateDatum}
          />
        ) : (
          <>
            <div className="col-span-1 col-start-5 row-span-9 flex flex-col gap-5">
              {!connected ? (
                <CardanoWallet />
              ) : (
                <>
                  {connected && !accessTokenAlias ? (
                    <div>
                      <MintAccessTokenDialog />
                    </div>
                  ) : (
                    <>
                      <DashboardDataComponent
                        title="Your Access Token"
                        data={accessTokenAlias ?? ""}
                      />
                    </>
                  )}
                </>
              )}
              <DashboardDataComponent
                title="Courses"
                data={globalStateDatum?.TokenInfos.length.toString() ?? ""}
              />
              <DashboardDataComponent
                title="My Assignments"
                data={learnerAssignments.length.toString() ?? ""}
              />
            </div>
            <div className="col-span-3">
              {accessTokenAlias && <LearnerCourses alias={accessTokenAlias} />}
            </div>
            {/* Explore implementation of Goals - unique Epic */}
            {/* <div className="col-span-3 border border-primary p-5"> */}
            {/*   <p>My Goals - Needed Prereqs or otherwise saved Courses</p> */}
            {/* </div> */}
            <div className="col-span-3 bg-secondary p-5 text-center text-secondary-foreground">
              <p className="mb-5 font-beckman text-2xl">Ready to Explore?</p>
              <Link href="/courses">
                <Button>View all Courses</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
