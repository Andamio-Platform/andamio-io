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
    if (courseOnchain) {
      setSelectedOnchainInstance(courseOnchain);
    }
  }, [courseOnchain]);

  return (
    <>
      {selectedOnChainInstance &&
        selectedOnChainInstance.map((onchainInstance, i) => (
          <Card key={i}>
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    On Chain Info (Network: {onchainInstance.network})
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    {isOwner && (
                      <div className="flex place-content-end">
                        <Button
                          onClick={() => {
                            setShowDialog(true);
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    )}
                  </th>
                </tr>
              </thead>
              <div className="grid grid-cols-2 gap-5">
                <div className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">Creator CS</div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.creatorCS}
                    </span>
                  </div>
                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">Facilitator CS</div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.facilitatorCS}
                    </span>
                  </div>
                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">Learner CS</div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.learnerCS}
                    </span>
                  </div>
                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">Module CS</div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.moduleCS}
                    </span>
                  </div>
                </div>
                <div className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">
                    CourseRef Address
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.courseRefAddress}
                    </span>
                  </div>

                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">
                    Assignment Address
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.assignmentAddress}
                    </span>
                  </div>

                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">
                    AssignmentRefUTxO
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.assignmentRefUTxO}
                    </span>
                  </div>

                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">CourseRefUTxO</div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.courseRefUTxO}
                    </span>
                  </div>
                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">
                    ModuleMintingRefUTxO
                  </div>

                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.moduleMintingRefUTxO}
                    </span>
                  </div>

                  <div className="font-light text-gray-800 pt-3 pb-1 uppercase">Instance ID</div>
                  <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                    <span className="break-normal">
                      {onchainInstance.onchainInstanceId}
                    </span>
                  </div>
                </div>
              </div>
            </table>
          </Card>
        ))}
      

      <DialogCourseOnChain
        dialogOpen={showDialog}
        setDialogOpen={setShowDialog}
        course={course}
        courseOnchain={selectedOnChainInstance}
      />
    </>
  );
}
