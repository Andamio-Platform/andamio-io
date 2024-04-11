import { Course, Lesson, Module, ModuleSLT } from "~/types/db";
import Editor from "~/components/Editor";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import useLesson from "~/hooks/useLesson";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import LoadingContentEditor from "~/ui/studio/components/ContentEditor/ui/LoadingContentEditor";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import HeaderSection from "../../components/HeaderSection";
import RightSection from "../../components/RightSection";

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
  const ctx = api.useUtils();

  if (!course) return <div>no can do</div>;

  const courseCode = course.courseCode;
  const moduleCode = courseModule.moduleCode;

  const { lesson, refetchLesson, isLoadingLesson } = useLesson(
    courseCode,
    moduleCode,
    moduleIndex,
  );

  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);
  // Do we need these?
  //   const [detailsOpen, setDetailsOpen] = useState<boolean>(true);
  //   const [isSaving, setIsSaving] = useState<boolean>(false);

  const { mutate: lessonCreate, isLoading: isLoadingCreate } =
    api.lesson.create.useMutation({
      onSuccess: async (data) => {
        toast.success("Lesson Created: Ready to Write?");
        await refetchLesson();
        void ctx.slt.getModuleSLTs.invalidate({
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
      onSuccess: async (data) => {
        toast.success("Content updated!");
        setEditLesson(false);
        void ctx.lesson.getLesson.invalidate({
          moduleCode: moduleCode,
          moduleIndex: moduleIndex,
          courseCode: courseCode,
        });
        void ctx.lesson.getModuleLessons.invalidate({
          moduleCode: moduleCode,
        });
        await refetchLesson();
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
      contentJson: editor.getJSON(),
      live: data.live,
    };
    update(_lesson);
  }

  function onCancel() {
    setEditLesson(false);
    if (
      lesson &&
      lesson.contentJson &&
      typeof lesson.contentJson === "object"
    ) {
      editor.setContent(lesson.contentJson);
    }
  }

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: lesson?.contentJson,
  });

  useEffect(() => {
    if (editor.isFocused()) {
      setEditLesson(true);
    }
  }, [editor.isFocused()]);

  useEffect(() => {
    if (lesson) {
      // todo: implement lesson variant
      // const _lesson = lessonVariant
      //   ? mergeObjects(lessonVariant, lesson)
      //   : lesson;

      const _lesson = lesson;

      if (_lesson) {
        form.reset({
          title: _lesson.title ?? "",
          description: _lesson.description ?? "",
          videoUrl: _lesson.videoUrl ?? "",
          live: _lesson.live ? _lesson.live : false,
        });

        if (_lesson.contentJson && typeof _lesson.contentJson === "object") {
          editor.setContent(_lesson.contentJson);
        }
      }
    }
    // }, [lesson, lessonVariant]);
  }, [lesson]);

  useEffect(() => {
    if (lesson?.contentJson && typeof lesson.contentJson === "object") {
      console.log("check2", lesson);
      editor.setContent(lesson.contentJson);
    }
  }, [editLesson]);

  if (lesson === undefined || lesson === null) {
    if (isLoadingCreate) {
      return <LoadingContentEditor />;
    } else if (!isCreatingLesson && !isLoadingLesson) {
      setIsCreatingLesson(true);
      handleCreateLesson();
    }
  }

  if (lesson) {
    return (
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
              lesson={lesson}
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
                    slt={slt}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </form>
        </Form>
        <LightDarkToggle />
      </div>
    );
  }
}
