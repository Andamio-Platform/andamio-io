import ProfileLayout from "./layout/ProfileLayout";
import { useLearnerAssignmentStatuses } from "~/hooks/course/useLearnerAssignmentStatuses";
import AssignmentsSection from "./learner/AssignmentSection";
import LearnerDashboardMenu from "../navigation/menu-sections/LearnerDashboardMenu";

export default function LearnerAssignmentPage() {
  const { learnerAssignments } = useLearnerAssignmentStatuses();

  return (
    <ProfileLayout>
      <div className="flex w-full flex-col">
        <LearnerDashboardMenu />
        <AssignmentsSection learnerAssignments={learnerAssignments} />
      </div>
    </ProfileLayout>
  );
}
