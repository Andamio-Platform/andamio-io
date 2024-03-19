import { Button } from "~/components/ui/button";
import Row from "./Row";
import { Course, Module, ModuleSLT } from "~/types/db";
import DialogSLTDelete from "../dialogs/DialogSLTDelete";
import { useEffect, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import Input from "~/components/form/input";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "~/components/form/form-input";
import { Form } from "~/components/ui/form";

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
        <Row
          key={`${module.moduleCode}-${slt.moduleIndex}`}
          c1={
            <div className="flex flex-row gap-1 h-8 items-center">
              <button>up</button>
              <button>down</button>
              <p>
                SLT {module.moduleCode}.{slt.moduleIndex}
              </p>
            </div>
          }
          c2={
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-2 items-center justify-between pr-5">
                  {editSltText ? (
                    <div className="flex w-full flex-row justify-between">
                      <FormInput name="sltText" form={form} />
                      <Button
                        size="sm"
                        type="submit"
                        className="bg-green-800"
                      >
                        OK
                      </Button>
                    </div>
                  ) : (
                    <p>{slt.sltText}</p>
                  )}
                  {!editSltText && (
                    <Button
                      onClick={() => setEditSltText(!editSltText)}
                      size="sm"
                    >
                      EDIT
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          }
          c3={
            <Link
              href={`/studio/${course.courseCode}/${module.moduleCode}/lesson/${slt.moduleIndex}`}
            >
              <Button size="sm">Write Lesson</Button>
            </Link>
          }
          c4={
            <>
              <Button
                onClick={() => {
                  setSltDeleteDialogOpen(true);
                }}
                size="sm"
              >
                Delete SLT
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
