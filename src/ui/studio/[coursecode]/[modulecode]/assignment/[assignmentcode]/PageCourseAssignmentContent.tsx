// this can really turn into an incredible dashboard...
// dream big!

import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Assignment, Course, Module, ModuleSLT } from "~/types/db";
import Editor from "~/components/Editor";
import { Form } from "~/components/ui/form";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";

import TitleAndDescription from "~/ui/studio/components/form-sections/TitleAndDescription";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";
import VideoLink from "~/ui/studio/components/form-sections/VideoLink";
import PublishToggle from "~/ui/studio/components/form-sections/PublishToggle";
import SltList from "~/ui/studio/components/assignment-dashboard/slt-list";
import LessonList from "~/ui/studio/components/assignment-dashboard/lesson-list";
import AssignmentDetails from "~/ui/studio/components/assignment-dashboard/assignment-details";

export default function PageCourseAssignmentContent({
  course,
  module,
  assignment,
}: {
  course: Course;
  module: Module;
  assignment: Assignment;
}) {
  const ctx = api.useUtils();

  const courseCode = course.courseCode;
  const moduleCode = module.moduleCode;

  const [editAssignment, setEditAssignment] = useState<boolean>(false);

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.assignment.update.useMutation({
      onSuccess: async (data) => {
        toast.success("Assignment updated!");
        setEditAssignment(false);
        void ctx.assignment.getAssignment.invalidate({
          moduleCode: moduleCode,
          courseCode: courseCode,
        });
        void ctx.assignment.getModuleAssignments.invalidate({
          moduleId: module.id,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Lesson Code taken. Please try again.");
        }
      },
    });

  const FormSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: "Make sure to give this Assignment a title",
      })
      .max(60, { message: "Title must be less than 60 characters" }),
    description: z.string().optional(),
    videoUrl: z.string().optional(),
    live: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      live: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!assignment) return;

    const _assignment = {
      id: assignment.id,
      title: data.title,
      description: data.description ?? "",
      imageUrl: assignment.imageUrl ?? "",
      videoUrl: data.videoUrl ?? "",
      contentJson: editor.getJSON(),
      live: data.live,
    };
    update(_assignment);
  }

  function onCancel() {
    setEditAssignment(false);
    if (
      assignment &&
      assignment.contentJson &&
      typeof assignment.contentJson === "object"
    ) {
      editor.setContent(assignment.contentJson);
    }
  }

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: assignment?.contentJson,
  });

  useEffect(() => {
    if (editor.isFocused()) {
      setEditAssignment(true);
    }
  }, [editor.isFocused()]);

  useEffect(() => {
    if (assignment) {
      const _assignment = assignment;

      if (_assignment) {
        form.reset({
          title: _assignment.title ?? "",
          description: _assignment.description ?? "",
          videoUrl: _assignment.videoUrl ?? "",
          live: _assignment.live ? _assignment.live : false,
        });

        if (
          _assignment.contentJson &&
          typeof _assignment.contentJson === "object"
        ) {
          editor.setContent(_assignment.contentJson);
        }
      }
    }
    // todo:
    // }, [assignment, assignmentVariant]);
  }, [assignment]);

  useEffect(() => {
    if (assignment?.contentJson && typeof assignment.contentJson === "object") {
      console.log("check2", assignment);
      editor.setContent(assignment.contentJson);
    }
  }, [editAssignment]);

  return (
    <StudioLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 flex w-full items-center justify-center rounded-md border border-neutral-900 py-3">
              <ControlPanel
                editAssignment={editAssignment}
                isLoadingUpdate={isLoadingUpdate}
                onCancel={onCancel}
                courseCode={courseCode}
                moduleCode={moduleCode}
                contentCode={assignment.assignmentCode}
                live={assignment.live}
              />
            </div>
            <div className="col-span-8 flex w-full items-center justify-center rounded-md border border-neutral-900 py-3">
              What kind of dashboard can this page be?
            </div>
            <AssignmentDetails
              course={course}
              module={module}
              assignment={assignment}
            />

            <div className="col-span-8 row-span-5 rounded-md border border-neutral-900 p-5">
              <TitleAndDescription
                form={form}
                id={assignment.id}
                title={assignment.title}
                description={assignment.description}
                edit={editAssignment}
                setEdit={setEditAssignment}
                onSubmit={() => onSubmit}
              />
            </div>
            <SltList slts={module.slts} />
            <VideoLink form={form} />
            <LessonList module={module} />
            <PublishToggle form={form} title={course.title} />
            <div className="col-span-12 rounded-md border border-neutral-900">
              <div className="relative mx-auto w-full p-5">
                {editor.render()}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </StudioLayout>
  );
}
