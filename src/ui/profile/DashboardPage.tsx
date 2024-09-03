import ProfileLayout from "./layout/ProfileLayout";
import DashboardHomeComponent from "./dashboard-home/DashboardHomeComponent";

export default function DashboardPage() {
  return (
    <ProfileLayout>
      <DashboardHomeComponent />
    </ProfileLayout>
  );
}
