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
        <CommitToAssignment />
      </SheetContent>
    </Sheet>
  );
}
