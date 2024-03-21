import { use, useEffect } from "react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import useLesson from "~/hooks/useLesson";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";

export default function PageCourseContent({
  courseCode,
  moduleCode,
  lessonCode,
}: {
  courseCode: string;
  moduleCode: string;
  lessonCode: string;
}) {
  const { lesson, refetchLesson } = useLesson(
    courseCode,
    moduleCode,
    parseInt(lessonCode),
  );

  const editor = new Editor({
    editable: false,
    initialLesson: "",
  });

  useEffect(() => {
    if (lesson && lesson.contentJson && typeof lesson.contentJson === "object")
      editor.setContent(lesson.contentJson);
  }, [lesson]);

  return (
    <CourseLayout>
      {lesson ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          <div>
            <p className="text-base font-semibold leading-7 text-indigo-600">
              TO-DO: add SLT here
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {lesson.title}
            </h1>
            <p className="text-xl leading-8">{lesson.description}</p>
          </div>
          {lesson.contentJson && editor.render()}
        </div>
      ) : (
        <Loading />
      )}
    </CourseLayout>
  );
}
