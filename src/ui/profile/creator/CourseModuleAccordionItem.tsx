import { Button } from "~/components/ui/button";
import MintCourseModuleDialog from "~/components/transactions/dialogs/MintCourseModuleDialog";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import useAssignmentNetworkStatus from "~/hooks/onchain/useAssignmentNetworkStatus";
import { type CourseModuleOverview } from "~/types/db";
import { Badge } from "~/components/ui/badge";
import { useState } from "react";

export default function CourseModuleAccordionItem({
  courseCode,
  courseNftPolicyId,
  cm,
  key,
}: {
  courseCode: string;
  courseNftPolicyId: string;
  cm: CourseModuleOverview;
  key: number;
}) {
  const { isAssignmentOnchain } = useAssignmentNetworkStatus({
    courseCode: courseCode,
    moduleCode: cm.moduleCode,
  });

  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  return (
    <AccordionItem key={key} value={cm.moduleCode}>
      <AccordionTrigger
        className={`items-center border-b border-primary p-2 ${isAccordionOpen ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        <div className="grid w-full grid-cols-5 gap-5">
          <h2 className="col-span-1 text-xl">
            <span className="font-beckman text-sm">Module</span> {cm.moduleCode}
          </h2>
          <h2 className="col-span-2 text-left text-xl font-semibold">
            {cm.title}
          </h2>
          <div className="flex h-full flex-row items-center gap-5">
            <p>
              {cm.slts.length}{" "}
              <span className="font-beckman text-sm">SLTs</span>
            </p>
            <p>
              {cm.slts.length}{" "}
              <span className="font-beckman text-sm">Lessons</span>
            </p>
          </div>
          {cm.assignments.length > 0 ? (
            <div className="flex h-full flex-row items-center gap-1">
              <CheckCircledIcon className="text-success " />
              <p>Assignment</p>
            </div>
          ) : (
            <div className="flex h-full flex-row items-center gap-1">
              <p>No Assignment</p>
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="mb-5 grid grid-cols-1 border-x border-b border-primary px-2 pb-10 pt-2 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Student Learning Targets (SLTs)
          </h3>
          {cm.slts.map((slt, j) => (
            <>
              <p key={j}>
                <span className="font-mono font-semibold text-primary">
                  {cm.moduleCode}.{slt.moduleIndex}:
                </span>{" "}
                {slt.sltText}
              </p>
            </>
          ))}
          {cm.assignments?.length > 0 && (
            <>
              <h3 className="my-2 text-lg font-semibold">Assignment</h3>
              <p>{cm.assignments[0]?.title}</p>
            </>
          )}
        </div>
        <div className="flex flex-col px-8">
          <Badge
            className={`my-5 ${isAssignmentOnchain ? "bg-success text-green-900" : "bg-accent text-black"}`}
          >
            {isAssignmentOnchain
              ? "Module Credential Criteria is Published on Andamio Network"
              : "Module Credential Criteria is not yet published"}
          </Badge>
          {cm.assignments.length === 1 && cm.slts.length > 0 ? (
            <>
              {isAssignmentOnchain ? (
                <div className="flex flex-col gap-2">
                  <Button>Remove Onchain Module</Button>
                  <Button>View Assignment Commitments</Button>
                </div>
              ) : (
                <MintCourseModuleDialog
                  courseModuleOverview={cm}
                  courseNftPolicyId={courseNftPolicyId}
                />
              )}
            </>
          ) : (
            <>
              {cm.assignments.length === 0 && (
                <p>
                  This Module does not have an Assignment. To publish this
                  Module on-chain, please create an Assignment.
                </p>
              )}
              {cm.slts.length === 0 && (
                <p>
                  This Module does not have any Student Learning Targets. To
                  publish a Module on the Andamio Network, it must include at
                  least one SLT.
                </p>
              )}
            </>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
