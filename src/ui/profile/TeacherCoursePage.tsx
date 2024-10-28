import PlaceholderComponent from "../prototype/PlaceholderComponent";
import ProfileLayout from "./layout/ProfileLayout";
import CreatorComponent from "./teacher/TeacherCoursePageComponent";
import TeacherDashboardMenu from "~/ui/navigation/menu-sections/TeacherDashboardMenu";

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
