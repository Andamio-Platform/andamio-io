// dream big!

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Assignment, Course, Module } from "~/types/db";
import { Form } from "~/components/ui/form";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import HeaderSection from "../../components/HeaderSection";
import RightSection from "../../components/RightSection";
import { useCourseStore } from "~/lib/zustand/course";
import useAssignmentEditor from "~/ui/studio/hooks/useAssignmentEditor";
import { AndamioBubbleMenu } from "~/components/Editor/components/menus/AndamioBubbleMenu";
import { EditorContent } from "@tiptap/react";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import ContentEditor from "~/ui/studio/components/ContentEditor";
import { useRouter } from "next/router";

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
  if (!course) return;

  const courseCode = course.courseCode;
  const moduleCode = courseModule.moduleCode;

  const router = useRouter();

  const { editor, ctx } = useAssignmentEditor(assignment);

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
      assignmentCode: assignment.assignmentCode,
      description: data.description ?? "",
      imageUrl: assignment.imageUrl ?? "",
      videoUrl: data.videoUrl ?? "",
      contentJson: editor?.getJSON(),
      live: data.live,
      sltIds: assignment.slts.map((s) => s.id),
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
      editor?.commands.setContent(assignment.contentJson);
    }
  }

  useEffect(() => {
    if (editor?.isFocused) {
      setEditAssignment(true);
    }
  }, [editor?.isFocused]);

  useEffect(() => {
    if (assignment && editor) {
      form.reset({
        title: assignment.title ?? "",
        description: assignment.description ?? "",
        videoUrl: assignment.videoUrl ?? "",
        live: assignment.live ? assignment.live : false,
      });

      if (
        !isLoadingUpdate &&
        assignment.contentJson &&
        typeof assignment.contentJson === "object"
      ) {
        editor.commands.setContent(assignment.contentJson);
      }
    }
  }, [assignment, isLoadingUpdate, editor]);

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

        editor.commands.setContent(_json.content);
      }
    }
  }, [updateLessonEdit]);

  /**
   * END OF
   * andamio coach - get lesson plan
   */

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (editAssignment) {
        const confirmationMessage =
          "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = confirmationMessage; // Standard for most browsers
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editAssignment]);

  // Handle Next.js router events
  useEffect(() => {
    const handleRouteChange = () => {
      if (
        editAssignment &&
        !confirm("You have unsaved changes. Are you sure you want to leave?")
      ) {
        // If the user cancels, stop the navigation
        router.events.emit("routeChangeError");
        throw "Route change aborted.";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [editAssignment, router]);

  if (assignment) {
    return (
      <>
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
                  {!!editor && <ContentEditor editor={editor} />}
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
        <LightDarkToggle />
      </>
    );
  }
}
