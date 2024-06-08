import { Card, CardContent, CardHeader } from "~/components/ui/card";
import useLearnerAssignments from "../hooks/useLearnerAssignments";
import Link from "next/link";
import AssignmentBadges from "~/components/ui/assignment-badges";

export default function AssignmentsSection() {
  const { learnerAssignments } = useLearnerAssignments();

  return (
    <div className="flex w-full">
      <div className="grid grid-cols-1 gap-5">
        <h2 className="text-2xl font-bold">My Assignments</h2>
        {learnerAssignments.map((la, i) => (
          <Card className="" key={i}>
            <Link
              href={`/course/${la.courseCode}/${la.moduleCode}/assignment/${la.assignmentCode}`}
            >
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
                  </div>
                  <div className="col-span-2 rounded-md bg-white p-5">
                    <h2 className="pb-2 text-lg font-bold">
                      What I want to remember about this Assignment:
                    </h2>
                    <p>{la.learnerNote}</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
