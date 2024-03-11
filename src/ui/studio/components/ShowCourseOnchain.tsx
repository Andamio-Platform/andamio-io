import { useEffect, useState } from "react";
import Card from "~/components/card";
import Button from "~/components/button";
import { Course, CourseOnChainInstance, CourseVariant } from "~/types/db";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import DialogCourseOnChain from "./dialogs/DialogCourseOnChain";

export default function ShowCourseOnchain({ course }: { course: Course }) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedOnChainInstance, setSelectedOnchainInstance] = useState<
    CourseOnChainInstance | undefined
  >(undefined);

  const ctx = api.useUtils();

  const { data: sessionData } = useSession();
  const isOwner = course.createdById === sessionData?.user?.id;

  const { data: courseOnchain } =
    api.courseOnChainInstance.getCourseOnchainInstances.useQuery({
      courseId: course.id,
    });

  useEffect(() => {
    if(courseOnchain) {
      setSelectedOnchainInstance(courseOnchain)
    }
  }, [courseOnchain])

  return (
    <>
      <Card>
        <h1>Show Course Onchain Info Here</h1>
        {selectedOnChainInstance && <pre>{JSON.stringify(selectedOnChainInstance, null, 2)}</pre>}
        {isOwner && (
          <>
            {selectedOnChainInstance && selectedOnChainInstance[0] ? (
              <div className="flex place-content-end">
                <Button
                  onClick={() => {
                    setShowDialog(true);
                  }}
                >
                  Update
                </Button>
              </div>
            ) : (
              <div className="flex place-content-end">
                <Button
                  onClick={() => {
                    setShowDialog(true);
                  }}
                >
                  Add
                </Button>
              </div>
            )}
          </>
        )}
      </Card>

      <DialogCourseOnChain
        dialogOpen={showDialog}
        setDialogOpen={setShowDialog}
        course={course}
        courseOnchain={selectedOnChainInstance}
      />
    </>
  );
}
