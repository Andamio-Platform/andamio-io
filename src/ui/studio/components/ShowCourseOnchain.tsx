import { useEffect, useState } from "react";
import Card from "~/components/card";
import { Button } from "~/components/ui/button";
import { Course, CourseOnChainInstance, CourseVariant } from "~/types/db";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import DialogCourseOnChain from "./dialogs/DialogCourseOnChain";
import { Network } from "@prisma/client";
import FormFieldset from "~/components/form/form-fieldset";
import Select from "~/components/form/select";
import SelectNetwork from "~/components/select-network";

export default function ShowCourseOnchain({
  course,
  network,
}: {
  course: Course;
  network: Network;
}) {
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
      network: network,
    });

  useEffect(() => {
    if (courseOnchain) {
      setSelectedOnchainInstance(courseOnchain);
    }
  }, [courseOnchain]);

  return (
    <>
      {selectedOnChainInstance ? (
        <Card>
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  On Chain Info (Network: {selectedOnChainInstance.network})
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
                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  Creator CS
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.creatorCS}
                  </span>
                </div>
                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  Facilitator CS
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.facilitatorCS}
                  </span>
                </div>
                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  Learner CS
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.learnerCS}
                  </span>
                </div>
                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  Module CS
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.moduleCS}
                  </span>
                </div>
              </div>
              <div className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  CourseRef Address
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.courseRefAddress}
                  </span>
                </div>

                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  Assignment Address
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.assignmentAddress}
                  </span>
                </div>

                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  AssignmentRefUTxO
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.assignmentRefUTxO}
                  </span>
                </div>

                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  CourseRefUTxO
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.courseRefUTxO}
                  </span>
                </div>
                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  ModuleMintingRefUTxO
                </div>

                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.moduleMintingRefUTxO}
                  </span>
                </div>

                <div className="pb-1 pt-3 font-light uppercase text-gray-800">
                  Instance ID
                </div>
                <div className="mt-1 flex items-center gap-x-2 font-mono leading-5 text-gray-900">
                  <span className="break-normal">
                    {selectedOnChainInstance.onchainInstanceId}
                  </span>
                </div>
              </div>
            </div>
          </table>
        </Card>
      ) : (
        <>
          <div className="flex place-content-end">
            <Button
              onClick={() => {
                setShowDialog(true);
              }}
            >
              Add On-Chain Info
            </Button>
          </div>
        </>
      )}

      <DialogCourseOnChain
        dialogOpen={showDialog}
        setDialogOpen={setShowDialog}
        course={course}
        courseOnchain={selectedOnChainInstance}
        selectedNetwork={network}
      />
    </>
  );
}
