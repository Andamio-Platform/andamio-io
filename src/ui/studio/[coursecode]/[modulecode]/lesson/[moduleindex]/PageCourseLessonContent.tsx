import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { Course, Module, ModuleSLT } from "~/types/db";
import Editor from "~/components/Editor";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useCourseVariants from "~/hooks/useCourseVariants";
import useLesson from "~/hooks/useLesson";
// import useContentVarient from "~/hooks/useContentVarient";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import LessonInfoForm from "~/ui/studio/components/LessonInfoForm";
import mergeObjects from "~/utils/mergeObjects";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";

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

  const courseCode = course.courseCode;
  const moduleCode = module.moduleCode;

  const { lesson, refetchLesson } = useLesson(
    courseCode,
    moduleCode,
    moduleIndex,
  );

  const [editLessonTitle, setEditLessonTitle] = useState<boolean>(false);

  const {
    listCourseVariant,
    selectedVariantName,
    setSelectedVariantName,
    selectedCourseVariant,
  } = useCourseVariants(course?.id);

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
        await refetchLesson();
        setEditLessonTitle(false);
        void ctx.lesson.getLesson.invalidate({
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
    console.log("Check501", data);

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

  function onTitleSubmit(data: FieldValues) {
    if (!lesson) return;
    update({
      id: lesson.id,
      sltId: slt.id,
      title: data.title,
      description: data.description ?? "",
      videoUrl: data.videoUrl ?? "",
      contentJson: editor.getJSON(),
      live: data.live,
    });
  }

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: lesson ? lesson.contentJson ?? undefined : undefined,
  });
  const [thisLesson, setThisLesson] = useState<any>();

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

        if (_lesson.contentJson && typeof _lesson.contentJson === "object")
          editor.setContent(_lesson.contentJson);

        setThisLesson(_lesson);
      }
    }
    // }, [lesson, lessonVariant]);
  }, [lesson]);

  if (lesson === undefined || lesson === null)
    return (
      <StudioLayout>
        <h1 className="mb-2leading-7 text-3xl font-semibold text-gray-900">
          Ready to make a lesson?
        </h1>
        <p>{courseCode}</p>
        <p>{moduleCode}</p>
        <p>{moduleIndex}</p>
        <Button onClick={handleCreateLesson}>
          Create Lesson {moduleCode}.{moduleIndex}
        </Button>
      </StudioLayout>
    );

  return (
    <StudioLayout>
      <div className="text-4xl">
        <ToggleEditableField
          name="title"
          form={form}
          intent="lesson"
          formTextSize="xl"
          onSubmit={onTitleSubmit}
          editText={editLessonTitle}
          setEditText={setEditLessonTitle}
          text={lesson.title ?? "Edit this lesson title"}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="flex px-4 py-6">
              <div className="grow">
                <p className="mb-5 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {lesson && lesson.description
                    ? lesson?.description
                    : "Add a description in the form below"}
                </p>
                <div className="rounded-md bg-gray-300 p-3">
                  <p className="font-semibold leading-7 text-gray-900">
                    SLT {moduleCode}.{slt.moduleIndex}: {slt.sltText}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex-col gap-2 px-10 sm:flex">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        `/course/${courseCode}/${moduleCode}/lesson/${moduleIndex}`,
                        "_blank",
                      );
                    }}
                  >
                    View Lesson
                  </Button>
                  <Button disabled={isLoadingUpdate}>
                    {isLoadingUpdate ? (
                      <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
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

            <div className="m-6">
              <LessonInfoForm
                lesson={thisLesson}
                courseCode={courseCode}
                disabledVariantFields={false}
                form={form}
              />

              <div className="relative w-full max-w-screen-lg bg-gray-200 p-5">
                {editor.render()}
              </div>
            </div>

            {/* <ContentContainer
          content={
            contentVariant ? mergeObjects(contentVariant, content) : content
          }
          courseCode={courseCode}
          update={update}
        /> */}
          </div>
        </form>
      </Form>
    </StudioLayout>
  );
}
