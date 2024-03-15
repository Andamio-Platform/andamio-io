import H1 from "~/components/typography/h1";
import Text from "~/components/typography/text";
import { Course } from "~/types/db";
import Button from "~/components/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DialogCourse from "~/ui/studio/components/dialogs/DialogCourse";

export default function CourseTitle({ course }: { course: Course }) {
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const { data: sessionData } = useSession();

  const isOwner = course.createdById === sessionData?.user?.id;

  return (
    <>
      <div className="flex">
        <div className="flex flex-grow flex-col gap-2">
          <H1>{course.title}</H1>
          <Text>{course.description}</Text>
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
