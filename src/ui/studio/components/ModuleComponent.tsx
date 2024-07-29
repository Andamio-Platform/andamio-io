import { useState } from "react";
import Loading from "~/components/loading";
import { type Course, type Module } from "~/types/db";
import DialogModule from "~/ui/studio/components/dialogs/DialogModule";
// import useCourseModulesAndVariants from "~/hooks/useCourseModulesAndVariants";
import ModuleContainer from "./ModuleContainer";
import { Accordion } from "~/components/ui/accordion";
import useCourseModules from "~/hooks/course/useCourseModules";

export default function ModuleComponent({ course }: { course: Course }) {
  const [moduleDialogOpen, setModuleDialogOpen] = useState<boolean>(false);

  if (!course) return;

  // const { modules, moduleVariants, isLoading, refetch } =
  //   useCourseModulesAndVariants(course.courseCode, course.variants);

  const { courseModules, isLoadingCourseModules } = useCourseModules(
    course.courseCode,
  );

  return (
    <>
      <ModuleList course={course} courseModules={courseModules} />

      {courseModules === undefined && isLoadingCourseModules && <Loading />}

      <div className="flex w-full justify-center">
        <DialogModule
          moduleDialogOpen={moduleDialogOpen}
          setModuleDialogOpen={setModuleDialogOpen}
          course={course}
          moduleCode=""
        />
      </div>
    </>
  );
}

function ModuleList({
  course,
  courseModules,
}: {
  course: Course;
  courseModules?: Module[];
}) {
  if (!!courseModules) {
    const sortedCourseModules = courseModules
      .slice()
      .sort((a, b) => a.moduleCode.localeCompare(b.moduleCode));
    return (
      <>
        {courseModules && (
          <Accordion type="multiple">
            {sortedCourseModules.map((module, i) => (
              <ModuleContainer key={i} course={course} currentModule={module} />
            ))}
          </Accordion>
        )}
      </>
    );
  }
}
