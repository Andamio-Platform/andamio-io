import { Button } from "~/components/ui/button";
import type { Course, Module, ModuleSLT } from "~/types/db";
import DialogSLTDelete from "../dialogs/DialogSLTDelete";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  courseCode,
  isLoading, // todo
}: {
  slt: ModuleSLT;
  module: Module;
  courseCode: string;
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
    transition: { duration: 150, easing: "ease-in" },
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
            courseCode={courseCode}
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
  courseCode,
  module,
  slt,
}: {
  courseCode: string;
  module: Module;
  slt: ModuleSLT;
}) {
  if (!module) return;

  const ctx = api.useUtils();
  const { setNodeRef } = useContext(SortableSltContext);

  const [sltDeleteDialogOpen, setSltDeleteDialogOpen] =
    useState<boolean>(false);
  const [editSltText, setEditSltText] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setEditSltText(false);
      }
    },
    [],
  );

  const { mutate: sltTextUpdate, isLoading: isLoadingUpdate } =
    api.slt.update.useMutation({
      onSuccess: () => {
        toast.success("Student Learning Target updated!");
        setEditSltText(false);
        void ctx.slt.getModuleSLTs.invalidate({
          courseCode: courseCode,
          moduleCode: module.moduleCode,
        });
        void ctx.module.getCourseModules.invalidate({
          courseCode: courseCode,
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
    <div ref={setNodeRef} onKeyDown={handleKeyDown}>
      {module && (
        <div
          className={`mx-auto my-1 grid h-[55px] w-full grid-cols-12 py-2 sm:w-[535px] md:w-[630px] lg:w-[700px] xl:w-[850px] 2xl:w-[975px] ${isLoadingUpdate && "opacity-50"}`}
          key={`${module.moduleCode}-${slt.moduleIndex}`}
        >
          <div className="col-span-1 flex items-center">
            <p className="px-2 tracking-wide">
              {module.moduleCode}.{slt.moduleIndex}
            </p>
          </div>
          <div className="col-span-8 flex w-full items-center">
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

          <div className="col-span-3 col-start-10 flex items-center justify-between px-8">
            <Link
              href={`/studio/${courseCode}/${module.moduleCode}/lesson/${slt.moduleIndex}`}
              className=""
            >
              <Button intent="ghost" size="icon">
                <FileIcon className="h-[14px] w-[14px] xl:h-[16px] xl:w-[16px]" />
                <p className="mx-1 text-xs lg:text-sm">Lesson</p>
              </Button>
            </Link>
            <DialogSLTDelete
              sltDeleteDialogOpen={sltDeleteDialogOpen}
              setSltDeleteDialogOpen={setSltDeleteDialogOpen}
              slt={slt}
              courseCode={courseCode}
              module={module}
            />
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
      className="duration-250 rounded-md px-1 transition-colors ease-in-out hover:bg-accent"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <DragHandleDots2Icon />
    </button>
  );
}
