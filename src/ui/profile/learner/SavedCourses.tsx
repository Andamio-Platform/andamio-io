import SavedCourseSidebarItem from "./SavedCourseSidebarItem";
import useLearnerSavedCourses from "~/hooks/course/useLearnerSavedCourses";

export default function SavedCourses() {
  const { savedCourses } = useLearnerSavedCourses();
  return (
    <div>
      <div className="text-sm font-semibold leading-6 text-foreground">
        Saved for Later:
      </div>
      <ul role="list" className="my-2 space-y-1">
        {savedCourses?.map((t, i) => (
          <SavedCourseSidebarItem key={i} savedCourse={t} />
        ))}
      </ul>
    </div>
  );
}
