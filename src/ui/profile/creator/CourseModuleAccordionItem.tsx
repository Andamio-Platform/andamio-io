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

  return (
    <AccordionItem key={key} value={cm.moduleCode}>
      <AccordionTrigger className="items-center border-b border-primary py-2">
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
              <span className="font-beckman text-sm">Lessons Published</span>
            </p>
          </div>
          {cm.assignments.length > 0 ? (
            <div className="flex h-full flex-row items-center gap-1">
              <CheckCircledIcon className="text-success " />
              <p>Assignment</p>
            </div>
          ) : (
            <p>Module does not include assignment</p>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-2 pb-10 pt-2">
        {isAssignmentOnchain
          ? "Module is Publised on Chain"
          : "Module is not yet published"}
        {cm.slts.map((slt, j) => (
          <p key={j}>
            {cm.moduleCode}.{slt.moduleIndex}: {slt.sltText}
          </p>
        ))}
        {cm.assignments?.length > 0 && (
          <p>Assignment: {cm.assignments[0]?.title}</p>
        )}
        {isAssignmentOnchain ? (
          <Button>Remove Onchain Module</Button>
        ) : (
          <MintCourseModuleDialog
            courseModuleOverview={cm}
            courseNftPolicyId={courseNftPolicyId}
          />
        )}
        <Button>View Assignment Commitments</Button>
      </AccordionContent>
    </AccordionItem>
  );
}
