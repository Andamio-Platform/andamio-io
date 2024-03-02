import { Fragment, useEffect, useState } from "react";
import Card from "~/components/card";
import Button from "~/components/button";
import Loading from "~/components/loading";
import Text from "~/components/typography/text";
import { Course, Module } from "~/types/db";
import { api } from "~/utils/api";
import ListContent from "./ListContent";
import DialogModule from "~/ui/studio/components/dialogs/DialogModule";
import DialogContent from "~/ui/studio/components/dialogs/DialogContent";
import DialogOptionModuleContent from "~/ui/studio/components/dialogs/DialogOptionModuleContent";
import CircleIcon from "~/components/icons/circle";
import CardButton from "~/components/buttons/CardButton";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ListModules({ course }: { course: Course }) {
  const [optionsDialogOpen, setOptionsDialogOpen] = useState<boolean>(false);
  const [moduleDialogOpen, setModuleDialogOpen] = useState<boolean>(false);
  const [contentDialogOpen, setContentDialogOpen] = useState<boolean>(false);
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
        modules={modules}
        setSelectedModule={setSelectedModule}
        setContentDialogOpen={setContentDialogOpen}
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

      <DialogContent
        contentDialogOpen={contentDialogOpen}
        setContentDialogOpen={setContentDialogOpen}
        course={course}
        module={selectedModule}
      />

      <DialogOptionModuleContent
        optionDialogOpen={optionsDialogOpen}
        setOptionDialogOpen={setOptionsDialogOpen}
        setModuleDialogOpen={setModuleDialogOpen}
        setContentDialogOpen={setContentDialogOpen}
      />

      {/* <Card>
        {modules === undefined && isLoading && <Loading />}

        {modules && (
          <>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle">
                    <table className="min-w-full border-separate border-spacing-0">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                          >
                            Course Modules
                          </th>
                          <th
                            scope="col"
                            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                          >
                            <div className="flex place-content-end">
                              <Button
                                onClick={() => {
                                  setOptionsDialogOpen(true);
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {modules.length > 0 ? (
                          modules.map((module, i) => (
                            <Fragment key={i}>
                              <tr>
                                <td
                                  className="py-5 pl-4 pr-3 text-sm sm:pl-0"
                                  colSpan={2}
                                >
                                  <div className="font-medium text-gray-900">
                                    <a
                                      onClick={() => {
                                        setSelectedModule(module);
                                        setModuleDialogOpen(true);
                                      }}
                                      className="flex cursor-pointer items-center gap-x-2 hover:underline"
                                    >
                                      <span>{module.moduleCode}</span>
                                      <CircleIcon />
                                      <span>{module.title}</span>
                                    </a>
                                  </div>
                                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                    <span className="break-normal">
                                      {module.description}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td className="px-3">
                                  <ListContent
                                    course={course}
                                    module={module}
                                  />
                                </td>
                              </tr>
                            </Fragment>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="py-5 text-center">
                              <Text>
                                No modules (to be replaced with illustrative
                                picture)
                              </Text>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Card> */}
    </>
  );
}

function NewMain({
  modules,
  setSelectedModule,
  setContentDialogOpen,
  setModuleDialogOpen,
}: {
  modules?: Module[];
  setSelectedModule: (module: Module) => void;
  setContentDialogOpen: (open: boolean) => void;
  setModuleDialogOpen: (open: boolean) => void;
}) {
  return (
    <>
      {modules &&
        modules.map((module, i) => (
          <ModuleContainer
            key={i}
            module={module}
            setSelectedModule={setSelectedModule}
            setContentDialogOpen={setContentDialogOpen}
            setModuleDialogOpen={setModuleDialogOpen}
          />
        ))}
    </>
  );
}

function ModuleContainer({
  module,
  setSelectedModule,
  setContentDialogOpen,
  setModuleDialogOpen,
}: {
  module: Module;
  setSelectedModule: (module: Module) => void;
  setContentDialogOpen: (open: boolean) => void;
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
          c3={`${module.contents.length} Topics`}
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
          {module.contents.map((content, j) => (
            <Row
              key={`${module.moduleCode}-${content.contentCode}`}
              c1={`Content: ${content.contentCode}`}
              c2={
                <Link
                  href={`/studio/${module.course.courseCode}/${module.moduleCode}/${content.contentCode}`}
                >
                  <div className="flex flex-col gap-2">
                    <p>{content.title}</p>
                    <p className="text-sm text-gray-500">{content.slt}</p>
                  </div>
                </Link>
              }
              c3={<></>}
              c4={<></>}
            />
          ))}

          <Row
            c1={
              <CardButton
                onClickHandler={() => {
                  setSelectedModule(module);
                  setContentDialogOpen(true);
                }}
                className="w-full"
              >
                <PlusCircleIcon className="h-6 w-6" />
                Add Content
              </CardButton>
            }
          />
        </div>
      )}
    </Card>
  );
}

// pretty hackish? but it works
function Row({
  c1,
  c2,
  c3,
  c4,
}: {
  c1: React.ReactNode;
  c2?: React.ReactNode;
  c3?: React.ReactNode;
  c4?: React.ReactNode;
}) {
  return (
    <Fragment>
      <div className={`${c2 ? "col-span-2" : "col-span-10"} text-gray-400`}>
        {c1}
      </div>
      {c2 && <div className="col-span-6 items-start">{c2}</div>}
      {c3 && <div className="col-span-1">{c3}</div>}
      {c4 && <div className="col-span-1 justify-end">{c4}</div>}
    </Fragment>
  );
}
