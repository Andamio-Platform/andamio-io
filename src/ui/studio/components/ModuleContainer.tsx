import { useEffect, useMemo, useState } from "react";
import { Course, Module, ModuleSLT, ModuleVariant } from "~/types/db";
import DialogAssignment from "./dialogs/DialogAssignment";
import DialogSLT from "./dialogs/DialogSLT";
import { SortableSLT } from "./slt/RowSLT";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { DndContext, closestCenter, Active } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import AssignmentContainer from "./AssignmentContainer";
import useAssignmentByModule from "~/hooks/useAssignmentByModule";
import Link from "next/link";
import DialogModule from "./dialogs/DialogModule";
import IntroductionContainer from "./IntroductionContainer";
import useSLTs from "~/hooks/useSLTs";
import LoadingContentEditor from "./ContentEditor/ui/LoadingContentEditor";
import LoadingCard from "./LoadingCard";
import { format } from "date-fns";

type sltI = { slt: ModuleSLT; sltIndex: number; id: string };

export default function ModuleContainer({
  currentModule,
  course,
  // variants,
}: {
  currentModule: Module;
  course: Course;
  // variants?: ModuleVariant[];
}) {
  if (!course) return;


  const ctx = api.useUtils();

  const [moduleDialogOpen, setModuleDialogOpen] = useState<boolean>(false);

  const [sltDialogOpen, setSltDialogOpen] = useState<boolean>(false);
  const [assignmentDialogOpen, setAssignmentDialogOpen] =
    useState<boolean>(false);

  const [sltIndexes, setSltIndexes] = useState<sltI[]>([]);
  const [orderChanged, setOrderChanged] = useState<boolean>(false);

  const [activeSLT, setActiveSLT] = useState<Active | null>(null);

  const { assignment, isLoadingAssignment } = useAssignmentByModule(
    currentModule.id,
  );

  const { slts, isLoadingSLTs, isFetchedSLTs } = useSLTs(
    course.courseCode,
    currentModule.moduleCode,
  );

  // Todo - implement the rest of dnd-kit
  // How does this help?
  // Figure out how to only invoke dnd when hamburger is touched
  const activeItem = useMemo(
    () => sltIndexes.find((s) => s.slt.id === activeSLT?.id),
    [activeSLT, sltIndexes],
  );

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
        void ctx.slt.getModuleSLTs.invalidate({
          courseCode: course.courseCode,
          moduleCode: currentModule.moduleCode,
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

  useEffect(() => {
    const _slts: sltI[] = [];

    if (slts) {
      slts.forEach((slt) => {
        _slts.push({ slt: slt, sltIndex: slt.moduleIndex, id: slt.id });
      });

      const sortedSlts = _slts.slice().sort((a, b) => a.sltIndex - b.sltIndex);
      setSltIndexes(sortedSlts);
    }
  }, [slts, isFetchedSLTs]);

  function onUpdateSltList() {
    const _updateSlts: { id: string; moduleIndex: number }[] = [];
    sltIndexes.forEach((s, i) => {
      _updateSlts.push({ id: s.slt.id, moduleIndex: i + 1 });
    });

    updateSltIndexes(_updateSlts);
  }

  if (isLoadingSLTs) {
    return <LoadingCard>Loading SLTs</LoadingCard>;
  }

  return (
    <div
      className="mx-5 my-3 w-full rounded-md border border-secondary-foreground p-1 sm:mx-auto sm:w-[630px] md:w-[750px] lg:w-[850px] xl:w-[950px]"
      key={`${course.courseCode}-${currentModule.moduleCode}`}
    >
      <AccordionItem value={currentModule.moduleCode} disabled={moduleDialogOpen}>
        <AccordionTrigger className="flex w-full flex-row justify-between rounded-md bg-primary px-3 text-primary-foreground">
          <div className="grid w-full grid-cols-12 py-1">
            <div className="col-span-1">{currentModule.moduleCode}</div>
            <div className="col-span-3">
              <div className="flex gap-2 text-left">
                <span>{currentModule.title}</span>
              </div>
            </div>
            <div className="col-span-3">{`${currentModule.slts.length} SLTs + ${currentModule.lessons.length} Lessons`}</div>
            <div className="col-start-12">
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <DialogModule
                  moduleDialogOpen={moduleDialogOpen}
                  setModuleDialogOpen={setModuleDialogOpen}
                  course={course}
                  moduleCode={currentModule.moduleCode}
                />
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <>
            <div className="flex flex-col pt-3">
              <IntroductionContainer
                courseCode={course.courseCode}
                moduleCode={currentModule.moduleCode}
              />

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
                      module={currentModule}
                      courseCode={course.courseCode}
                      key={sI.slt.id}
                      isLoading={false}
                    />
                  ))}
                </SortableContext>
                {/* todo implelment the rest of dnd-kit - look at codesandbox example - can imagine extracting this component and adding overlay */}
              </DndContext>
              <DialogSLT
                sltDialogOpen={sltDialogOpen}
                setSltDialogOpen={setSltDialogOpen}
                courseCode={course.courseCode}
                currentModule={currentModule}
              />

              {assignment && (
                <Link
                  href={`/studio/${course.courseCode}/${currentModule.moduleCode}/assignment/${assignment.assignmentCode}`}
                >
                  <AssignmentContainer assignment={assignment} />
                </Link>
              )}
              <DialogAssignment
                assignmentDialogOpen={assignmentDialogOpen}
                setAssignmentDialogOpen={setAssignmentDialogOpen}
                courseCode={course.courseCode}
                courseModule={currentModule}
                assignment={assignment}
              />
              {currentModule.releaseDate && (
                <p className="mx-auto w-11/12 pt-5">
                  This Module is scheduled for release on{" "}
                  {format(currentModule.releaseDate, "PPPP")}
                </p>
              )}
            </div>
          </>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
