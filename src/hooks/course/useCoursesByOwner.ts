import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function useCoursesByOwner(courseCode: string) {
  const { data: sessionData } = useSession();
  const { data: ownerCourses, isLoading: isLoadingCourses } = api.course.getCoursesByOwner.useQuery(
    undefined,
    {
      enabled: !!sessionData
    },
  );
  const course = ownerCourses?.find((c) => c.courseCode === courseCode);
  return {ownerCourses, course, isLoadingCourses};
}
