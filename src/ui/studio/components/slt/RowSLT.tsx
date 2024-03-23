import { Button } from "~/components/ui/button";
import { Course, Module, ModuleSLT } from "~/types/db";
import DialogSLTDelete from "../dialogs/DialogSLTDelete";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import SltEditInput from "~/components/form/slt-edit-input";
import LoadingCircle from "../ContentEditor/ui/icons/loading-circle";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  HamburgerMenuIcon,
  DragHandleDots2Icon,
} from "@radix-ui/react-icons";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableSltContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

// RowSLT is exported for use outside of a Draggable Element
export function RowSLT({
  course,
  module,
  slt,
  isLoadingIndexUpdate,
  setNodeRef
}: {
  course: Course;
  module: Module;
  slt: ModuleSLT;
  isLoadingIndexUpdate: boolean;
  setNodeRef: (node: HTMLElement | null) => void
}) {
  const { attributes, listeners, ref } = useContext(SortableSltContext);

  const ctx = api.useUtils();

  const [sltDeleteDialogOpen, setSltDeleteDialogOpen] =
    useState<boolean>(false);
  const [editSltText, setEditSltText] = useState<boolean>(false);

  const { mutate: sltTextUpdate, isLoading: isLoadingUpdate } =
    api.slt.update.useMutation({
      onSuccess: (data) => {
        toast.success("Student Learning Target updated!");
        setEditSltText(false);
        void ctx.slt.getModuleSLTs.invalidate({
          moduleCode: module.moduleCode,
        });
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
    });

  const FormSchema = z.object({
    sltText: z.string().min(1),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sltText: "",
    },
  });

  // Bring back Field Values from react-hook-form + clean this up
  function onSubmit(data: FieldValues) {
    sltTextUpdate({
      id: slt.id,
      moduleId: slt.moduleId,
      moduleIndex: slt.moduleIndex,
      sltText: data.sltText,
    });
  }

  // function onMoveUp() {
  //   console.log("up", `${module.moduleCode}.${slt.moduleIndex}`);
  //   const _prevSlt = module.slts.find(
  //     (x) => x.moduleIndex == slt.moduleIndex - 1,
  //   );
  //   if (slt.moduleIndex != 1 && _prevSlt) {
  //     updateSltIndex({
  //       id: slt.id,
  //       moduleIndex: slt.moduleIndex - 1,
  //     });
  //     updateSltIndex({
  //       id: _prevSlt.id,
  //       moduleIndex: slt.moduleIndex,
  //     });
  //   }
  // }

  // function onMoveDown() {
  //   console.log("down", `${module.moduleCode}.${slt.moduleIndex}`);
  //   const _nextSlt = module.slts.find(
  //     (x) => x.moduleIndex == slt.moduleIndex + 1,
  //   );
  //   if (slt.moduleIndex != module.slts.length && _nextSlt) {
  //     updateSltIndex({
  //       id: slt.id,
  //       moduleIndex: slt.moduleIndex + 1,
  //     });
  //     updateSltIndex({
  //       id: _nextSlt.id,
  //       moduleIndex: slt.moduleIndex,
  //     });
  //   }
  // }

  useEffect(() => {
    form.reset({
      sltText: slt.sltText,
    });
  }, [editSltText]);

  return (
    <div ref={setNodeRef}>
      <DialogSLTDelete
        sltDeleteDialogOpen={sltDeleteDialogOpen}
        setSltDeleteDialogOpen={setSltDeleteDialogOpen}
        slt={slt}
        course={course}
        module={module}
      />
      {module && (
        <div
          className={`grid w-full grid-cols-12 py-2 ${isLoadingIndexUpdate && "opacity-50"}`}
          key={`${module.moduleCode}-${slt.moduleIndex}`}
        >
          <div className="col-span-1">
            <p className="px-2 font-semibold tracking-wide">
              {module.moduleCode}.{slt.moduleIndex}
            </p>
          </div>
          <div className="col-span-7">
            <ToggleEditableField
              name="sltText"
              form={form}
              intent="slt"
              formTextSize="md"
              onSubmit={onSubmit}
              editText={editSltText}
              setEditText={setEditSltText}
              text={slt.sltText}
            />
          </div>
          <div className="col-span-1 col-start-11">
            <Link
              href={`/studio/${course.courseCode}/${module.moduleCode}/lesson/${slt.moduleIndex}`}
            >
              <Button variant="lesson" size="sm">
                Write Lesson
              </Button>
            </Link>
          </div>
          <div className="col-span-1 col-start-12">
            <Button
              onClick={() => {
                setSltDeleteDialogOpen(true);
              }}
              variant="delete"
              size="sm"
            >
              Delete SLT
            </Button>
          </div>
          
        </div>
      )}
    </div>
  );
}

// SortableSLT
export function SortableSLT({
  slt,
  module,
  course,
  isLoading,
}: {
  slt: ModuleSLT;
  module: Module;
  course: Course;
  isLoading: boolean;
}) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: slt.id,
    transition: { duration: 500, easing: "ease-in" },
  });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <SortableSltContext.Provider value={context}>
      <div style={style} className="slt">
        <div className="flex flex-row gap-1">
          <DragHandle />
          <RowSLT
            course={course}
            module={module}
            slt={slt}
            isLoadingIndexUpdate={isLoading}
            {...attributes}
            {...listeners}
            setNodeRef={setNodeRef}
          />
        </div>
      </div>
    </SortableSltContext.Provider>
  );
}

// DragHandle
export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableSltContext);

  return (
    <button className="hover:bg-gray-200 transition-colors duration-500 ease-in-out rounded-md px-1" {...attributes} {...listeners} ref={ref}>
      <DragHandleDots2Icon />
    </button>
  );
}


{/* <button class="bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors duration-500 ease-in-out">
  Hover over me
</button> */}
