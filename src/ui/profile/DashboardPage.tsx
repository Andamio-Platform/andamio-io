import ProfileLayout from "./layout/ProfileLayout";
import DashboardHomeComponent from "./components/DashboardHomeComponent";

export default function DashboardPage() {
  return (
    <ProfileLayout>
      <DashboardHomeComponent />
    </ProfileLayout>
  );
}
