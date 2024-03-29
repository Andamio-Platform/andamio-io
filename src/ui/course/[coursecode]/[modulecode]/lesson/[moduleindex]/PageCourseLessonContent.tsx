import { Lesson, Slt } from "@prisma/client";
import { AlertTriangle, Leaf } from "lucide-react";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import useLesson from "~/hooks/useLesson";
import useSLT from "~/hooks/useSLT";
import useValidateCreator from "~/hooks/useValidateCreator";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";
import { api } from "~/utils/api";

export default function PageCourseContent({
  courseCode,
  moduleCode,
  moduleIndex,
}: {
  courseCode: string;
  moduleCode: string;
  moduleIndex: string;
}) {
  const { data: sessionData } = useSession();

  const { lesson, isLoadingLesson } = useLesson(
    courseCode,
    moduleCode,
    parseInt(moduleIndex),
  );

  const { isCreator } = useValidateCreator(courseCode, sessionData);

  const { slt, isLoadingSLT } = useSLT(
    courseCode,
    moduleCode,
    parseInt(moduleIndex),
  );

  const editor = new Editor({
    editable: false,
  });

  useEffect(() => {
    if (lesson && lesson.contentJson && typeof lesson.contentJson === "object")
      editor.setContent(lesson.contentJson);
  }, [lesson]);

  return (
    <CourseLayout>
      {lesson && lesson.live ? (
        <Page slt={slt} lesson={lesson} />
      ) : lesson && !lesson.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Lesson is not Live!</AlertTitle>
            <AlertDescription>
              Learners will not be able to see this lesson.
            </AlertDescription>
          </Alert>
          {isCreator && <Page slt={slt} lesson={lesson} />}
        </div>
      ) : isLoadingLesson || isLoadingSLT ? (
        <Loading />
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          <Alert variant="success">
            <Leaf className="h-4 w-4" />
            <AlertTitle>
              This is a supporting Student Learning Target
            </AlertTitle>
            <AlertDescription>
              Supporting Student Learning Targets does not have a corresponding
              lesson.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </CourseLayout>
  );
}

function Page({
  slt,
  lesson,
}: {
  slt: Slt | null | undefined;
  lesson: Lesson;
}) {
  const editor = new Editor({
    editable: false,
  });

  useEffect(() => {
    if (lesson && lesson.contentJson && typeof lesson.contentJson === "object")
      editor.setContent(lesson.contentJson);
  }, [lesson]);

  return (
    <>
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
    </>
  );
}
