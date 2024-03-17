import { Fragment, useEffect, useState } from "react";
import Card from "~/components/card";
import Button from "~/components/button";
import Loading from "~/components/loading";
import Text from "~/components/typography/text";
import { Course, Module, ModuleSLT, ModuleTest } from "~/types/db";
import { api } from "~/utils/api";
import DialogModule from "~/ui/studio/components/dialogs/DialogModule";
import CircleIcon from "~/components/icons/circle";
import CardButton from "~/components/buttons/CardButton";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import DialogSLT from "./dialogs/DialogSLT";
import DialogSLTDelete from "./dialogs/DialogSLTDelete";
import Row from "./rows/Row";
import RowSLT from "./rows/RowSLT";

export default function ListModules({ course }: { course: Course }) {
  const [optionsDialogOpen, setOptionsDialogOpen] = useState<boolean>(false);
  const [moduleDialogOpen, setModuleDialogOpen] = useState<boolean>(false);
  const [sltDialogOpen, setSltDialogOpen] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<Module | undefined>(
    undefined,
  );

  const { data: modules, isLoading } = api.module.getCourseModules.useQuery({
    courseCode: course.courseCode,
  });

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
      <NewMain
        course={course}
        modules={modules}
        setSelectedModule={setSelectedModule}
        setSltDialogOpen={setSltDialogOpen}
        setModuleDialogOpen={setModuleDialogOpen}
      />

      {modules === undefined && isLoading && <Loading />}

      <CardButton onClickHandler={addNewModule} className="w-full">
        <PlusCircleIcon className="h-6 w-6" />
        Add Module
      </CardButton>

      <DialogModule
        moduleDialogOpen={moduleDialogOpen}
        setModuleDialogOpen={setModuleDialogOpen}
        course={course}
        module={selectedModule}
      />

      {selectedModule && (
        <DialogSLT
          sltDialogOpen={sltDialogOpen}
          setSltDialogOpen={setSltDialogOpen}
          course={course}
          module={selectedModule}
        />
      )}

      {/* <DialogOptionModuleContent
        optionDialogOpen={optionsDialogOpen}
        setOptionDialogOpen={setOptionsDialogOpen}
        setModuleDialogOpen={setModuleDialogOpen}
        setSltDialogOpen={setSltDialogOpen}
      /> */}
    </>
  );
}

function NewMain({
  course,
  modules,
  setSelectedModule,
  setSltDialogOpen,
  setModuleDialogOpen,
}: {
  course: Course;
  modules?: Module[];
  setSelectedModule: (module: Module) => void;
  setSltDialogOpen: (open: boolean) => void;
  setModuleDialogOpen: (open: boolean) => void;
}) {
  return (
    <>
      {modules &&
        modules.map((module, i) => (
          <ModuleContainer
            key={i}
            course={course}
            module={module}
            setSelectedModule={setSelectedModule}
            setSltDialogOpen={setSltDialogOpen}
            setModuleDialogOpen={setModuleDialogOpen}
          />
        ))}
    </>
  );
}

function ModuleContainer({
  module,
  course,
  setSelectedModule,
  setSltDialogOpen,
  setModuleDialogOpen,
}: {
  module: Module;
  course: Course;
  setSelectedModule: (module: Module) => void;
  setSltDialogOpen: (open: boolean) => void;
  setModuleDialogOpen: (open: boolean) => void;
}) {
  const [showContent, setShowContent] = useState<boolean>(false);

  return (
    <Card>
      {/* header */}
      <div
        className="grid w-full cursor-pointer grid-cols-10 py-2"
        onClick={() => setShowContent(!showContent)}
      >
        <Row
          c1={`Module: ${module.moduleCode}`}
          c2={
            <div className="flex gap-2">
              <span>{module.title}</span>
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModule(module);
                  setModuleDialogOpen(true);
                }}
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </button> */}
            </div>
          }
          c3={`${module.slts.length} Student Learning Targets`}
          c4={
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModule(module);
                  setModuleDialogOpen(true);
                }}
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </button>
              <span>
                {showContent ? (
                  <ChevronUpIcon className="h-6 w-6" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6" />
                )}
              </span>
            </div>
          }
        />
      </div>

      {/* body */}
      {showContent && (
        <div className="grid w-full grid-cols-10 gap-y-4 border-t border-gray-200 py-4">
          {sortSLTsByIndex(module.slts).map((slt, j) => (
            <RowSLT
              course={course}
              module={module}
              slt={slt}
              key={j}
            />
          ))}

          <Row
            c1={
              <CardButton
                onClickHandler={() => {
                  setSelectedModule(module);
                  setSltDialogOpen(true);
                }}
                className="w-full"
              >
                <PlusCircleIcon className="h-6 w-6" />
                Add Student Learning Target
              </CardButton>
            }
          />
        </div>
      )}
    </Card>
  );
}

const sortSLTsByIndex = (slts: ModuleSLT[]) => {
  return slts.slice().sort((a, b) => a.moduleIndex - b.moduleIndex);
};
