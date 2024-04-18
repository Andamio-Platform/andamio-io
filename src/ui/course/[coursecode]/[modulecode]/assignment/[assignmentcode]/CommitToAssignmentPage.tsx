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

export default function CommitToAssignmentPage() {
  return (
    <div className="flex justify-end bg-secondary p-3 text-secondary">
      <Sheet>
        <SheetTrigger asChild>
          <Button>Commit to this assignment</Button>
        </SheetTrigger>
        <SheetContent className="p-6">
          <SheetHeader>
            <SheetTitle>Commit to Assignment</SheetTitle>
            <SheetDescription>some text</SheetDescription>
          </SheetHeader>
          Info about the assignment...
          <CommitToAssignment />
        </SheetContent>
      </Sheet>
    </div>
  );
}
