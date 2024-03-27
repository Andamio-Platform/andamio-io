// todo 2024-03-26
// 1. Fix Delete Button
// 2. Fix Edit Button
// 3. When SLT is Deleted, Lesson should be Deleted too. User should be warned and confirmed.

import { useEffect, useMemo, useState } from "react";
import {
  Assignment,
  Course,
  Module,
  ModuleSLT,
  ModuleVariant,
} from "~/types/db";
import CardButton from "~/components/buttons/CardButton";
import DialogAssignment from "./dialogs/DialogAssignment";
import DialogSLT from "./dialogs/DialogSLT";
import { SortableSLT } from "./slt/RowSLT";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { DndContext, closestCenter, Active, DragOverlay } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { GearIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import AssignmentContainer from "./AssignmentContainer";
import useAssignments from "~/hooks/useAssignments";
import Link from "next/link";

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
  if (!course) return

  const ctx = api.useUtils();

  // const [showContent, setShowContent] = useState<boolean>(false);
  // const [typeOfModule, setTypeOfModule] = useState<boolean>(true);
  // const [currentTab, setCurrentTab] = useState<string>("main");
  const [sltDialogOpen, setSltDialogOpen] = useState<boolean>(false);
  const [assignmentDialogOpen, setAssignmentDialogOpen] =
    useState<boolean>(false);

  const [sltIndexes, setSltIndexes] = useState<sltI[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  const [activeSLT, setActiveSLT] = useState<Active | null>(null);

  const { assignments } = useAssignments(course.id, module.id);

  // Todo
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
    }
  }, [module]);

  // Todo = Variant Epic: This logic doesn't work - we get the same variant tab on each module.
  // However, the problem is more than this - module variants are not updating correctly.
  // const tabs = [{ name: "Student Learning Targets", value: "main" }];
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

  // Todo: "Autosave"
  // Implement delay logic so that save doesn't happen right away

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

    updateSltIndexes(_updateSlts);
  }

  return (
    <div className="mx-5 my-3 w-full rounded-md border border-neutral-900 p-1 sm:mx-auto sm:w-[630px] md:w-[750px] lg:w-[850px] xl:w-[950px]">
      <AccordionItem value={module.moduleCode}>
        <AccordionTrigger className="flex w-full flex-row justify-between rounded-md bg-neutral-900 px-3 text-white">
          <div className="grid w-full grid-cols-12 py-2">
            <div className="col-span-1">{module.moduleCode}</div>
            <div className="col-span-2">
              <div className="flex gap-2">
                <span>{module.title}</span>
              </div>
            </div>
            <div className="col-span-3">{`${module.slts.length} SLTs + ${module.lessons.length} Lessons`}</div>
            <div className="col-start-12">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModule(module);
                    setModuleDialogOpen(true);
                  }}
                >
                  <GearIcon />
                </button>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <>
            <div className="flex flex-col pt-3">
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
                    <SortableSLT
                      slt={sI.slt}
                      module={module}
                      courseCode={course.courseCode}
                      key={sI.slt.id}
                      isLoading={false}
                    />
                  ))}
                </SortableContext>
                {/* todo 2024-03-23 - look at codesandbox example - can imagine extracting this component and adding overlay */}
              </DndContext>

              <CardButton
                onClickHandler={() => {
                  setSltDialogOpen(true);
                }}
                className="w-full"
              >
                <PlusCircledIcon />
                Add Student Learning Target
              </CardButton>
              {/* todo - map this: */}
              {assignments && assignments[0] && (
                <Link
                  href={`/studio/${course.courseCode}/${module.moduleCode}/assignment/${assignments[0].assignmentCode}`}
                >
                  <AssignmentContainer assignment={assignments[0]} />
                </Link>
              )}

              <CardButton
                onClickHandler={() => {
                  setAssignmentDialogOpen(true);
                }}
                className="w-full"
              >
                <PlusCircledIcon />
                Add Assignment{" "}
                {assignments &&
                  assignments.length > 0 &&
                  "Is multiple assignments a premium feature?"}
              </CardButton>
            </div>
          </>
        </AccordionContent>
      </AccordionItem>
      {module && (
        <DialogSLT
          sltDialogOpen={sltDialogOpen}
          setSltDialogOpen={setSltDialogOpen}
          courseCode={course.courseCode}
          module={module}
        />
      )}
      {module && (
        <DialogAssignment
          assignmentDialogOpen={assignmentDialogOpen}
          setAssignmentDialogOpen={setAssignmentDialogOpen}
          courseCode={course.courseCode}
          module={module}
        />
      )}
    </div>
  );
}
