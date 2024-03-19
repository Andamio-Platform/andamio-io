import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import { Course, Module } from "~/types/db";
import { Button } from "~/components/ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import FormInput from "~/components/form/form-input";
import { useEffect } from "react";
import FormSelect from "~/components/form/form-select";

export default function DialogSLT({
  sltDialogOpen,
  setSltDialogOpen,
  course,
  module,
}: {
  sltDialogOpen: boolean;
  setSltDialogOpen: (open: boolean) => void;
  course: Course;
  module: Module;
}) {
  const ctx = api.useUtils();

  // todo: replace with hook
  const { data: modules, isLoading } = api.module.getCourseModules.useQuery(
    {
      courseCode: course ? course.courseCode : "",
    },
    {
      enabled: !!course,
    },
  );

  const { mutate: sltCreate, isLoading: isLoadingCreate } =
    api.slt.create.useMutation({
      onSuccess: (data) => {
        setSltDialogOpen(false);
        toast.success("Student Learning Target  created!");
        const _module = modules?.find((c) => c.id === data.moduleId);
        void ctx.slt.getModuleSLTs.invalidate({
          moduleCode: _module?.moduleCode,
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
    sltText: z.string().min(6),
    moduleId: z.string().min(1),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sltText: "",
      moduleId: module.id,
    },
  });

  function onSubmit(data: FieldValues) {
    sltCreate({
      moduleId: data.moduleId,
      moduleIndex: module.slts.length + 1,
      sltText: data.sltText,
    });
  }

  useEffect(() => {
    form.reset({
      sltText: "",
      moduleId: module.id ?? "",
    });
  }, [sltDialogOpen]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogBox
          title="Create a new Student Learning Target"
          isForm={{
            buttonLabel: "Create",
            buttonLoading: isLoadingCreate,
            buttonDisabled: isLoadingCreate,
          }}
          open={sltDialogOpen}
          setOpen={setSltDialogOpen}
        >
          <DialogParagraph>
            Adding SLT {module.moduleCode}.{module.slts.length + 1}
          </DialogParagraph>
          {/* Todo: look at the line above. If a different module is selected from the menu below, then the SLT id should update dynamically */}


          <div className="mt-4 grid grid-cols-1 gap-y-4">
            <FormInput name="sltText" label="Enter SLT Text" form={form} />

            <FormSelect
              name="moduleId"
              form={form}
              options={
                modules
                  ? modules.map((module) => ({
                      value: module.id,
                      label: `${module.title} (${module.moduleCode})`,
                    }))
                  : []
              }
            />
          </div>
        </DialogBox>
      </form>
    </Form>
  );
}
