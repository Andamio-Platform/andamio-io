import { useEffect, useState } from "react";
import Loading from "~/components/loading";
import { Course, Module, ModuleVariant } from "~/types/db";
import DialogModule from "~/ui/studio/components/dialogs/DialogModule";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import useCourseModulesAndVariants from "~/hooks/useCourseModulesAndVariants";
import ModuleContainer from "./ModuleContainer";
import { Accordion } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

export default function ModuleComponent({ course }: { course: Course }) {
  const [moduleDialogOpen, setModuleDialogOpen] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<Module | undefined>(
    undefined,
  );

  if(!course) return

  const { modules, moduleVariants, isLoading, refetch } =
    useCourseModulesAndVariants(course.courseCode, course.variants);

  useEffect(() => {
    if (moduleDialogOpen == false) {
      setSelectedModule(undefined);
    }
  }, [moduleDialogOpen]);

  function addNewModule() {
    setModuleDialogOpen(true);
  }

  return (
    <>
      <ModuleList
        course={course}
        modules={modules}
        variants={moduleVariants}
        setSelectedModule={setSelectedModule}
        setModuleDialogOpen={setModuleDialogOpen}
      />

      {modules === undefined && isLoading && <Loading />}

      <Button onClick={addNewModule} className="w-full" variant="module">
        <PlusCircleIcon className="h-6 w-6" />
        Add Module
      </Button>

      <DialogModule
        moduleDialogOpen={moduleDialogOpen}
        setModuleDialogOpen={setModuleDialogOpen}
        course={course}
        module={selectedModule}
      />
    </>
  );
}

function ModuleList({
  course,
  modules,
  variants,
  setSelectedModule,
  setModuleDialogOpen,
}: {
  course: Course;
  modules?: Module[];
  variants?: ModuleVariant[];
  setSelectedModule: (module: Module) => void;
  setModuleDialogOpen: (open: boolean) => void;
}) {
  return (
    <>
      {modules && variants && (
        <Accordion type="multiple">
          {modules.map((module, i) => (
            <ModuleContainer
              key={i}
              course={course}
              module={module}
              variants={variants}
              setSelectedModule={setSelectedModule}
              setModuleDialogOpen={setModuleDialogOpen}
            />
          ))}
        </Accordion>
      )}
    </>
  );
}
