import { use, useEffect } from "react";
import Editor from "~/components/Editor";
import Loading from "~/components/loading";
import useAssignment from "~/hooks/useAssignment";
import useSLT from "~/hooks/useSLT";
import CourseLayout from "~/ui/course/components/layout/CourseLayout";

export default function PageCourseAssignmentContent({
  courseCode,
  moduleCode,
}: {
  courseCode: string;
  moduleCode: string;
}) {
  const { assignment, isLoadingAssignment } = useAssignment(
    courseCode,
    moduleCode,
  );

  const editor = new Editor({
    editable: false,
  });

  useEffect(() => {
    if (
      assignment &&
      assignment.contentJson &&
      typeof assignment.contentJson === "object"
    )
      editor.setContent(assignment.contentJson);
  }, [assignment]);

  return (
    <CourseLayout>
      {assignment && assignment.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          <div>
            {assignment.slts.map((slt) => (
              <p
                key={slt.moduleIndex}
                className="text-base font-semibold leading-7 text-indigo-600"
              >
                {slt.moduleIndex} {slt.sltText}
              </p>
            ))}
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {assignment.title}
            </h1>
            <p className="text-xl leading-8">{assignment.description}</p>
          </div>
          {assignment.contentJson && editor.render()}
        </div>
      ) : assignment && !assignment.live ? (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          assignment is not live
        </div>
      ) : isLoadingAssignment ? (
        <Loading />
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-base leading-7 text-gray-700">
          assignment is not written yet
        </div>
      )}
    </CourseLayout>
  );
}
