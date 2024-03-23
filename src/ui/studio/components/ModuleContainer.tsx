// todo 2024-03-23
// 1. Fix Delete Button
// 2. Fix Edit Button
// 3. When SLT is Deleted, Lesson should be Deleted too. User should be warned and confirmed.

import { Suspense, useEffect, useMemo, useState } from "react";
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
import { DragHandle, SortableSLT } from "./slt/RowSLT";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { DndContext, closestCenter, Active, DragOverlay } from "@dnd-kit/core";
import { createSnapModifier, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

type sltI = { slt: ModuleSLT; sltIndex: number; id: string };

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

  const [activeSLT, setActiveSLT] = useState<Active | null>(null);

  // How does this help?
  // Figure out how to only invoke dnd when hamburger is touched
  const activeItem = useMemo(
    () => sltIndexes.find((s) => s.slt.id === activeSLT?.id),
    [activeSLT, sltIndexes],
  );

  useEffect(() => {
    const _slts: sltI[] = [];

    if (module) {
      module.slts.forEach((slt) => {
        _slts.push({ slt: slt, sltIndex: slt.moduleIndex, id: slt.id });
      });

      const sortedSlts = _slts.slice().sort((a, b) => a.sltIndex - b.sltIndex);
      setSltIndexes(sortedSlts);
      if (module.moduleCode == "101") {
        console.log("check600", sortedSlts);
      }
    }
  }, [module]);

  const tabs = [{ name: "Student Learning Targets", value: "main" }];

  // Todo = Variant Epic: This logic doesn't work - we get the same variant tab on each module.
  // However, the problem is more than this - module variants are not updating correctly.
  // if (variants) {
  //   variants.forEach((v) => {
  //     const _tab = { name: v.title, value: v.title };
  //     tabs.push(_tab);
  //   });
  // }

  const onDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    setSltIndexes((slts) => {
      const activeSLT = sltIndexes.findIndex((s) => s.slt.id === active.id);
      const overIndex = sltIndexes.findIndex((s) => s.slt.id === over.id);
      return arrayMove(slts, activeSLT, overIndex);
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
      _updateSlts.push({ id: s.slt.id, moduleIndex: i + 1 });
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
                onDragStart={({ active }) => {
                  setActiveSLT(active);
                }}
                onDragEnd={onDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={sltIndexes}
                  strategy={verticalListSortingStrategy}
                >
                  {sltIndexes.map((sI) => (
                    <>
                      <SortableSLT
                        slt={sI.slt}
                        module={module}
                        course={course}
                        key={sI.slt.id}
                        isLoading={false}
                      />
                    </>
                  ))}
                </SortableContext>
                {/* todo 2024-03-23 - look at codesandbox example - can imagine extracting this component and adding overlay */}
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
