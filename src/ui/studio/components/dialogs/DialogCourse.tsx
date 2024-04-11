import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { Course } from "~/types/db";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import FormInput from "~/components/form/form-input";
import DialogForm from "~/components/form/dialog-form";

export default function DialogCourse({ course }: { course?: Course }) {
  const ctx = api.useUtils();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: create, isLoading: isLoadingCreate } =
    api.course.create.useMutation({
      onSuccess: () => {
        setIsOpen(false);
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
        setIsOpen(false);
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
    courseCode: z.string().min(4),
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
    if (course) {
      form.reset({
        courseCode: course.courseCode,
        title: course.title,
        description: course.description ?? "",
        category: "",
        imageUrl: course.imageUrl ?? "",
        videoUrl: course.videoUrl ?? "",
      });
    }
  }, [course]);

  useEffect(() => {
    if(!course) {
      const courseTitle = form.getValues("title");
      const abbrev = getFirstLetters(courseTitle);
      form.setValue("courseCode", abbrev + "2024");
    }
  }, [form.getValues("title")]);

  return (
    <Form {...form}>
      <DialogForm
        openButton={course ? "Edit Course" : "Make a Course"}
        openButtonIntent="dialog"
        title={course ? `Editing ${course.title}` : "Create a new course"}
        buttonLabel={course ? "Save" : "Create"}
        buttonLoading={isLoadingCreate || isLoadingUpdate}
        buttonDisabled={isLoadingCreate || isLoadingUpdate}
        handleSubmit={form.handleSubmit(onSubmit)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <p>
          {course
            ? "You are editing an existing course. Make changes and click 'Save'."
            : "To create a new course, give it a title and a unique Course Code. You can change the title and all other details later."}
        </p>

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
            info="The Course Code is a unique string that appears in the course URL, and can be used as a shorthand title for your course."
            form={form}
            disabled={course !== undefined}
          />
        </div>
      </DialogForm>
    </Form>
  );
}

function getFirstLetters(input: string): string {
  return input
    .split(" ")
    .map((word) => word[0]?.toLowerCase())
    .join("");
}
