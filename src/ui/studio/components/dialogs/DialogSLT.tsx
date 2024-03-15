import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import Textarea from "~/components/form/textarea";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course, Module } from "~/types/db";
import Select from "~/components/form/select";

export default function DialogSLT({
  contentDialogOpen,
  setContentDialogOpen,
  course,
  module,
}: {
  contentDialogOpen: boolean;
  setContentDialogOpen: (open: boolean) => void;
  course: Course;
  module?: Module;
}) {
  const ctx = api.useUtils();

  const { data: modules, isLoading } = api.module.getCourseModules.useQuery(
    {
      courseCode: course ? course.courseCode : "",
    },
    {
      enabled: !!course,
    },
  );

  const { register, handleSubmit, reset } = useForm();

  const { mutate: contentCreate, isLoading: isLoadingCreate } =
    api.content.create.useMutation({
      onSuccess: (data) => {
        setContentDialogOpen(false);
        toast.success("Content created!");
        const _module = modules?.find((c) => c.id === data.moduleId);
        void ctx.content.getModuleContents.invalidate({
          moduleCode: _module?.moduleCode,
        });
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Content Code taken. Please try again.");
        }
      },
    });

  function onSubmit(data: FieldValues) {
    contentCreate({
      moduleId: data.moduleId,
      contentCode: data.contentCode,
      type: data.contentType,
      title: data.title,
      slt: data.slt,
    });
  }

  useEffect(() => {
    const _initial = {
      moduleId: "",
      moduleCode: "",
      title: "",
      slt: "",
    };

    if (contentDialogOpen) {
      if (module) {
        _initial.moduleId = module.id;
        _initial.moduleCode = module.moduleCode;
      }
    }

    reset(_initial);
  }, [contentDialogOpen]);

  return (
    <DialogBox
      title="Create a new content"
      isForm={{
        buttonLabel: "Create",
        buttonLoading: isLoadingCreate,
        buttonDisabled: isLoadingCreate,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={contentDialogOpen}
      setOpen={setContentDialogOpen}
    >
      <DialogParagraph>
        Create a new module by filling in the details below.
      </DialogParagraph>

      <div className="mt-4 grid grid-cols-1 gap-y-4">
        <FormFieldset label="Content title">
          <Input name="title" register={register} />
        </FormFieldset>

        <FormFieldset label="Student learning target">
          <Textarea name="slt" register={register} rows={8} />
        </FormFieldset>

        <FormFieldset label="Content code">
          <Input name="contentCode" register={register} />
        </FormFieldset>



        <FormFieldset label="Module">
          <Select
            name="moduleId"
            register={register}
            options={
              modules
                ? modules.map((module) => ({
                    value: module.id,
                    label: `${module.title} (${module.moduleCode})`,
                  }))
                : []
            }
          />
        </FormFieldset>
      </div>
    </DialogBox>
  );
}
