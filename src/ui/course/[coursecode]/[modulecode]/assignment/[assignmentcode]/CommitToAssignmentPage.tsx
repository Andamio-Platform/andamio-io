import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import CommitToAssignment from "~/components/transactions/commitToAssignment/commitToAssignment";
import { NextPageContext } from "next";
import useCourse from "~/hooks/useCourse";
import Loading from "~/components/loading";

export default function CommitToAssignmentPage({
  courseCode,
  assignmentCode,
}: {
  courseCode: string;
  assignmentCode: string;
}) {
  console.log(courseCode);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button intent="dialog" size="dialog">
          On-Chain Commitment
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader>
          <SheetTitle>Onchain: Commit to Assignment</SheetTitle>
          <SheetDescription>some text</SheetDescription>
        </SheetHeader>
        Info about the assignment...
        <CommitToAssignment
          courseCode={courseCode}
          assignmentCode={assignmentCode}
        />
      </SheetContent>
    </Sheet>
  );
}
