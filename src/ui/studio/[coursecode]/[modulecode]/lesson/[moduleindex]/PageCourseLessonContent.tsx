import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import dynamic from "next/dynamic";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
// import ContentInfoForm from "~/ui/studio/components/ContentInfoForm";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Tabs from "~/components/tabs";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useCourseVariants from "~/hooks/useCourseVariants";
import useLesson from "~/hooks/useLesson";
// import useContentVarient from "~/hooks/useContentVarient";
import mergeObjects from "~/utils/mergeObjects";
import Editor from "~/components/Editor";
import { ModuleSLT } from "~/types/db";
import useModuleByCourse from "~/hooks/useModuleByCourse";
import LessonInfoForm from "~/ui/studio/components/LessonInfoForm";

export default function PageCourseLessonContent({
  courseCode,
  moduleCode,
  moduleIndex,
  slt,
}: {
  courseCode: string;
  moduleCode: string;
  moduleIndex: number;
  slt: ModuleSLT;
}) {
  const ctx = api.useUtils();

  const { lesson, refetchLesson } = useLesson(
    courseCode,
    moduleCode,
    moduleIndex,
  );

  const { course } = useCourseByOwner(courseCode);
  const { courseModule } = useModuleByCourse(courseCode, moduleCode);

  const {
    listCourseVariant,
    selectedVariantName,
    setSelectedVariantName,
    selectedCourseVariant,
  } = useCourseVariants(course?.id);
  //   const { contentVariant } = useContentVarient(
  //     lesson?.id,
  //     selectedCourseVariant?.id,
  //   );

  const { mutate: lessonCreate, isLoading: isLoadingCreate } =
    api.lesson.create.useMutation({
      onSuccess: async (data) => {
        toast.success("Lesson Created: Ready to Write?");
        await refetchLesson();
        // Todo - what to validate?
        // const _module = modules?.find((c) => c.id === data.moduleId);
        // void ctx.slt.getModuleSLTs.invalidate({
        //   moduleCode: _module?.moduleCode,
        // });
        // void ctx.module.getCourseModules.invalidate({
        //   courseCode: course.courseCode,
        // });
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
        // void ctx.lesson.getModuleContents.invalidate({
        //   moduleCode: moduleCode,
        // });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        if (errorMessage) {
          toast.error("Some inputs are missing or invalid");
        } else {
          toast.error("Content Code taken. Please try again.");
        }
      },
    });

  const handleCreateLesson = () => {
    if (courseModule) {
      const _lesson = {
        moduleId: courseModule.id,
        sltId: slt.id,
      };
      lessonCreate(_lesson);
    }
  };

  const { register, handleSubmit, reset } = useForm();

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: lesson ? lesson.contentJson ?? undefined : undefined,
  });
  const [thisLesson, setThisLesson] = useState<any>();

  // todo save variant
  function onSubmit(data: FieldValues) {
    if (!lesson) return;

    // if (selectedCourseVariant && contentVariant) {
    //   const updateContent = {
    //     courseVariantId: selectedCourseVariant.id,
    //     contentVariantId: contentVariant.id,
    //     title: data.title,
    //     slt: data.slt ?? "",
    //     videoUrl: data.videoUrl ?? "",
    //     contentJson: editor.getJSON(),
    //   };
    //   upsertContentVariant(updateContent);
    // } else {
    const _lesson = {
      id: lesson.id,
      sltId: slt.id,
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl ?? "",
      contentJson: editor.getJSON(),
      live: data.live == "true",
    };
    update(_lesson);
    // }
  }

  useEffect(() => {
    if (lesson) {
      // const _lesson = lessonVariant
      //   ? mergeObjects(lessonVariant, lesson)
      //   : lesson;

      const _lesson = lesson;

      if (_lesson) {
        reset({
          title: _lesson.title,
          description: _lesson.description,
          sltId: _lesson.sltId,
          videoUrl: _lesson.videoUrl,
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
        <h1>Make Lesson todo 2024-03-18</h1>
        <p>{courseCode}</p>
        <p>{moduleCode}</p>
        <p>{moduleIndex}</p>
        <Button onClick={handleCreateLesson}>Ready to create a lesson?</Button>
      </StudioLayout>
    );

  return (
    <>
      <StudioLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="flex px-4 py-6">
              <div className="grow">
                <h3 className="mb-2leading-7 text-3xl font-semibold text-gray-900">
                  {moduleCode}.{moduleIndex}:{" "}
                  {lesson && lesson.title
                    ? lesson.title
                    : "Add a Title in the form below"}
                </h3>
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

            <div className="px-4">
              <Tabs
                tabs={listCourseVariant}
                current={selectedVariantName}
                onChange={setSelectedVariantName}
              />
            </div>

            <div className="m-6">
              <LessonInfoForm
                register={register}
                lesson={thisLesson}
                courseCode={courseCode}
                disabledVariantFields={false}
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
      </StudioLayout>
    </>
  );
}
