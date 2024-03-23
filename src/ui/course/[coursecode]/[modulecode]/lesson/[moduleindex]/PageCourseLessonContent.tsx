import { use, useEffect } from "react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import useLesson from "~/hooks/useLesson";
import useSLT from "~/hooks/useSLT";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";

export default function PageCourseContent({
  courseCode,
  moduleCode,
  moduleIndex,
}: {
  courseCode: string;
  moduleCode: string;
  moduleIndex: string;
}) {
  const { lesson, isLoadingLesson } = useLesson(
    courseCode,
    moduleCode,
    parseInt(moduleIndex),
  );

  console.log("lesson", lesson);

  const { slt, isLoadingSLT } = useSLT(
    courseCode,
    moduleCode,
    parseInt(moduleIndex),
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
      {lesson && lesson.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          <div>
            <p className="text-base font-semibold leading-7 text-indigo-600">
              {slt?.sltText}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {lesson.title}
            </h1>
            <p className="text-xl leading-8">{lesson.description}</p>
          </div>
          {lesson.contentJson && editor.render()}
        </div>
      ) : lesson && !lesson.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">Lesson is not live</div>
      ) : isLoadingLesson || isLoadingSLT ? (
        <Loading />
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">Lesson is not written yet</div>
      )}
    </CourseLayout> 
  );
}
