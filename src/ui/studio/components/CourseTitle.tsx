import { Course } from "~/types/db";
import { useSession } from "next-auth/react";
import DialogCourse from "~/ui/studio/components/dialogs/DialogCourse";

export default function CourseTitle({ course }: { course: Course }) {
  const { data: sessionData } = useSession();

  if (!course) return;

  const isOwner = course.createdById === sessionData?.user?.creatorId;

  return (
    <>
      <div className="flex items-start min-h-[150px]">
        <div className="flex flex-grow flex-col gap-2">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p>{course.description}</p>
        </div>
        {isOwner && (
          <DialogCourse
            course={course}
          />
        )}
      </div>
    </>
  );
}
