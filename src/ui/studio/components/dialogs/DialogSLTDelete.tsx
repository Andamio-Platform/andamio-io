import { type FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import Textarea from "~/components/form/textarea";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course, Module, ModuleSLT } from "~/types/db";
import Select from "~/components/form/select";

export default function DialogSLTDelete({
  sltDeleteDialogOpen,
  setSltDeleteDialogOpen,
  slt,
  module,
  course,
}: {
  sltDeleteDialogOpen: boolean;
  setSltDeleteDialogOpen: (open: boolean) => void;
  slt: ModuleSLT;
  module: Module;
  course: Course;
}) {
  const ctx = api.useUtils();



  const { register, handleSubmit, reset } = useForm();

  const { mutate: sltDelete, isLoading: isLoadingDelete } =
    api.slt.delete.useMutation({
      onSuccess: (data) => {
        setSltDeleteDialogOpen(false);
        toast.success("Student Learning Target deleted");
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
          toast.error("That did not work. Please try again.");
        }
      },
    });

  function onSubmit() {
    if (slt) {
      sltDelete({
        id: slt.id,
      });
    }
  }

  return (
    <DialogBox
      title="Confirm Delete Student Learning Target"
      isForm={{
        buttonLabel: "Delete",
        buttonLoading: isLoadingDelete,
        buttonDisabled: isLoadingDelete,
        handleSubmit: handleSubmit(() => onSubmit()),
      }}
      open={sltDeleteDialogOpen}
      setOpen={setSltDeleteDialogOpen}
    >
      <DialogParagraph>Are you sure?</DialogParagraph>
    </DialogBox>
  );
}
