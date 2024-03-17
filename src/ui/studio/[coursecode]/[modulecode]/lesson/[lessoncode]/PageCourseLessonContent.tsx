import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import Button from "~/components/button";
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

export default function PageCourseLessonContent({
  courseCode,
  moduleCode,
  lessonCode,
  slt,
}: {
  courseCode: string;
  moduleCode: string;
  lessonCode: string;
  slt: ModuleSLT;
}) {
  const ctx = api.useUtils();

  const { lesson } = useLesson(courseCode, moduleCode, lessonCode);
  const { course } = useCourseByOwner(courseCode);
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

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.lesson.update.useMutation({
      onSuccess: (data) => {
        toast.success("Content updated!");
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

  //   const {
  //     mutate: upsertContentVariant,
  //     isLoading: isLoadingUpsertContentVariant,
  //   } = api.contentVariant.upsert.useMutation({
  //     onSuccess: (data) => {
  //       toast.success("Content updated!");
  //       void ctx.contentVariant.getContentVariants.invalidate({
  //         contentId: content?.id,
  //       });
  //     },
  //     onError: (e) => {
  //       const errorMessage = e.data?.zodError?.fieldErrors;
  //       if (errorMessage) {
  //         toast.error("Some inputs are missing or invalid");
  //       } else {
  //         toast.error("Content Code taken. Please try again.");
  //       }
  //     },
  //   });

  //

  const { register, handleSubmit, reset } = useForm();

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: content ? content.contentJson ?? undefined : undefined,
  });
  const [thisLesson, setThisLesson] = useState<any>();

  // todo save variant
  function onSubmit(data: FieldValues) {
    if (!lesson) return;

    // if (selectedCourseVariant && contentVariant) {
    //   const updateContent = {
    //     courseVariantId: selectedCourseVariant.id,
    //     lessonCode: lesson.lessonCode,
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
      lessonCode: data.lessonCode,
      type: data.contentType,
      title: data.title,
      sltId: slt.id,
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
          lessonCode: _lesson.lessonCode,
          title: _lesson.title,
          description: _lesson.description,
          sltId: _lesson.sltId,
          videoUrl: _lesson.videoUrl,
          live: _lesson.live ? _lesson.live : false,
        });

        if (_lesson.contentJson) editor.setContent(_lesson.contentJson);

        setThisLesson(_lesson);
      }
    }
    // }, [lesson, lessonVariant]);
  }, [lesson]);

  if (thisLesson === undefined) return <>NO LESSON FOUND</>;

  return (
    <>
      <p>ok you are in</p>
      <StudioLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="flex px-4 py-6 sm:px-6">
              {/* <div className="grow">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {thisLesson.type} - {thisLesson.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {thisLesson.description}
              </p>
            </div> */}

              <div>
                <div className="gap-2 sm:flex">
                  {/* <Button
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      `/course/${courseCode}/${moduleCode}/${contentCode}`,
                      "_blank",
                    );
                  }}
                >
                  View Lesson
                </Button> */}
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
              {/* <ContentInfoForm
              register={register}
              lesson={thisLesson}
              courseCode={courseCode}
              disabledVariantFields={!!contentVariant}
            /> */}

              <div className="relative w-full max-w-screen-lg">
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

// function ContentContainer({
//   content,
//   courseCode,
//   update,
// }: {
//   content: any;
//   courseCode: string;
//   update: any;
// }) {
//   const { register, handleSubmit, reset } = useForm();
//   const editor = new Editor({
//     initialContent: content.contentJson,
//   });

//   function onSubmit(data: FieldValues) {
//     if (content) {
//       const _content = {
//         id: content.id,
//         contentCode: data.contentCode,
//         type: data.contentType,
//         title: data.title,
//         description: data.description,
//         slt: data.slt ?? "",
//         videoUrl: data.videoUrl ?? "",
//         contentJson: editor.getJSON(),
//       };
//       update(_content);
//     }
//   }

//   useEffect(() => {
//     if (content) {
//       reset({
//         contentCode: content.contentCode,
//         type: content.type,
//         title: content.title,
//         description: content.description,
//         slt: content.slt,
//         videoUrl: content.videoUrl,
//       });
//     }
//   }, [content]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mx-6">
//         <div>
//           <div className="gap-2 sm:flex">
//             <Button disabled={false}>
//               {false ? (
//                 <ArrowPathIcon className="h-5 w-5 animate-spin" />
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>

//         <ContentInfoForm
//           register={register}
//           content={content}
//           courseCode={courseCode}
//         />

//         <div className="relative w-full max-w-screen-lg">{editor.render()}</div>
//       </div>
//     </form>
//   );
// }
