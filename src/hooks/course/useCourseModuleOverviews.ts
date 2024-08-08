import { api } from "~/utils/api";

export default function useCourseModuleOverviews(courseCode: string) {
  const {
    data: courseModuleOverviews,
    isLoading: isLoadingCourseModules,
    refetch: refetchCourseModules,
  } = api.module.getCourseModuleOverviews.useQuery({
    courseCode: courseCode,
  });

  return {
    courseModuleOverviews,
    isLoadingCourseModules,
    refetchCourseModules,
  };
}
