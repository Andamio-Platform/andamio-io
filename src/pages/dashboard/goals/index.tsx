import MyGoalsPage from "~/ui/profile/MyGoalsPage";
import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";

export default function DashboardGoalsPage() {
  return (
    <DesktopOnlyLayout>
      <MyGoalsPage />
    </DesktopOnlyLayout>
  );
}
