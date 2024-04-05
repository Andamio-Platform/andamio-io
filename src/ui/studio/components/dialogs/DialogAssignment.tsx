import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { Assignment, Course, Module } from "~/types/db";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import FormInput from "~/components/form/form-input";
import { useEffect } from "react";
import useCourseModules from "~/hooks/useCourseModules";
import Loading from "~/components/loading";
import { FormCheckboxes } from "~/components/form/form-checkboxes";
import DialogForm from "~/components/form/dialog-form";

// TEST assignment.ts here!

export default function DialogAssignment({
  assignmentDialogOpen,
  setAssignmentDialogOpen,
  courseCode,
  module,
  assignment,
}: {
  assignmentDialogOpen: boolean;
  setAssignmentDialogOpen: (open: boolean) => void;
  courseCode: string;
  module: Module;
  assignment?: Assignment;
}) {
  const ctx = api.useUtils();

  const { courseModules, isLoadingCourseModules } =
    useCourseModules(courseCode);

  const sortedSlts = module.slts
    .slice()
    .sort((a, b) => a.moduleIndex - b.moduleIndex);

  const { mutate: assignmentCreate, isLoading: isLoadingAssignmentCreate } =
    api.assignment.create.useMutation({
      onSuccess: (data) => {
        toast.success("Assignment created!");
        const _module = courseModules?.find((c) => c.id === data.moduleId);
        void ctx.slt.getModuleSLTs.invalidate({
          moduleCode: _module?.moduleCode,
        });
        void ctx.module.getCourseModules.invalidate({
          courseCode: courseCode,
        });
        void ctx.assignment.getModuleAssignments.invalidate({
          moduleId: module.id,
        });
        setAssignmentDialogOpen(false);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some Assignment inputs are missing or invalid");
        } else {
          toast.error("Assignment ID taken. Please try again.");
        }
      },
    });

  const FormSchema = z.object({
    assignmentCode: z.string().min(4),
    assignmentTitle: z.string().min(1),
    sltIds: z.array(z.string().min(1)),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      assignmentCode: "",
      assignmentTitle: "",
      sltIds: [],
    },
  });

  function onSubmit(data: FieldValues) {
    assignmentCreate({
      moduleId: module.id,
      assignmentCode: data.assignmentCode,
      title: data.assignmentTitle,
      sltIds: data.sltIds,
    });
  }

  useEffect(() => {
    form.reset({
      assignmentCode: assignment?.assignmentCode ?? "",
      assignmentTitle: assignment?.title ?? "",
      sltIds: assignment?.slts.map((s) => s.id) ?? [],
    });
  }, [assignmentDialogOpen]);

  return (
    <>
      {isLoadingCourseModules ? (
        <Loading />
      ) : (
        <Form {...form}>
          <DialogForm
            openButton="Add Assignment"
            openButtonIntent="dialog"
            title="Create a new Assignment"
            buttonLabel="Create"
            buttonLoading={isLoadingAssignmentCreate}
            buttonDisabled={isLoadingAssignmentCreate}
            handleSubmit={form.handleSubmit(onSubmit)}
          >
            <p>Adding Assignment to Module {module.moduleCode}</p>

            <div className="mt-4 grid grid-cols-1 gap-y-4">
              <FormInput
                name="assignmentTitle"
                label="Enter Assignment Title"
                form={form}
              />
              <FormInput
                name="assignmentCode"
                label="Enter Assignment Code"
                form={form}
              />

              <FormCheckboxes
                name="sltIds"
                label="Assignment Student Learning Targets"
                form={form}
                info="This Assignment is an assement of the following learning targets:"
                options={sortedSlts.map((s) => ({
                  id: s.id,
                  value: s.sltText,
                  label: `${module.moduleCode}.${s.moduleIndex.toString()}: ${s.sltText}`,
                }))}
              />
            </div>
          </DialogForm>
        </Form>
      )}
    </>
  );
}
