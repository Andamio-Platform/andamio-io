import DesktopOnlyLayout from "~/components/DesktopOnlyLayout";
import TeacherDashboardMenu from "~/ui/profile/dashboard-menus/TeacherDashboardMenu";
import ProfileLayout from "~/ui/profile/layout/ProfileLayout";
import PlaceholderComponent from "~/ui/prototype/PlaceholderComponent";

export default function DashboardTeacherAssignmentsPage() {
  return (
    <DesktopOnlyLayout>
      <ProfileLayout>
        <TeacherDashboardMenu />
        <PlaceholderComponent name="teacher assignment page" />
      </ProfileLayout>
    </DesktopOnlyLayout>
  );
}
