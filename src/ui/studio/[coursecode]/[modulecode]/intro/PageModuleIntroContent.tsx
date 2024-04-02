import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Assignment, Course, Introduction, Module, ModuleSLT } from "~/types/db";
import Editor from "~/components/Editor";
import { Form } from "~/components/ui/form";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";

import TitleAndDescription from "~/ui/studio/components/form-sections/TitleAndDescription";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";
import VideoLink from "~/ui/studio/components/form-sections/VideoLink";
import PublishToggle from "~/ui/studio/components/form-sections/PublishToggle";
import LessonList from "~/ui/studio/components/assignment-dashboard/lesson-list";

export default function PageModuleIntroContent({
  course,
  module,
  introduction,
}: {
  course: Course;
  module: Module;
  introduction: Introduction;
}) {
  const ctx = api.useUtils();

  if(!introduction || !course) return <div>ERROR - sorry!</div>

  const courseCode = course.courseCode;
  const moduleCode = module.moduleCode;

  const [editIntroduction, setEditIntroduction] = useState<boolean>(false);

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.introduction.update.useMutation({
      onSuccess: async (data) => {
        toast.success("Introduction updated!");
        setEditIntroduction(false);
        void ctx.introduction.getIntroduction.invalidate({
          moduleId: module.id,
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

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: introduction?.contentJson,
  });

  useEffect(() => {
    if (editor.isFocused()) {
      setEditIntroduction(true);
    }
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
    // todo:
    // }, [introduction, introductionVariant]);
  }, [introduction]);

  useEffect(() => {
    if (introduction?.contentJson && typeof introduction.contentJson === "object") {
      console.log("check2", introduction);
      editor.setContent(introduction.contentJson);
    }
  }, [editIntroduction]);

  return (
    <StudioLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 flex w-full items-center justify-center rounded-md border border-secondary-foreground py-3">
              <ControlPanel
                editContent={editIntroduction}
                isLoadingUpdate={isLoadingUpdate}
                onCancel={onCancel}
                courseCode={courseCode}
                moduleCode={moduleCode}
                contentPath={`intro`}
                live={introduction && introduction.live}
              />
            </div>


            <div className="col-span-8 row-span-5 rounded-md border border-secondary-foreground p-5">
              <TitleAndDescription
                form={form}
                id={introduction.id}
                title={introduction.title}
                description={introduction.description}
                edit={editIntroduction}
                setEdit={setEditIntroduction}
                onSubmit={() => onSubmit}
              />
            </div>


            <VideoLink form={form} />
            <LessonList module={module} />
            <PublishToggle form={form} title={course.title} />
            <div className="col-span-12 rounded-md border border-secondary-foreground">
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
