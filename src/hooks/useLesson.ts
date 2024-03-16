import { api } from "~/utils/api";

export default function useLesson(
  courseCode: string,
  moduleCode: string,
  lessonCode: string,
) {
  const { data: lessons, isLoading } = api.lesson.getModuleLessons.useQuery({
    courseCode,
    moduleCode,
  });
  const lesson = lessons?.find((c) => c.lessonCode === lessonCode);

  return { lesson, isLoading };
}
