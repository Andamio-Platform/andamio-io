import type { Course, Module, ModuleSLT } from "~/types/db";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoadingContentEditor from "~/ui/studio/components/ContentEditor/ui/LoadingContentEditor";
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
import useLessonEditor from "~/ui/studio/hooks/useLessonEditor";
import ContentEditor from "~/ui/studio/components/ContentEditor";
import { useRouter } from "next/router";
import Metatags from "~/components/site/metatags";

export default function PageCourseLessonContent({
  course,
  courseModule,
  moduleIndex,
  slt,
}: {
  course: Course;
  courseModule: Module;
  moduleIndex: number;
  slt: ModuleSLT;
}) {
  if (!course) return;

  const courseCode = course.courseCode;
  const moduleCode = courseModule.moduleCode;

  const router = useRouter();

  const { editor, lesson, refetchLesson, isLoadingLesson, ctx } =
    useLessonEditor(courseCode, moduleCode, moduleIndex);

  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

  const { mutate: lessonCreate, isLoading: isLoadingCreate } =
    api.lesson.create.useMutation({
      onSuccess: async () => {
        toast.success("Lesson Created: Ready to Write?");
        await refetchLesson();
        void ctx.slt.getModuleSLTs.invalidate({
          courseCode: courseCode,
          moduleCode: moduleCode,
        });
        void ctx.module.getCourseModules.invalidate({
          courseCode: course.courseCode,
        });
        void ctx.lesson.getLesson.invalidate({
          moduleCode: moduleCode,
          moduleIndex: moduleIndex,
          courseCode: courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Lesson could not be created. Please try again.");
        }
      },
    });

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.lesson.update.useMutation({
      onSuccess: async () => {
        toast.success("Content updated!");
        setEditLesson(false);
        await refetchLesson();
        void ctx.lesson.getLesson.invalidate({
          moduleCode: moduleCode,
          moduleIndex: moduleIndex,
          courseCode: courseCode,
        });
        void ctx.lesson.getModuleLessons.invalidate({
          moduleCode: moduleCode,
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

  const handleCreateLesson = () => {
    if (module) {
      const _lesson = {
        moduleId: courseModule.id,
        sltId: slt.id,
      };
      lessonCreate(_lesson);
    }
  };

  const FormSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: "Make sure to give this Lesson a title",
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
    if (!lesson) return;

    const _lesson = {
      id: lesson.id,
      sltId: slt.id,
      title: data.title ?? "",
      description: data.description ?? "",
      videoUrl: data.videoUrl ?? "",
      contentJson: editor?.getJSON(),
      live: data.live,
    };
    update(_lesson);
  }

  function onCancel() {
    setEditLesson(false);
    if (
      lesson &&
      lesson.contentJson &&
      typeof lesson.contentJson === "object" &&
      !!editor
    ) {
      editor.commands.setContent(lesson.contentJson);
    }
  }

  useEffect(() => {
    if (editor?.isFocused) {
      setEditLesson(true);
    }
  }, [editor?.isFocused]);

  useEffect(() => {
    if (lesson) {
      // todo: implement lesson variant
      // const _lesson = lessonVariant
      //   ? mergeObjects(lessonVariant, lesson)
      //   : lesson;

      if (lesson) {
        form.reset({
          title: lesson.title ?? "",
          description: lesson.description ?? "",
          videoUrl: lesson.videoUrl ?? "",
          live: lesson.live ?? false,
        });

        if (
          !isLoadingUpdate &&
          lesson.contentJson &&
          typeof lesson.contentJson === "object"
        ) {
          editor?.commands.setContent(lesson.contentJson);
        }
      }
    }
    // }, [lesson, lessonVariant]);
  }, [lesson]);

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
      if (editLesson) {
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
  }, [editLesson]);

  // Handle Next.js router events
  useEffect(() => {
    const handleRouteChange = () => {
      if (
        editLesson &&
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
  }, [editLesson, router]);

  if (lesson === undefined || lesson === null) {
    if (isLoadingCreate) {
      return <LoadingContentEditor>Building a Lesson</LoadingContentEditor>;
    } else if (!isCreatingLesson && !isLoadingLesson) {
      setIsCreatingLesson(true);
      handleCreateLesson();
    }
  }

  if (lesson) {
    return (
      <>
        <Metatags title={lesson.title ?? undefined} />
        <div className="flex w-full flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <HeaderSection
                form={form}
                course={course}
                courseModule={courseModule}
                editContent={editLesson}
                setEditContent={setEditLesson}
                isLoadingUpdate={isLoadingUpdate}
                onCancel={onCancel}
                onSubmit={form.handleSubmit(onSubmit)}
                slt={slt}
                courseContent={lesson}
                intent="lesson"
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
                      slt={slt}
                    />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </form>
          </Form>
          <LightDarkToggle />
          <DialogGetLessonPlan
            open={getLessonPlanDialogOpen}
            setOpen={setGetLessonPlanDialogOpen}
            slt={slt}
          />
        </div>
      </>
    );
  }
}
