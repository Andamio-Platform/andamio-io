import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function useCourseByOwner(courseCode: string) {
  const { data: sessionData } = useSession();
  const { data, isLoading: isLoadingCourse } = api.course.getCoursesByOwner.useQuery(
    undefined,
    {
      enabled: sessionData != null,
    },
  );
  const course = data?.find((c) => c.courseCode === courseCode);
  return {course, isLoadingCourse};
}
