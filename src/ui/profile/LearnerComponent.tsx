import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";
import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import MintAccessToken from "~/components/transactions/MintAccessToken";
import { useState } from "react";
import CurrentCourseSidebarItem from "./learner/CurrentCourseSidebarItem";
import DashboardDataComponent from "./dashboard-home/DashboardDataComponent";
import CourseDetails from "./learner/CourseDetails";
import { useLearnerAssignmentStatuses } from "~/hooks/course/useLearnerAssignmentStatuses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import useLearnerSavedCourses from "~/hooks/course/useLearnerSavedCourses";
import { Button } from "~/components/ui/button";
import SavedCourseSidebarItem from "./learner/SavedCourseSidebarItem";

export default function LearnerComponent() {
  const { connected } = useWallet();
  const { accessTokenCourses, accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  const { savedCourses } = useLearnerSavedCourses();
  const [selectedCourseCode, setSelectedCourseCode] = useState<
    string | undefined
  >(undefined);
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 row-span-9 bg-gray-300">
          <h2
            className="ml-2 cursor-pointer py-5 font-beckman text-base hover:text-secondary"
            onClick={() => setSelectedCourseCode(undefined)}
          >
            Learner Dashboard Home
          </h2>
          <h2 className="ml-2 py-5 font-beckman">Current Network Courses</h2>
          {globalStateDatum?.TokenInfos.map((ti, i) => (
            <CurrentCourseSidebarItem
              lsCs={ti.LsCs}
              key={i}
              selectedCourse={selectedCourseCode}
              setSelectedCourse={setSelectedCourseCode}
            />
          ))}
          <Accordion type="single" collapsible disabled={!savedCourses}>
            <AccordionItem value="completed">
              <AccordionTrigger className="pr-5">
                <h2 className="ml-2 py-5 font-beckman text-base">
                  Saved Courses
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                {savedCourses?.map((t, i) => (
                  <SavedCourseSidebarItem
                    key={i}
                    savedCourse={t}
                    selectedCourseCode={selectedCourseCode ?? ""}
                    setSelectedCourseCode={setSelectedCourseCode}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <h2 className="ml-2 py-5 font-beckman">View All Assignments</h2>
          <h2 className="ml-2 py-5 font-beckman">View Completed Courses</h2>
        </div>
        {/* Move these details to Course level view - this page should be a list of courses */}
        {/* <AssignmentsSection /> */}
        {/* <OnchainAssignmentsSection /> */}
        {selectedCourseCode ? (
          <CourseDetails
            currentCourseCode={selectedCourseCode}
            learnerAssignments={learnerAssignments}
          />
        ) : (
          <>
            <div className="col-span-3 grid grid-cols-3 gap-5">
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
            <div className="col-span-3 border border-primary p-5">
              <p>My Goals - Needed Prereqs or otherwise saved Courses</p>
            </div>
            <div className="col-span-3 border border-primary p-5">
              <h2>ACCESS TOKEN COURSES: Todo - finish that nice hook</h2>
              <pre>{JSON.stringify(accessTokenCourses, null, 2)}</pre>
            </div>
          </>
        )}
        <div className="col-span-4 bg-secondary p-5 text-center text-secondary-foreground">
          <p className="mb-5 font-beckman text-2xl">Ready to Explore?</p>
          <Button>View all Courses</Button>
        </div>
      </div>
    </div>
  );
}
