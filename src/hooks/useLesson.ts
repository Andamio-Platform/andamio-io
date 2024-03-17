import { api } from "~/utils/api";

export default function useLesson(
  courseCode: string,
  moduleCode: string,
  lessonCode: string,
) {
  const { data: lesson, isLoading } = api.lesson.getLesson.useQuery({
    courseCode,
    moduleCode,
    lessonCode
  });

  return { lesson, isLoading };
}
