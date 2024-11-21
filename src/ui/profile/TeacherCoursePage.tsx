import PlaceholderComponent from "../prototype/PlaceholderComponent";
import TeacherDashboardMenu from "./components/dashboard-menus/TeacherDashboardMenu";
import ProfileLayout from "./layout/ProfileLayout";
import CreatorComponent from "./roles/teacher/TeacherCoursePageComponent";

export default function TeacherCoursePage({
  courseCode,
}: {
  courseCode?: string;
}) {
  return (
    <ProfileLayout>
      <TeacherDashboardMenu />
      {courseCode ? (
        <CreatorComponent courseCode={courseCode} />
      ) : (
        <PlaceholderComponent name="teacher landing page" />
      )}
    </ProfileLayout>
  );
}
