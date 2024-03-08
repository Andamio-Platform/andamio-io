import { useState } from "react";
import Card from "~/components/card";
import Button from "~/components/button";
import { Course, CourseVariant } from "~/types/db";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import DialogCourseOnChain from "./dialogs/DialogCourseOnChain";

export default function ShowCourseOnchain({ course }: { course: Course }) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const ctx = api.useUtils();

  const { data: sessionData } = useSession();
  const isOwner = course.createdById === sessionData?.user?.id;

  return (
    <>
      <Card>
        <h1>Show Course Onchain Info Here</h1>
      </Card>

      <DialogCourseOnChain
        dialogOpen={showDialog}
        setDialogOpen={setShowDialog}
        course={course}
      />
    </>
  );
}
