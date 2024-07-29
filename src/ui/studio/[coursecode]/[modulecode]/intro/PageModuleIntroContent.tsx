import type { Course, Module } from "~/types/db";
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

import HeaderSection from "../components/HeaderSection";
import RightSection from "../components/RightSection";

import { useCourseStore } from "~/lib/zustand/course";
import useIntroEditor from "~/ui/studio/hooks/useIntroEditor";
import ContentEditor from "~/ui/studio/components/ContentEditor";
import { useRouter } from "next/router";
import Metatags from "~/components/site/metatags";
import useAssignment from "~/hooks/course/useAssignment";

export default function PageModuleIntroContent({
  course,
  courseModule,
}: {
  course: Course;
  courseModule: Module;
}) {
  if (!course) return null;

  const courseCode = course.courseCode;
  const { editor, introduction, isLoadingIntro, refetchIntro, ctx } =
    useIntroEditor(courseModule.id);

  const router = useRouter();

  const { assignment } = useAssignment(
    course.courseCode,
    courseModule.moduleCode,
  );
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
        await refetchIntro();
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!introduction) return;

    const _introduction = {
      id: introduction.id,
      title: data.title,
      description: data.description ?? "",
      imageUrl: introduction.imageUrl ?? "",
      videoUrl: data.videoUrl ?? "",
      contentJson: editor?.getJSON(),
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
      editor?.commands.setContent(introduction.contentJson);
    }
  }

  useEffect(() => {
    if (editor?.isFocused) {
      setEditIntroduction(true);
    }
  }, [editor?.isFocused]);

  useEffect(() => {
    if (introduction) {
      if (introduction) {
        form.reset({
          title: introduction.title ?? "",
          description: introduction.description ?? "",
          videoUrl: introduction.videoUrl ?? "",
          live: introduction.live ? introduction.live : false,
        });

        if (
          !isLoadingUpdate &&
          introduction.contentJson &&
          typeof introduction.contentJson === "object"
        ) {
          editor?.commands.setContent(introduction.contentJson);
        }
      }
    }
  }, [introduction, isLoadingIntro]);

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
      if (editIntroduction) {
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
  }, [editIntroduction]);

  // Handle Next.js router events
  useEffect(() => {
    const handleRouteChange = () => {
      if (
        editIntroduction &&
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
  }, [editIntroduction, router]);

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
        <Metatags title={introduction.title} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <HeaderSection
              form={form}
              course={course}
              courseModule={courseModule}
              editContent={editIntroduction}
              setEditContent={setEditIntroduction}
              isLoadingUpdate={isLoadingUpdate}
              onCancel={onCancel}
              onSubmit={form.handleSubmit(onSubmit)}
              courseContent={introduction}
              intent="introduction"
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
