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

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import HeaderSection from "../../components/HeaderSection";
import RightSection from "../../components/RightSection";
import { DialogGetLessonPlan } from "../../components/coach/DialogGetLessonPlan";
import { useCourseStore } from "~/lib/zustand/course";

// V2 - current
export default function PageCourseAssignmentContent({
  course,
  courseModule,
  assignment,
}: {
  course: Course;
  courseModule: Module;
  assignment: Assignment;
}) {
  const ctx = api.useUtils();

  if (!course) return;

  const courseCode = course.courseCode;
  const moduleCode = courseModule.moduleCode;

  const [editAssignment, setEditAssignment] = useState<boolean>(false);

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.assignment.update.useMutation({
      onSuccess: async (data) => {
        toast.success("Assignment updated!");
        setEditAssignment(false);
        void ctx.assignment.getAssignmentByCourseModuleCodes.invalidate({
          moduleCode: moduleCode,
          courseCode: courseCode,
        });
        void ctx.assignment.getAssignmentByModuleId.invalidate({
          moduleId: courseModule.id,
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
  }, [assignment]);

  useEffect(() => {
    if (assignment?.contentJson && typeof assignment.contentJson === "object") {
      editor.setContent(assignment.contentJson);
    }
  }, [editAssignment]);

  /**
   * START OF
   * andamio coach - get lesson plan
   */

  const updateLessonEdit = useCourseStore((state) => state.updateLessonEdit);
  const [getLessonPlanDialogOpen, setGetLessonPlanDialogOpen] = useState(false);

  useEffect(() => {
    if (updateLessonEdit && editor) {
      const _json = editor.getJSON();
      if (_json && _json.content) {
        for (const _newData of updateLessonEdit) {
          _json.content.push(_newData);
        }

        editor.setContent(_json.content);
      }
    }
  }, [updateLessonEdit]);

  /**
   * END OF
   * andamio coach - get lesson plan
   */

  if (assignment) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <HeaderSection
            form={form}
            course={course}
            courseModule={courseModule}
            editContent={editAssignment}
            setEditContent={setEditAssignment}
            isLoadingUpdate={isLoadingUpdate}
            onCancel={onCancel}
            onSubmit={form.handleSubmit(onSubmit)}
            courseContent={assignment}
            intent="assignment"
            setGetLessonPlanDialogOpen={setGetLessonPlanDialogOpen}
          />

          <div className="flex w-full bg-card">
            <ResizablePanelGroup direction="horizontal" className="gap-2">
              <ResizablePanel defaultSize={80}>
                <div className="mx-2 h-[calc(100vh-84px)] w-full overflow-y-auto border">
                  <div className="mx-auto my-4">
                    <div className="m-5 flex min-h-[90vh] w-full bg-background p-5 shadow-xl">
                      {editor.render()}
                    </div>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={20}>
                <RightSection
                  form={form}
                  course={course}
                  courseModule={courseModule}
                  assignment={assignment}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </form>
      </Form>
    );
  }
}
