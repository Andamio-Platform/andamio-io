import { useEffect } from "react";
import { useTheme } from "next-themes";
import ProfileLayout from "./layout/ProfileLayout";
import { useLearnerAssignmentStatuses } from "~/hooks/course/useLearnerAssignmentStatuses";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function LearnerAssignmentPage() {
  const { setTheme } = useTheme();
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <div className="round-md col-span-3 rounded-md border border-primary p-5">
        <h2 className="font-beckman text-xl">Current Assignments</h2>
        <p>These are your personal notes:</p>
        {learnerAssignments.map((la, i) => {
          if (la.status === "IN_PROGRESS" || la.status === "COMMITMENT") {
            return (
              <div key={i} className="my-3">
                <h2 className="mb-1 font-semibold">{la.title}</h2>
                <Link
                  href={`/course/${la.courseCode}/${la.moduleCode}/assignment/${la.assignmentCode}`}
                >
                  <Button>View Assignment in {la.courseTitle}</Button>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </ProfileLayout>
  );
}
