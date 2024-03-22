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
// import useCourseByOwner from "~/hooks/useCourseByOwner";
// import useCourseVariants from "~/hooks/useCourseVariants";
import useLesson from "~/hooks/useLesson";
// import useContentVarient from "~/hooks/useContentVarient";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import { ToggleEditableField } from "~/components/ui/toggle-editable-field";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  Pencil2Icon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import FormInput from "~/components/form/form-input";
import FormSwitch from "~/components/form/form-switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

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

  const { lesson, refetchLesson, isLoadingLesson } = useLesson(
    courseCode,
    moduleCode,
    moduleIndex,
  );

  const [editLesson, setEditLesson] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(true);

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

      console.log("check1", lesson);

      if (_lesson) {
        form.reset({
          title: _lesson.title ?? "",
          description: _lesson.description ?? "",
          videoUrl: _lesson.videoUrl ?? "",
          live: _lesson.live ? _lesson.live : false,
        });

        if (_lesson.contentJson && typeof _lesson.contentJson === "object") {
          console.log("check2", _lesson);
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
  }, [editLesson])

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12">
            <div className="col-span-7">
              <div className="flex w-full justify-start">
                <div className="mb-3 flex justify-end border-b border-black pb-3">
                  <p className="text-xl font-semibold leading-7">
                    SLT {moduleCode}.{slt.moduleIndex}: {slt.sltText}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="grid grid-cols-4 items-center gap-10">
                <Button
                  disabled={isLoadingUpdate}
                  size="sm"
                  className={`${editLesson ? "bg-red-600" : "bg-green-600"}`}
                >
                  {isLoadingUpdate ? (
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <>{editLesson ? "Save" : "Content Saved"}</>
                  )}
                </Button>
                <>
                  {editLesson && (
                    <Button
                      size="sm"
                      onClick={onCancel}
                      className="bg-orange-500"
                    >
                      Cancel
                    </Button>
                  )}
                </>
                <div className="col-start-3">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        `/course/${courseCode}/${moduleCode}/lesson/${moduleIndex}`,
                        "_blank",
                      );
                    }}
                    size="sm"
                  >
                    View Lesson
                  </Button>
                </div>
                <div className="col-start-4 flex flex-row justify-end">
                  <div>
                    <Sheet>
                      <SheetTrigger>
                        <div className="flex flex-row items-center gap-2">
                          <QuestionMarkCircledIcon />
                          <p>Help</p>
                        </div>
                      </SheetTrigger>
                      <SheetContent className="">
                        <p>Put help content, links, docs, etc here</p>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-7">
              <div className="py-5 text-4xl">
                <ToggleEditableField
                  name="title"
                  form={form}
                  intent="lesson"
                  formTextSize="xl"
                  onSubmit={onTitleSubmit}
                  editText={editLesson}
                  setEditText={setEditLesson}
                  text={lesson.title ?? "Edit this lesson title"}
                  hideButtons={true}
                  hasForm={true}
                />
              </div>
              <div className="py-3 text-xl">
                <ToggleEditableField
                  name="description"
                  form={form}
                  intent="text"
                  formTextSize="lg"
                  onSubmit={onTitleSubmit}
                  editText={editLesson}
                  setEditText={setEditLesson}
                  text={lesson.description ?? "Edit description"}
                  hideButtons={true}
                  hasForm={true}
                />
              </div>
            </div>
            <div className="col-span-5 h-60">
              <Collapsible
                className="flex flex-row items-start justify-end"
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
              >
                <CollapsibleTrigger>
                  {detailsOpen ? (
                    <div className="pr-3 pt-3">
                      <DoubleArrowRightIcon />
                    </div>
                  ) : (
                    <div className="flex flex-row items-center gap-3">
                      <DoubleArrowLeftIcon />
                      <p className="text-lg font-bold">Lesson Details</p>
                    </div>
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="text-lg font-bold">Lesson Details</p>
                  <div className="my-2 border border-neutral-300" />
                  <FormInput
                    name="videoUrl"
                    label="Video URL"
                    form={form}
                    placeholder={`Video ID from YouTube`}
                    info="e.g. youtube.com/watch?v=123456, enter 123456"
                  />
                  <div className="mt-5 border border-neutral-300" />

                  <FormSwitch
                    name="live"
                    label="Publish"
                    form={form}
                    info={`Use this toggle to publish content. When content is published, everyone enrolled in ${course.title} will be able to see it.`}
                  />
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* <div className="px-4">
              <Tabs
                tabs={listCourseVariant}
                current={selectedVariantName}
                onChange={setSelectedVariantName}
              />
            </div> */}

          <div className="border-t border-neutral-500">
            <div className="relative mx-auto w-full p-5">{editor.render()}</div>
          </div>

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
