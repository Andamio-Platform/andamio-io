import LearnerAssignmentPage from "~/ui/profile/LearnerAssignmentPage";
import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";

export default function DashboardLearnerAssignmentsPage() {
  return (
    <DesktopOnlyLayout>
      <LearnerAssignmentPage />
    </DesktopOnlyLayout>
  );
}
