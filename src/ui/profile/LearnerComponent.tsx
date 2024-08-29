import { CardanoWallet, useWallet } from "@meshsdk/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useLearnerAssignmentStatuses } from "~/hooks/course/useLearnerAssignmentStatuses";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import DashboardDataComponent from "./dashboard-home/DashboardDataComponent";
import CourseDetails from "./learner/CourseDetails";
import CurrentCourseSidebarItem from "./learner/CurrentCourseSidebarItem";
import LearnerCourses from "./learner/LearnerCourses";
import SavedCourses from "./learner/SavedCourses";
import MintAccessTokenDialog from "~/components/transactions/dialogs/MintAccessTokenDialog";

export default function LearnerComponent() {
  const { connected } = useWallet();
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  const [selectedCourseCode, setSelectedCourseCode] = useState<
    string | undefined
  >(undefined);

  const [selectedCoursePolicyId, setSelectedCoursePolicyId] = useState<
    string | undefined
  >(undefined);

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {/* SIDEBAR */}
        <div className="col-span-1 row-span-9">
          <div
            className="my-5 cursor-pointer pl-2 font-beckman text-xl"
            onClick={() => setSelectedCourseCode(undefined)}
          >
            Andamio Learner
          </div>
          <div className="bg-primary text-primary-foreground">
            <h2 className="p-2 text-lg font-bold">Currently Enrolled</h2>
            {globalStateDatum?.TokenInfos.map((ti, i) => {
              if (ti.Minted) {
                return (
                  <CurrentCourseSidebarItem
                    lsCs={ti.LsCs}
                    key={i}
                    selectedCourse={selectedCourseCode}
                    setSelectedCourse={setSelectedCourseCode}
                    setSelectedCoursePolicyId={setSelectedCoursePolicyId}
                  />
                );
              }
            })}
            <SavedCourses
              selectedCourseCode={selectedCourseCode ?? ""}
              setSelectedCourseCode={setSelectedCourseCode}
              setSelectedCoursePolicyId={setSelectedCoursePolicyId}
            />
            {/* TODO: */}
            <h2 className="p-2 text-lg font-bold">Completed Courses</h2>
            {globalStateDatum?.TokenInfos.map((ti, i) => {
              if (!ti.Minted) {
                return (
                  <CurrentCourseSidebarItem
                    lsCs={ti.LsCs}
                    key={i}
                    selectedCourse={selectedCourseCode}
                    setSelectedCourse={setSelectedCourseCode}
                    setSelectedCoursePolicyId={setSelectedCoursePolicyId}
                  />
                );
              }
            })}
          </div>
        </div>
        {/* If a course is selected, show COURSE DETAILS. Otherwise, show LEARNER OVERVIEW */}
        {selectedCourseCode ? (
          <CourseDetails
            currentCourseCode={selectedCourseCode}
            learnerAssignments={learnerAssignments}
            courseNftPolicyId={selectedCoursePolicyId ?? ""}
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
                title="Completed Assignments"
                data={learnerAssignments.length.toString() ?? ""}
              />
            </div>
            <div className="round-md col-span-3 rounded-md border border-primary p-5">
              <h2 className="font-beckman text-xl">Current Assignments</h2>
              <p>Jump back into your current commitments:</p>
              {learnerAssignments.map((la, i) => {
                if (la.status === "IN_PROGRESS" || la.status === "COMMITMENT") {
                  return (
                    <div key={i} className="my-3">
                      <h2 className="mb-1 font-semibold">{la.title}</h2>
                      <Link
                        href={`/course/${la.courseCode}/${la.moduleCode}/assignment/${la.assignmentCode}`}
                      >
                        <Button>View Assignment in {la.courseTitle}</Button>
                      </Link>
                    </div>
                  );
                }
              })}
            </div>
            <div className="col-span-3">
              {accessTokenAlias && (
                <LearnerCourses
                  alias={accessTokenAlias}
                  setSelectedCourse={setSelectedCourseCode}
                  setSelectedCoursePolicyId={setSelectedCoursePolicyId}
                />
              )}
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
