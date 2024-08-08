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
import { type CourseModuleWithAssignmentSummary } from "~/types/db";

type Status = "SAVE_FOR_LATER" | "IN_PROGRESS" | "COMPLETE" | "COMMITMENT";

export default function LearnerCourseModuleDetailsComponent({
  courseModule,
}: {
  courseModule: CourseModuleWithAssignmentSummary;
}) {
  const { data: sessionData } = useSession();

  const [assignmentStatus, setAssignmentStatus] = useState<Status | undefined>(
    undefined,
  );
  useEffect(() => {
    if (sessionData && courseModule) {
      const _assignment = sessionData.user.assignmentCommitments.find(
        (a) => a.assignmentId === courseModule.assignments[0]?.id,
      );
      if (_assignment) {
        setAssignmentStatus(_assignment.status);
      }
    }
  }, [sessionData, courseModule]);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`courseModule-${courseModule.moduleCode}`}>
        <AccordionTrigger>
          <div className="mr-5 grid w-full grid-cols-3 py-2">
            <p className="pb-2 text-left font-bold">
              Module {courseModule.moduleCode}: {courseModule.title}
            </p>
            <p className="text text-left font-bold">
              {courseModule?.assignments?.length > 0 &&
                courseModule.assignments[0]?.title}
            </p>
            <div className="flex flex-row justify-between">
              {!!assignmentStatus && (
                <AssignmentBadges status={assignmentStatus} />
              )}
              <Button size="sm">DB Status Msg</Button>
              <Button size="sm">Onchain Status Msg</Button>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p>Assignment Notes stuff - from db</p>
          <p>On-chain assignment stuff</p>
          <p>some kind of accordion - expand for details</p>
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
