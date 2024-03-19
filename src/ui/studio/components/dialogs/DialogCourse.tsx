import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect } from "react";
import DialogBox from "~/components/dialog";
import DialogParagraph from "~/components/dialog/paragraph";
import { Course } from "~/types/db";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import FormInput from "~/components/form/form-input";

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

  const { mutate: create, isLoading: isLoadingCreate } =
    api.course.create.useMutation({
      onSuccess: () => {
        setCourseDialogOpen(false); // close the dialog
        toast.success("Course created!"); // trigger notification in top right
        void ctx.course.getCoursesByOwner.invalidate(); // make the new course appear on the page
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

  const FormSchema = z.object({
    courseCode: z.string().min(6),
    title: z.string().min(8),
    description: z.string().optional(),
    category: z.string().optional(),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      courseCode: "",
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      videoUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (course) {
      update({
        courseCode: data.courseCode,
        title: data.title,
        description: data.description ?? "",
        category: "",
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
      });
    } else {
      create({
        courseCode: data.courseCode,
        title: data.title,
        description: data.description ?? "",
        category: "",
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
      });
    }
  }

  useEffect(() => {
    if (courseDialogOpen && course) {
      form.reset({
        courseCode: course.courseCode,
        title: course.title,
        description: course.description ?? "",
        category: "",
        imageUrl: course.imageUrl ?? "",
        videoUrl: course.videoUrl ?? "",
      });
    }
  }, [courseDialogOpen, course]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogBox
          title={course ? `Editing ${course.title}` : "Create a new course"}
          isForm={{
            buttonLabel: course ? "Save" : "Create",
            buttonLoading: isLoadingCreate || isLoadingUpdate,
            buttonDisabled: isLoadingCreate || isLoadingUpdate,
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
            <FormInput
              name="title"
              label="Course Title"
              form={form}
              placeholder={`Add a Course Title`}
            />

            <FormInput
              name="description"
              label="Course Description"
              form={form}
            />

            <FormInput name="imageUrl" label="Cover Image URL" form={form} />

            <FormInput name="videoUrl" label="Video URL" form={form} />

            <FormInput
              name="courseCode"
              label="Course Code"
              form={form}
              disabled={course !== undefined}
            />
          </div>
        </DialogBox>
      </form>
    </Form>
  );
}
