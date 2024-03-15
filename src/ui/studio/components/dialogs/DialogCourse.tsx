import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import Textarea from "~/components/form/textarea";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import FormFieldset from "~/components/form/form-fieldset";
import Input from "~/components/form/input";
import { Course } from "~/types/db";

export default function DialogCourse({
  courseDialogOpen,
  setCourseDialogOpen,
  course,
}: {
  courseDialogOpen: boolean;
  setCourseDialogOpen: (open: boolean) => void;
  course?: Course;
}) {
  const ctx = api.useUtils();

  const { register, handleSubmit, reset } = useForm();

  const { mutate: create, isLoading: isLoadingCreate } =
    api.course.create.useMutation({
      onSuccess: () => {
        setCourseDialogOpen(false);
        toast.success("Course created!");
        void ctx.course.getCoursesByOwner.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Course Code taken. Please try again.");
        }
      },
    });

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.course.update.useMutation({
      onSuccess: () => {
        setCourseDialogOpen(false);
        toast.success("Course updated!");
        void ctx.course.getCoursesByOwner.invalidate();
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
    if (course) {
      update({
        courseCode: data.courseCode,
        title: data.title,
        description: data.description,
        category: "",
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
      });
    } else {
      create({
        courseCode: data.courseCode,
        title: data.title,
        description: data.description,
        category: "",
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
      });
    }
  }

  useEffect(() => {
    if (courseDialogOpen && course) {
      reset(course);
    }
  }, [courseDialogOpen]);

  return (
    <DialogBox
      title={course ? `Editing ${course.title}` : "Create a new course"}
      isForm={{
        buttonLabel: course ? "Save" : "Create",
        buttonLoading: isLoadingCreate || isLoadingUpdate,
        buttonDisabled: isLoadingCreate || isLoadingUpdate,
        handleSubmit: handleSubmit((data) => onSubmit(data)),
      }}
      open={courseDialogOpen}
      setOpen={setCourseDialogOpen}
    >
      <DialogParagraph>
        {course
          ? "You are editing an existing course. Make changes and click 'Save'."
          : "Creating a new course is easy. lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequuntur molestias numquam amet blanditiis voluptate sunt illo inventore atque hic, asperiores recusandae, reiciendis quae nostrum sit quis accusamus possimus quisquam?"}
      </DialogParagraph>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <FormFieldset label="Course title">
          <Input name="title" register={register} />
        </FormFieldset>

        <FormFieldset label="Course description">
          <Textarea name="description" register={register} rows={8} />
        </FormFieldset>

        <FormFieldset label="Cover image">
          <Input name="imageUrl" register={register} />
        </FormFieldset>

        <FormFieldset label="Intro video">
          <Input name="videoUrl" register={register} />
        </FormFieldset>

        <FormFieldset label="Course code">
          <Input
            name="courseCode"
            register={register}
            disabled={course !== undefined}
          />
        </FormFieldset>

      </div>
    </DialogBox>
  );
}
