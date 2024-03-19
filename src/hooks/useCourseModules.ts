import { api } from "~/utils/api";

export default function useCourseModules(
  courseCode: string,
) {
  const { data: courseModules, isLoading: isLoadingCourseModules } = api.module.getCourseModules.useQuery({
    courseCode: courseCode,
  });

  return { courseModules, isLoadingCourseModules };
}
