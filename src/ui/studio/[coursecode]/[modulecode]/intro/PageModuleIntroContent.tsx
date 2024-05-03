import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Course, Module } from "~/types/db";
import Editor from "~/components/Editor";
import { Form } from "~/components/ui/form";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";

import useIntroduction from "~/hooks/useIntroduction";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import HeaderSection from "../components/HeaderSection";
import RightSection from "../components/RightSection";
import LoadingContentEditor from "~/ui/studio/components/ContentEditor/ui/LoadingContentEditor";
import { DialogGetLessonPlan } from "../components/coach/DialogGetLessonPlan";
import { useCourseStore } from "~/lib/zustand/course";
import { LightDarkToggle } from "~/ui/site/LightDarkToggle";
import useAssignmentByCourseModule from "~/hooks/useAssignmentByCourseModule";

export default function PageModuleIntroContent({
  course,
  courseModule,
}: {
  course: Course;
  courseModule: Module;
}) {
  const ctx = api.useUtils();

  if (!course) return null;

  const courseCode = course.courseCode;
  const moduleCode = courseModule.moduleCode;
  const { introduction, isLoadingIntro, refetchIntro } = useIntroduction(
    courseModule.id,
  );
  const { assignment } = useAssignmentByCourseModule(course.courseCode, courseModule.moduleCode)
  const [editIntroduction, setEditIntroduction] = useState<boolean>(false);
  const [isCreatingIntroduction, setIsCreatingIntroduction] = useState(false);

  const { mutate: introCreate, isLoading: isLoadingIntroCreate } =
    api.introduction.create.useMutation({
      onSuccess: async (data) => {
        toast.success("Module Introduction created!");
        await refetchIntro();
        void ctx.module.getCourseModules.invalidate({
          courseCode: courseCode,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Could not create introduction");
        } else {
          toast.error("Introduction ID taken. Please try again.");
        }
      },
    });

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.introduction.update.useMutation({
      onSuccess: async (data) => {
        toast.success("Introduction updated!");
        setEditIntroduction(false);
        void ctx.introduction.getIntroduction.invalidate({
          moduleId: courseModule.id,
        });
        void ctx.module.getCourseModules.invalidate({
          courseCode: courseCode,
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

  const handleCreateIntro = () => {
    if (courseModule) {
      const _intro = {
        moduleId: courseModule.id,
        title: `Introduction to Module ${courseModule.moduleCode}`,
      };
      introCreate(_intro);
    }
  };

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

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: introduction?.contentJson,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!introduction) return;

    const _introduction = {
      id: introduction.id,
      title: data.title,
      description: data.description ?? "",
      imageUrl: introduction.imageUrl ?? "",
      videoUrl: data.videoUrl ?? "",
      contentJson: editor.getJSON(),
      live: data.live,
    };
    update(_introduction);
  }

  function onCancel() {
    setEditIntroduction(false);
    if (
      introduction &&
      introduction.contentJson &&
      typeof introduction.contentJson === "object"
    ) {
      editor.setContent(introduction.contentJson);
    }
  }

  useEffect(() => {
    setEditIntroduction(true);
  }, [editor.isFocused()]);

  useEffect(() => {
    if (introduction) {
      const _introduction = introduction;

      if (_introduction) {
        form.reset({
          title: _introduction.title ?? "",
          description: _introduction.description ?? "",
          videoUrl: _introduction.videoUrl ?? "",
          live: _introduction.live ? _introduction.live : false,
        });

        if (
          _introduction.contentJson &&
          typeof _introduction.contentJson === "object"
        ) {
          editor.setContent(_introduction.contentJson);
        }
      }
    }
  }, [introduction, isLoadingIntro]);

  useEffect(() => {
    if (
      introduction?.contentJson &&
      typeof introduction.contentJson === "object"
    ) {
      editor.setContent(introduction.contentJson);
    }
  }, [editIntroduction]);

  /**
   * START OF
   * andamio coach - get lesson plan
   */

  const updateLessonEdit = useCourseStore((state) => state.updateLessonEdit);
  const [getLessonPlanDialogOpen, setGetLessonPlanDialogOpen] = useState(false);

  useEffect(() => {
    if (updateLessonEdit && !!editor) {
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

  if (isLoadingIntro) {
    return <LoadingCircle />;
  }

  if (introduction === undefined || introduction === null) {
    if (isLoadingIntroCreate) {
      return (
        <LoadingContentEditor>
          Loading Introduction {courseModule.moduleCode} in Andamio Editor
        </LoadingContentEditor>
      );
    } else if (!isCreatingIntroduction && !isLoadingIntro) {
      setIsCreatingIntroduction(true);
      handleCreateIntro();
    }
  }

  if (introduction) {
    return (
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <HeaderSection
              form={form}
              course={course}
              courseModule={courseModule}
              editContent={editIntroduction}
              setEditContent={setEditIntroduction}
              isLoadingUpdate={isLoadingUpdate}
              onCancel={() => onCancel}
              onSubmit={form.handleSubmit(onSubmit)}
              courseContent={introduction}
              intent="introduction"
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
        <LightDarkToggle />
      </>
    );
  }
}
