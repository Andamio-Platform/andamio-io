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
  const { accessTokenAlias } = useAccessToken();
  const { globalStateDatum } = useGlobalStateDatum(accessTokenAlias ?? "");
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  const { savedCourses } = useLearnerSavedCourses();
  const [selectedCourseCode, setSelectedCourseCode] = useState<
    string | undefined
  >(undefined);

  const [selectedCoursePolicyId, setSelectedCoursePolicyId] = useState<
    string | undefined
  >(undefined);

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-1 row-span-9">
          <div
            className="my-5 cursor-pointer font-beckman text-xl"
            onClick={() => setSelectedCourseCode(undefined)}
          >
            Andamio Learner
          </div>
          <div className="bg-primary text-primary-foreground">
            <h2 className="p-2 text-lg font-bold">Current Network Courses</h2>
            {globalStateDatum?.TokenInfos.map((ti, i) => (
              <CurrentCourseSidebarItem
                lsCs={ti.LsCs}
                key={i}
                selectedCourse={selectedCourseCode}
                setSelectedCourse={setSelectedCourseCode}
                setSelectedCoursePolicyId={setSelectedCoursePolicyId}
              />
            ))}
            <Accordion type="single" collapsible disabled={!savedCourses}>
              <AccordionItem value="completed">
                <AccordionTrigger className="pr-5">
                  <h2 className="p-2 text-lg font-bold">Saved Courses</h2>
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
            <h2 className="p-2 text-lg font-bold">My Assignments</h2>
            <h2 className="p-2 text-lg font-bold">My Completed Courses</h2>
          </div>
        </div>
        {selectedCourseCode ? (
          <CourseDetails
            currentCourseCode={selectedCourseCode}
            learnerAssignments={learnerAssignments}
            courseNftPolicyId={selectedCoursePolicyId ?? ""}
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
                      <MintAccessToken />
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
            <div className="col-span-3 border border-primary p-5">
              <p>Current courses</p>
            </div>
            <div className="col-span-3 border border-primary p-5">
              <p>Current commitments</p>
            </div>
            {/* Explore implementation of Goals - unique Epic */}
            {/* <div className="col-span-3 border border-primary p-5"> */}
            {/*   <p>My Goals - Needed Prereqs or otherwise saved Courses</p> */}
            {/* </div> */}
          </>
        )}
        <div className="col-span-5 bg-secondary p-5 text-center text-secondary-foreground">
          <p className="mb-5 font-beckman text-2xl">Ready to Explore?</p>
          <Button>View all Courses</Button>
        </div>
      </div>
    </div>
  );
}
