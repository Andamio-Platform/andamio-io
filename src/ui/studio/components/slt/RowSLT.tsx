import { Button } from "~/components/ui/button";
import type { Course, Module, ModuleSLT } from "~/types/db";
import DialogSLTDelete from "../dialogs/DialogSLTDelete";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CrossCircledIcon,
  DragHandleDots2Icon,
  FileIcon,
} from "@radix-ui/react-icons";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
  setNodeRef: (node: HTMLElement | null) => void;
}

const SortableSltContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref: () => {
    return;
  },
  setNodeRef: () => {
    return;
  },
});

// SortableSLT
export function SortableSLT({
  slt,
  module,
  course,
  isLoading, // todo
}: {
  slt: ModuleSLT;
  module: Module;
  course: Course;
  isLoading: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: slt.id,
    transition: { duration: 350, easing: "ease-in" },
  });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
      setNodeRef: setNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef, setNodeRef],
  );

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <SortableSltContext.Provider value={context}>
      <div style={style}>
        <div className="mx-auto my-1 flex w-11/12 flex-row gap-1">
          <DragHandle />
          <RowSLT
            course={course}
            module={module}
            slt={slt}
            {...attributes}
            {...listeners}
          />
        </div>
      </div>
    </SortableSltContext.Provider>
  );
}

// RowSLT is exported for use outside of a Draggable Element
export function RowSLT({
  course,
  module,
  slt,
}: {
  course: Course;
  module: Module;
  slt: ModuleSLT;
}) {
  const ctx = api.useUtils();
  const { setNodeRef } = useContext(SortableSltContext);

  const [sltDeleteDialogOpen, setSltDeleteDialogOpen] =
    useState<boolean>(false);
  const [editSltText, setEditSltText] = useState<boolean>(false);

  const { mutate: sltTextUpdate, isLoading: isLoadingUpdate } =
    api.slt.update.useMutation({
      onSuccess: () => {
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

  function onSubmit(data: FieldValues) {
    sltTextUpdate({
      id: slt.id,
      moduleId: slt.moduleId,
      moduleIndex: slt.moduleIndex,
      sltText: data.sltText,
    });
  }

  useEffect(() => {
    if (form && slt.sltText) {
      form.reset({
        sltText: slt.sltText,
      });
    }
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
          className={`mx-auto my-1 grid w-full h-[55px] grid-cols-12 py-2 sm:w-[535px] md:w-[645px] lg:w-[735px] xl:w-[825px] ${isLoadingUpdate && "opacity-50"}`}
          key={`${module.moduleCode}-${slt.moduleIndex}`}
        >
          <div className="col-span-1 flex items-center">
            <p className="px-2 font-semibold tracking-wide">
              {module.moduleCode}.{slt.moduleIndex}
            </p>
          </div>
          <div className="col-span-9 flex w-full items-center">
            <ToggleEditableField
              name="sltText"
              form={form}
              intent="slt"
              formTextSize="slt"
              onSubmit={onSubmit}
              editText={editSltText}
              setEditText={setEditSltText}
              text={slt.sltText}
            />
          </div>

          <div className="col-span-2 col-start-11 flex items-center justify-between px-8">
            <Button variant="ghost" size="icon">
              <Link
                href={`/studio/${course.courseCode}/${module.moduleCode}/lesson/${slt.moduleIndex}`}
              >
                <FileIcon width="18" height="18" />
              </Link>
            </Button>
            <Button
              onClick={() => {
                setSltDeleteDialogOpen(true);
              }}
              variant="ghost"
              size="icon"
            >
              <CrossCircledIcon width="18" height="18" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// DragHandle
export function DragHandle() {
  const { attributes, listeners, setNodeRef } = useContext(SortableSltContext);

  return (
    <button
      className="rounded-md px-1 transition-colors duration-500 ease-in-out hover:bg-gray-200"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <DragHandleDots2Icon />
    </button>
  );
}
