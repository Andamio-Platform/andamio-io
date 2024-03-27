import { Course } from "~/types/db";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DialogCourse from "~/ui/studio/components/dialogs/DialogCourse";

export default function CourseTitle({ course }: { course: Course }) {
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const { data: sessionData } = useSession();

  if (!course) return

  const isOwner = course.createdById === sessionData?.user?.creatorId;

  return (
    <>
      <div className="flex">
        <div className="flex flex-grow flex-col gap-2">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>
        {isOwner && (
          <div>
            <Button
              onClick={() => {
                setCourseDialogOpen(true);
              }}
            >
              Edit course
            </Button>
          </div>
        )}
      </div>
      <DialogCourse
        courseDialogOpen={courseDialogOpen}
        setCourseDialogOpen={setCourseDialogOpen}
        course={course}
      />
    </>
  );
}
