import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import Textarea from "~/components/form/textarea";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course, CourseVariant } from "~/types/db";

export default function DialogCourseVariant({
  dialogOpen,
  setDialogOpen,
  course,
  courseVariant,
}: {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  course: Course;
  courseVariant?: CourseVariant;
}) {
  const ctx = api.useUtils();

  const { register, handleSubmit, reset } = useForm();

  const { mutate: create, isLoading: isLoadingCreate } =
    api.courseVariant.create.useMutation({
      onSuccess: () => {
        setDialogOpen(false);
        toast.success("New course variant created!");
        void ctx.courseVariant.getCourseVariants.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Course variant code taken. Please try again.");
        }
      },
    });

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.courseVariant.update.useMutation({
      onSuccess: () => {
        setDialogOpen(false);
        toast.success("Course updated!");
        void ctx.courseVariant.getCourseVariants.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
    });

  function onSubmit(data: FieldValues) {
    if (courseVariant) {
      update({
        courseVariantId: courseVariant.id,
        variantCode: data.variantCode,
        title: data.title,
        description: data.description,
      });
    } else {
      const _data = {
        variantCode: data.variantCode,
        title: data.title,
        description: data.description,
        courseId: course.id,
      };
      create(_data);
    }
  }

  useEffect(() => {
    if (dialogOpen && courseVariant) {
      reset(courseVariant);
    }
  }, [dialogOpen]);

  return (
    <DialogBox
      title={
        courseVariant
          ? `Editing ${courseVariant.variantCode}`
          : "Create a new course variant"
      }
      isForm={{
        buttonLabel: courseVariant ? "Save" : "Create",
        buttonLoading: isLoadingCreate || isLoadingUpdate,
        buttonDisabled: isLoadingCreate || isLoadingUpdate,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={dialogOpen}
      setOpen={setDialogOpen}
    >
      <DialogParagraph>
        {courseVariant
          ? "You are editing an existing variant. Make changes and click 'Save'."
          : "Creating a new variant is easy. lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequuntur molestias numquam amet blanditiis voluptate sunt illo inventore atque hic, asperiores recusandae, reiciendis quae nostrum sit quis accusamus possimus quisquam?"}
      </DialogParagraph>

      <div className="mt-4 grid grid-cols-1 gap-y-4">
        <FormFieldset label="Course title">
          <Input name="title" register={register} />
        </FormFieldset>

        <FormFieldset label="Course description">
          <Textarea name="description" register={register} rows={8} />
        </FormFieldset>

        <FormFieldset label="Variant code">
          <Input name="variantCode" register={register} />
        </FormFieldset>
      </div>
    </DialogBox>
  );
}
