import { useEffect } from "react";
import { useTheme } from "next-themes";
import ProfileLayout from "./layout/ProfileLayout";
import { useLearnerAssignmentStatuses } from "~/hooks/course/useLearnerAssignmentStatuses";
import AssignmentsSection from "./learner/AssignmentSection";

export default function LearnerAssignmentPage() {
  const { setTheme } = useTheme();
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return (
    <ProfileLayout>
      <div className="mx-auto flex w-11/12">
        <AssignmentsSection learnerAssignments={learnerAssignments} />
      </div>
    </ProfileLayout>
  );
}
