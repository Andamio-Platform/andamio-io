import { useState } from "react";
import { Button } from "~/components/ui/button";
import { type Course, type CourseVariant } from "~/types/db";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import DialogCourseVariant from "./dialogs/DialogCourseVariant";
import CircleIcon from "~/components/icons/circle";
import { Card } from "~/components/ui/card";

export default function ListCourseVariants({ course }: { course: Course }) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<
    CourseVariant | undefined
  >(undefined);

  const ctx = api.useUtils();

  if (!course) return;

  // Todo: replace this hook when we implement variants
  const { data: variants, isLoading: isLoadingVariants } =
    api.courseVariant.getCourseVariants.useQuery({
      courseId: course.id,
    });

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
  const isOwner = course.createdById === sessionData?.user?.id;

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
                Course Variants
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 hidden border-b border-accent-foreground bg-secondary bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-foreground backdrop-blur backdrop-filter sm:table-cell"
              >
                {isOwner && (
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
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {variants?.map((variant, i) => (
              <tr key={i}>
                <td className="py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-medium text-foreground">
                    <a
                      onClick={() => {
                        setSelectedVariant(variant);
                        setShowDialog(true);
                      }}
                      className="flex cursor-pointer items-center gap-x-2 hover:underline"
                    >
                      <span>{variant.variantCode}</span>
                      <CircleIcon />
                      <span>{variant.title}</span>
                    </a>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <span className="break-normal">{variant.description}</span>
                  </div>
                </td>
                <td className="text-right">
                  {isOwner && (
                    <Button
                      color="red"
                      // onClick={() =>
                      //   removeCourseManager({
                      //     courseCode: course.courseCode,
                      //     userId: manager.id,
                      //   })
                      // }
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

      <DialogCourseVariant
        dialogOpen={showDialog}
        setDialogOpen={setShowDialog}
        course={course}
        courseVariant={selectedVariant}
      />
    </>
  );
}
