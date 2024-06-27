import { api } from "~/utils/api";

export default function useCourseModules(courseCode: string) {
  const {
    data: courseModules,
    isLoading: isLoadingCourseModules,
    refetch: refetchCourseModules,
  } = api.module.getCourseModules.useQuery({
    courseCode: courseCode,
  });

  return { courseModules, isLoadingCourseModules, refetchCourseModules };
}
