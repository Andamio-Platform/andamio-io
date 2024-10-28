import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";
import PlannerPage from "~/ui/profile/PlannerPage";

export default function DashboardPlannerPage() {
  return (
    <DesktopOnlyLayout>
      <PlannerPage />
    </DesktopOnlyLayout>
  );
}
