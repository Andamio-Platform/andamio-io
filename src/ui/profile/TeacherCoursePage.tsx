import ProfileLayout from "./layout/ProfileLayout";
import CreatorComponent from "./creator/TeacherCoursePageComponent";

export default function TeacherCoursePage({
  courseCode,
}: {
  courseCode?: string;
}) {
  return (
    <ProfileLayout>
      {courseCode ? (
        <CreatorComponent courseCode={courseCode} />
      ) : (
        "TEACHER LANDING PAGE"
      )}
    </ProfileLayout>
  );
}
