import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import MintAccessToken from "~/components/transactions/MintAccessToken";
import { useState } from "react";
import CurrentCourseSidebarItem from "./learner/CurrentCourseSidebarItem";
import DashboardDataComponent from "./dashboard-home/DashboardDataComponent";
import CourseDetails from "./learner/CourseDetails";
import { useLearnerAssignmentStatuses } from "~/hooks/course/useLearnerAssignmentStatuses";
import OnchainAssignmentsSection from "./learner/OnchainAssignmentsSection";

const testData: { policyId: string; courseTitle: string }[] = [
  {
    policyId: "a98573567562a18360d6710bcd5d7a9998fb733b15205d71afdfece3",
    courseTitle: "Andamio 201",
  },
  {
    policyId: "9a4f71d892761a4ecee3fb5f559bc41931a339fcf6467131af594930",
    courseTitle: "PPBL 2024 Private",
  },
  {
    policyId: "5679763f47a4ca0877dd774ef15db7558f29e2b753273e5613db2d9b",
    courseTitle: "Example Course",
  },
  {
    policyId: "8675b941c6aa7d59728e86920dc74834940a694d258a80fa2d1d546f",
    courseTitle: "PPBL 2024",
  },
  {
    policyId: "6e8614bcba95b8309d50af49a9c9fc5cafde41f5922011e815b2d908",
    courseTitle: "What is this",
  },
];
export default function LearnerComponent() {
  const { connected } = useWallet();
  const { accessTokenCourses, accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(
    undefined,
  );
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1">
          {!connected ? (
            <CardanoWallet />
          ) : (
            <>
              {connected && !accessTokenAlias ? (
                <div>
                  <MintAccessToken />
                </div>
              ) : (
                <>
                  <DashboardDataComponent
                    title="Your Access Token"
                    data={accessTokenAlias ?? ""}
                    label={globalStateDatum?.UserInfo ?? ""}
                  />
                </>
              )}
            </>
          )}
        </div>
        <DashboardDataComponent
          title="Andamio Courses"
          data={globalStateDatum?.TokenInfos.length.toString() ?? ""}
          label="courses enrolled"
        />
        <DashboardDataComponent
          title="Assignments"
          data={learnerAssignments.length.toString() ?? ""}
          label="assignments viewed in courses"
        />
      </div>
      <div className="mt-24 grid grid-cols-4 gap-5">
        <div className="col-span-1 row-span-9 ">
          <h2 className="py-5 font-beckman">Current Courses</h2>
          {globalStateDatum?.TokenInfos.map((ti, i) => (
            <CurrentCourseSidebarItem
              lsCs={ti.LsCs}
              key={i}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
            />
          ))}
          <h2 className="py-5 font-beckman">Completed Courses</h2>
          {testData.map((t, i) => (
            <CurrentCourseSidebarItem
              lsCs={t.policyId}
              key={i}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
            />
          ))}
        </div>
        {/* Move these details to Course level view - this page should be a list of courses */}
        {/* <AssignmentsSection /> */}
        {/* <OnchainAssignmentsSection /> */}
        {selectedCourse ? (
          <CourseDetails
            lsCs={selectedCourse}
            learnerAssignments={learnerAssignments}
          />
        ) : (
          <>
            <div className="col-span-3 border border-primary p-5">
              <p>My Goals - Needed Prereqs or otherwise saved Courses</p>
            </div>
            <div className="col-span-3 border border-primary p-5">
              <h2>ACCESS TOKEN COURSES: Todo - finish that nice hook</h2>
              <pre>{JSON.stringify(accessTokenCourses, null, 2)}</pre>
            </div>
          </>
        )}
        <div className="col-span-4 border border-primary p-5">
          <p>CTA: Want to explore more? Browse all courses!</p>
          <p>
            CTA: Or, choose a Goal Path and complete the pre-requisites - write
            about this idea + bring to team.
          </p>
        </div>
        <div className="col-span-4 border border-primary p-5">
          <OnchainAssignmentsSection />
        </div>
      </div>
    </div>
  );
}
