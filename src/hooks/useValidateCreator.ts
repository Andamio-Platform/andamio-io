import { Session } from "next-auth";
import { api } from "~/utils/api";

export default function useValidateCreator(
  courseCode: string,
  sessionData: Session | null,
) {
  const { data: ownerCourses, isLoading: isValidatingCreator } =
    api.course.getCoursesByOwner.useQuery(undefined, {
      enabled: sessionData != null,
    });

  const courseFound = ownerCourses?.find(
    (course) => course.courseCode === courseCode,
  );

  if (courseFound) {
    return { isCreator: true, isValidatingCreator };
  } else {
    return { isCreator: false, isValidatingCreator };
  }
}
