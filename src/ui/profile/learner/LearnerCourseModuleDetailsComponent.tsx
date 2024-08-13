import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "~/components/ui/accordion";
import AssignmentBadges from "~/components/ui/assignment-badges";
import { Button } from "~/components/ui/button";
import {
  type CourseModuleWithAssignmentSummary,
  type AssignmentCommitment,
} from "~/types/db";

export default function LearnerCourseModuleDetailsComponent({
  courseModule,
}: {
  courseModule: CourseModuleWithAssignmentSummary;
}) {
  const { data: sessionData } = useSession();
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  const [assignmentCommitment, setAssignmentCommitment] = useState<
    AssignmentCommitment | undefined
  >(undefined);
  useEffect(() => {
    if (sessionData && courseModule) {
      const _assignment = sessionData.user.assignmentCommitments.find(
        (a) => a.assignmentId === courseModule.assignments[0]?.id,
      );
      if (_assignment) {
        setAssignmentCommitment(_assignment);
      }
    }
  }, [sessionData, courseModule]);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value={`courseModule-${courseModule.moduleCode}`}
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className={`${isAccordionOpen ? "my-5 border-y border-primary pt-2" : "border-none"}`}
      >
        <AccordionTrigger>
          <div className="mr-5 grid w-11/12 grid-cols-3 py-2">
            <p className="pb-2 text-left font-bold">
              Module {courseModule.moduleCode}: {courseModule.title}
            </p>
            <p className="text text-left font-bold">
              {courseModule?.assignments?.length > 0 &&
                courseModule.assignments[0]?.title}
            </p>
            <div className="flex flex-row justify-between">
              {!!assignmentCommitment && (
                <AssignmentBadges status={assignmentCommitment.status} />
              )}
              <Button size="sm">Onchain Status Msg</Button>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mb-5 bg-secondary p-5">
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div className="bg-background p-2">
              <h2 className="my-2 font-semibold">Personal Assignment Notes</h2>
              <p>{assignmentCommitment?.learnerNotes}</p>
              <Link
                href={`/course/${courseModule.originalCourse.courseCode}/${courseModule.moduleCode}/assignment/${courseModule.assignments[0]?.assignmentCode}`}
              >
                <Button size="sm" intent="courseOutlineAction">
                  View Assignment to Update Status
                </Button>
              </Link>
            </div>

            <div className="bg-background p-2">
              <h2 className="my-2 font-semibold">
                Network Assignment Credential
              </h2>
              <p>Coming soon. What should we call this?</p>
            </div>
          </div>
          <Link
            href={`/course/${courseModule.originalCourse.courseCode}/${courseModule.moduleCode}`}
          >
            <Button>View Module</Button>
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
