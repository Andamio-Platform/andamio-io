import { Suspense, useEffect, useState } from "react";
import { Course, Module, ModuleSLT, ModuleVariant } from "~/types/db";
import CardButton from "~/components/buttons/CardButton";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import DialogSLT from "./dialogs/DialogSLT";
import Row from "../../../components/ui/row";
import RowSLT from "./slt/RowSLT";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const sortSLTsByIndex = (slts: ModuleSLT[]) => {
  return slts.slice().sort((a, b) => a.moduleIndex - b.moduleIndex);
};

export default function ModuleContainer({
  module,
  course,
  variants,
  setSelectedModule,
  setModuleDialogOpen,
}: {
  module: Module;
  course: Course;
  variants?: ModuleVariant[];
  setSelectedModule: (module: Module) => void;
  setModuleDialogOpen: (open: boolean) => void;
}) {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [typeOfModule, setTypeOfModule] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>("main");
  const [sltDialogOpen, setSltDialogOpen] = useState<boolean>(false);

  const tabs = [{ name: "Student Learning Targets", value: "main" }];

  // Todo 2024-03-19: This logic doesn't work - we get the same variant tab on each module.
  // However, the problem is more than this - module variants are not updating correctly.

  if (variants) {
    variants.forEach((v) => {
      const _tab = { name: v.title, value: v.title };
      tabs.push(_tab);
    });
  }

  return (
    <>
      <AccordionItem value={module.moduleCode}>
        <AccordionTrigger className="flex w-full flex-row justify-between">
          <Row
            c1={`Module: ${module.moduleCode}`}
            c2={
              <div className="flex gap-2">
                <span>{module.title}</span>
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
        </AccordionTrigger>
        <AccordionContent>
          <>
            <div className="flex flex-col">
              {sortSLTsByIndex(module.slts).map((slt, j) => (
                  <RowSLT course={course} module={module} slt={slt} key={j} />
              ))}

              <Row
                c1={
                  <CardButton
                    onClickHandler={() => {
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
          </>
        </AccordionContent>
      </AccordionItem>
      {module && (
        <DialogSLT
          sltDialogOpen={sltDialogOpen}
          setSltDialogOpen={setSltDialogOpen}
          course={course}
          module={module}
        />
      )}
    </>
  );
}
