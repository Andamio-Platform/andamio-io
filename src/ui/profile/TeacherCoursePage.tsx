import ProfileLayout from "./layout/ProfileLayout";
import CreatorComponent from "./creator/TeacherCoursePageComponent";
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
        "TEACHER LANDING PAGE"
      )}
    </ProfileLayout>
  );
}
