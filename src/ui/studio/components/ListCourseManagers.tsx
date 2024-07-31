import { useState } from "react";
import { Button } from "~/components/ui/button";
import { type Course } from "~/types/db";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import DialogCourseManager from "~/ui/studio/components/dialogs/DialogCourseManager";
import { Card } from "~/components/ui/card";
import Image from "next/image";

export default function ListCourseManagers({ course }: { course: Course }) {
  const [showAddManagerDialog, setShowAddManagerDialog] =
    useState<boolean>(false);

  const ctx = api.useUtils();

  const { mutate: removeCourseManager, isLoading } =
    api.course.removeCourseManager.useMutation({
      onSuccess: () => {
        toast.success("Course manager remove!");
        void ctx.course.getCoursesByOwner.invalidate();
      },
      onError: (e) => {
        // const errorMessage = e.data?.zodError?.fieldErrors;
        toast.error("Something went wrong. Please try again.");
        console.log(e);
      },
    });

  const { data: sessionData } = useSession();
  const isOwner = course?.createdById === sessionData?.user?.id;

  return (
    <>
      <Card>
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 z-10 border-b border-accent-foreground bg-secondary bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
              >
                Course Managers
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 hidden border-b border-accent-foreground bg-secondary bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-foreground backdrop-blur backdrop-filter sm:table-cell"
              >
                {isOwner && (
                  <div className="flex place-content-end">
                    <Button
                      onClick={() => {
                        setShowAddManagerDialog(true);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {course?.contributors?.map((contributor, i) => (
              <tr key={i}>
                <td className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="flex items-center">
                    {contributor.user.image && (
                      <div className="h-11 w-11 flex-shrink-0">
                        <Image
                          width={32}
                          height={32}
                          className="h-11 w-11 rounded-full"
                          src={contributor.user.image}
                          alt=""
                        />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="font-medium text-foreground">
                        {contributor.user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-right">
                  {isOwner && (
                    <Button
                      color="red"
                      onClick={() =>
                        removeCourseManager({
                          courseCode: course.courseCode,
                          userId: contributor.id,
                        })
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ArrowPathIcon className="h-5 w-5 animate-spin" />
                      ) : (
                        <>Remove</>
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DialogCourseManager
        dialogOpen={showAddManagerDialog}
        setDialogOpen={setShowAddManagerDialog}
        course={course}
      />
    </>
  );
}
