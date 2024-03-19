import { api } from "~/utils/api";

export default function useCourses(courseCode: string) {
  const { data: course, isLoading: isLoadingCourse } =
    api.course.getCourse.useQuery({ courseCode: courseCode });

  return { course, isLoadingCourse };
}
