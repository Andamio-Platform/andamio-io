import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";
import DashboardPage from "~/ui/profile/DashboardPage";

export default function Dashboard() {
  return (
    <DesktopOnlyLayout>
      <DashboardPage />
    </DesktopOnlyLayout>
  );
}
