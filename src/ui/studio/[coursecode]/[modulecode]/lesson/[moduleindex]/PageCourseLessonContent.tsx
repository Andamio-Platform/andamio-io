import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Course, Module, ModuleSLT } from "~/types/db";
import Editor from "~/components/Editor";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
// import useCourseByOwner from "~/hooks/useCourseByOwner";
// import useCourseVariants from "~/hooks/useCourseVariants";
import useLesson from "~/hooks/useLesson";
// import useContentVarient from "~/hooks/useContentVarient";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import TitleAndDescription from "~/ui/studio/components/form-sections/TitleAndDescription";
import ControlPanel from "~/ui/studio/components/form-sections/ControlPanel";
import CardSLT from "~/ui/studio/components/slt/CardSLT";
import PublishToggle from "~/ui/studio/components/form-sections/PublishToggle";
import VideoLink from "~/ui/studio/components/form-sections/VideoLink";
import { Card } from "~/components/ui/card";

export default function PageCourseLessonContent({
  course,
  module,
  moduleIndex,
  slt,
}: {
  course: Course;
  module: Module;
  moduleIndex: number;
  slt: ModuleSLT;
}) {
  const ctx = api.useUtils();

  if (!course) return <div>no can do</div>;

  const courseCode = course.courseCode;
  const moduleCode = module.moduleCode;

  const { lesson, refetchLesson, isLoadingLesson } = useLesson(
    courseCode,
    moduleCode,
    moduleIndex,
  );

  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // const {
  //   listCourseVariant,
  //   selectedVariantName,
  //   setSelectedVariantName,
  //   selectedCourseVariant,
  // } = useCourseVariants(course?.id);

  // Todo: Implement Lesson Variants
  //   const { contentVariant } = useContentVarient(
  //     lesson?.id,
  //     selectedCourseVariant?.id,
  //   );

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

  // Todo: Implement upsertContentVariant
  // const {
  //   mutate: upsertContentVariant,
  //   isLoading: isLoadingUpsertContentVariant,
  // } = api.contentVariant.upsert.useMutation({
  //   onSuccess: (data) => {
  //     toast.success("Content updated!");
  //     void ctx.contentVariant.getContentVariants.invalidate({
  //       contentId: content?.id,
  //     });
  //   },
  //   onError: (e) => {
  //     const errorMessage = e.data?.zodError?.fieldErrors;
  //     if (errorMessage) {
  //       toast.error("Some inputs are missing or invalid");
  //     } else {
  //       toast.error("Content Code taken. Please try again.");
  //     }
  //   },
  // });

  const handleCreateLesson = () => {
    if (module) {
      const _lesson = {
        moduleId: module.id,
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
      title: data.title,
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

  if (lesson === undefined || lesson === null)
    return (
      <StudioLayout>
        <div className="flex h-[50vh] w-full items-center justify-center">
          <Card className="border border-foreground p-10 w-1/2">
            <h1 className="text-4xl text-foreground my-10">
              Ready to create a lesson?
            </h1>
            <p>Course: {course.title} | Module: {module.title}</p>
            <p className="py-5 font-bold">SLT {moduleCode}.{moduleIndex}: {slt.sltText}</p>
            <Button onClick={handleCreateLesson} intent="module" className="mt-20">
              Yes! Create Lesson {moduleCode}.{moduleIndex}
            </Button>
          </Card>
        </div>
      </StudioLayout>
    );

  return (
    <StudioLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 flex w-full items-center justify-center rounded-md border border-secondary-foreground py-3">
              <ControlPanel
                editContent={editLesson}
                isLoadingUpdate={isLoadingUpdate}
                onCancel={onCancel}
                courseCode={courseCode}
                moduleCode={moduleCode}
                contentPath={`lesson/${slt.moduleIndex.toString()}`}
                live={lesson.live}
              />
            </div>
            <div className="col-span-8 row-span-3 rounded-md border border-secondary-foreground p-5">
              <TitleAndDescription
                form={form}
                id={lesson.id}
                title={lesson.title}
                description={lesson.description}
                edit={editLesson}
                setEdit={setEditLesson}
                onSubmit={() => onSubmit}
              />
            </div>
            <div className="col-span-4">
              <CardSLT
                moduleCode={moduleCode}
                moduleIndex={slt.moduleIndex}
                sltText={slt.sltText}
              />
            </div>
            <VideoLink form={form} />
            <PublishToggle form={form} title={course.title} />
            <div className="col-span-12 rounded-md border border-secondary-foreground">
              <div className="relative mx-auto w-full p-5">
                {editor.render()}
              </div>
            </div>
          </div>

          {/* <div className="px-4">
              <Tabs
                tabs={listCourseVariant}
                current={selectedVariantName}
                onChange={setSelectedVariantName}
              />
            </div> */}

          {/* <ContentContainer
          content={
            contentVariant ? mergeObjects(contentVariant, content) : content
          }
          courseCode={courseCode}
          update={update}
        /> */}
        </form>
      </Form>
    </StudioLayout>
  );
}
