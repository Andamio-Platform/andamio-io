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

  const { data: modules, isLoading } = api.module.getCourseModules.useQuery(
    {
      courseCode: course ? course.courseCode : "",
    },
    {
      enabled: !!course,
    },
  );

  const { register, handleSubmit, reset } = useForm();

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

  function onSubmit(data: FieldValues) {
    sltCreate({
      moduleId: data.moduleId,
      moduleIndex: module.slts.length + 1,
      sltText: data.sltText,
    });
  }

  useEffect(() => {
    const _initial = {
      index: 0,
      moduleId: "",
      moduleCode: "",
      sltText: "",
    };

    if (sltDialogOpen) {
      if (module) {
        _initial.moduleId = module.id;
        _initial.moduleCode = module.moduleCode;
      }
    }

    reset(_initial);
  }, [sltDialogOpen]);

  return (
    <DialogBox
      title="Create a new Student Learning Target"
      isForm={{
        buttonLabel: "Create",
        buttonLoading: isLoadingCreate,
        buttonDisabled: isLoadingCreate,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={sltDialogOpen}
      setOpen={setSltDialogOpen}
    >
      <DialogParagraph>
        Adding SLT {module.moduleCode}.{module.slts.length + 1}
      </DialogParagraph>

      <div className="mt-4 grid grid-cols-1 gap-y-4">
        <FormFieldset label="SLT Text">
          <Textarea name="sltText" register={register} />
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
