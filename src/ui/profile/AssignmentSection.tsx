import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import useLearnerAssignmentStatuses from "./hooks/useLearnerAssignmentStatuses";
import Link from "next/link";
import AssignmentBadges from "~/components/ui/assignment-badges";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ArchiveIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function AssignmentsSection() {
  const { learnerAssignments, sessionData, updateSession } =
    useLearnerAssignmentStatuses();
  const ctx = api.useUtils();

  const [showArchived, setShowArchived] = useState(false);

  const {
    mutate: updateArchivedStatus,
    isLoading: isLoadingUpdatedArchivedStatus,
  } = api.assignmentCommitment.setArchived.useMutation({
    onSuccess: () => {
      toast.success("Assignment archived");
      void ctx.assignmentCommitment.getLearnerCommitments.invalidate();
      void ctx.assignmentCommitment.getAssignmentCommitments.invalidate();
      void updateSession();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      if (errorMessage) {
        toast.error(JSON.stringify(errorMessage));
      } else {
        toast.error("Error updating the Assignment");
      }
    },
  });

  function handleArchive(assignment: string, archived: boolean) {
    updateArchivedStatus({
      assignmentCommitmentId: assignment,
      archived: archived,
    });
  }

  return (
    <div className="flex w-full flex-col">
      <div className="grid w-full grid-cols-1 gap-5">
        <h2 className="text-2xl font-bold">My Assignments</h2>
        {learnerAssignments.map((la, i) => {
          if (la.archived && !showArchived) return null;

          return (
            <Card className="" key={i}>
              <CardHeader>
                <div className="flex w-full flex-row justify-between">
                  <p className="text-xl font-bold">{la.title}</p>
                  <AssignmentBadges status={la.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-10">
                  <div>
                    <p className="pb-2 text-xs font-bold">
                      Course {la.courseCode}: {la.courseTitle}
                    </p>
                    <p className="pb-2 text-xs font-bold">
                      Module {la.moduleCode}: {la.moduleTitle}
                    </p>
                    <Link
                      href={`/course/${la.courseCode}/${la.moduleCode}/assignment/${la.assignmentCode}`}
                    >
                      <Button size="sm" className="mt-5">
                        View Assignment
                      </Button>
                    </Link>
                  </div>
                  <div className="col-span-2 rounded-md bg-white p-5">
                    <h2 className="pb-2 text-lg font-bold">
                      What I want to remember about this Assignment:
                    </h2>
                    <p>{la.learnerNote}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {!la.archived && (
                  <div role="button" onClick={() => handleArchive(la.id, true)}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <ArchiveIcon
                            width={30}
                            height={30}
                            className="hover:text-amber-800"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          Archive this Assignment. (You will still be able to
                          view it later.)
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
                {!!la.archived && (
                  <div
                    role="button"
                    onClick={() => handleArchive(la.id, false)}
                  >
                    Un-Archive this Assignment
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Button className="my-5" onClick={() => setShowArchived(!showArchived)}>
        {showArchived
          ? "Hide Archived Assignments"
          : "Show Archived Assignments"}
      </Button>
    </div>
  );
}
