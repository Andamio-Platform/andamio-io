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

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

type sltI = { slt: ModuleSLT; sltIndex: number };

function SortableSLT({
  slt,
  module,
  course,
  index,
  isLoading,
}: {
  slt: ModuleSLT;
  module: Module;
  course: Course;
  index: number;
  isLoading: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slt.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="slt"
    >
      {index}
      <RowSLT
        course={course}
        module={module}
        slt={slt}
        isLoadingIndexUpdate={isLoading}
      />
    </div>
  );
}

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
  const ctx = api.useUtils();

  // const [showContent, setShowContent] = useState<boolean>(false);
  // const [typeOfModule, setTypeOfModule] = useState<boolean>(true);
  // const [currentTab, setCurrentTab] = useState<string>("main");
  const [sltDialogOpen, setSltDialogOpen] = useState<boolean>(false);
  const [sltIndexes, setSltIndexes] = useState<sltI[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  useEffect(() => {
    const _slts: sltI[] = [];

    if (module) {
      module.slts.forEach((slt) => {
        _slts.push({ slt: slt, sltIndex: slt.moduleIndex });
      });

      const sortedSlts = _slts.slice().sort((a, b) => a.sltIndex - b.sltIndex);
      setSltIndexes(sortedSlts);
      if (module.moduleCode == "101") {
        console.log("check600", sortedSlts);
      }
    }
  }, [module]);

  const tabs = [{ name: "Student Learning Targets", value: "main" }];

  // Todo 2024-03-19: This logic doesn't work - we get the same variant tab on each module.
  // However, the problem is more than this - module variants are not updating correctly.

  if (variants) {
    variants.forEach((v) => {
      const _tab = { name: v.title, value: v.title };
      tabs.push(_tab);
    });
  }

  const onDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    setSltIndexes((slts) => {
      const draggedSLT = sltIndexes.findIndex((s) => s.slt.id === active.id);
      const replacedSLT = sltIndexes.findIndex((s) => s.slt.id === over.id);
      return arrayMove(slts, draggedSLT, replacedSLT);
    });

    setOrderChanged(true);
  };

  useEffect(() => {
    if (orderChanged) {
      onUpdateSltList();
      setOrderChanged(false);
    }
  }, [sltIndexes]);

  // done: Need to store a current list of id -> index relationships
  // 2. Then it's that list that gets updated in the if below
  // 3. Then we should be able to use that list as the input to update function
  // 4. After that works, read the docs: how to handle multiple changes, not just swap!

  const { mutate: updateSltIndexes, isLoading: isLoadingIndexUpdate } =
    api.slt.updateModuleIndexes.useMutation({
      onSuccess: (data) => {
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some SLT inputs are missing or invalid");
        } else {
          toast.error("SLT ID taken. Please try again.");
        }
      },
      onSettled: () => {
        toast.success("Updated ordering");
      },
    });

  function onUpdateSltList() {
    const _updateSlts: { id: string; moduleIndex: number }[] = [];
    sltIndexes.forEach((s, i) => {
      _updateSlts.push({ id: s.slt.id, moduleIndex: i+1 });
    });

    console.log("check602", _updateSlts);
    updateSltIndexes(_updateSlts);
  }

  return (
    <>
      <AccordionItem value={module.moduleCode}>
        <AccordionTrigger className="flex w-full flex-row justify-between">
          <div className="grid w-full grid-cols-12 py-2">
            <div className="col-span-1">{module.moduleCode}</div>
            <div className="col-span-2">
              <div className="flex gap-2">
                <span>{module.title}</span>
              </div>
            </div>
            <div className="col-span-2">{`${module.slts.length} Student Learning Targets`}</div>
            <div className="col-start-12">
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
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <>
            <div className="flex flex-col">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={module.slts}
                  strategy={verticalListSortingStrategy}
                >
                  {sltIndexes.map((sI, i) => (
                    <SortableSLT
                      slt={sI.slt}
                      module={module}
                      course={course}
                      key={sI.slt.id}
                      index={i}
                      isLoading={false}
                    />
                  ))}
                </SortableContext>
              </DndContext>

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
