import { Button } from "~/components/ui/button";
import { Course, Module, ModuleSLT } from "~/types/db";
import DialogSLTDelete from "../dialogs/DialogSLTDelete";
import { useEffect, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import SltEditInput from "~/components/form/slt-edit-input";
import LoadingCircle from "../ContentEditor/ui/icons/loading-circle";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";

export default function RowSLT({
  course,
  module,
  slt,
}: {
  course: Course;
  module: Module;
  slt: ModuleSLT;
}) {
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

  function onMoveUp() {
    console.log("up", `${module.moduleCode}.${slt.moduleIndex}`);
    const _prevSlt = module.slts.find(
      (x) => x.moduleIndex == slt.moduleIndex - 1,
    );
    if (slt.moduleIndex != 1 && _prevSlt) {
      updateSltIndexes([
        {
          id: slt.id,
          moduleIndex: slt.moduleIndex - 1,
        },
        {
          id: _prevSlt.id,
          moduleIndex: slt.moduleIndex,
        },
      ]);
    }
  }

  function onMoveDown() {
    console.log("down", `${module.moduleCode}.${slt.moduleIndex}`);
    const _nextSlt = module.slts.find(
      (x) => x.moduleIndex == slt.moduleIndex + 1,
    );
    if (slt.moduleIndex != module.slts.length && _nextSlt) {
      updateSltIndexes([
        {
          id: slt.id,
          moduleIndex: slt.moduleIndex + 1,
        },
        {
          id: _nextSlt.id,
          moduleIndex: slt.moduleIndex,
        },
      ]);
    }
  }

  useEffect(() => {
    form.reset({
      sltText: slt.sltText,
    });
  }, [editSltText]);

  return (
    <>
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
          <div className="col-span-1 flex h-8 flex-row items-center justify-center gap-1">
            {isLoadingIndexUpdate ? (
              <LoadingCircle />
            ) : (
              <div className="grid grid-cols-2 gap-5">
                <div className="col-start-1">
                  {slt.moduleIndex != 1 && (
                    <button onClick={onMoveUp}>
                      <ArrowUpIcon className="mx-1 rounded-xl bg-blue-300 text-blue-700 hover:bg-blue-400" />
                    </button>
                  )}
                </div>
                <div className="col-start-2">
                  {slt.moduleIndex != module.slts.length && (
                    <button onClick={onMoveDown}>
                      <ArrowDownIcon className="mx-1 rounded-xl bg-blue-300 text-blue-700 hover:bg-blue-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
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
    </>
  );
}
