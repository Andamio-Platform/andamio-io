import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import dynamic from "next/dynamic";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import ContentInfoForm from "~/ui/studio/components/ContentInfoForm";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Tabs from "~/components/tabs";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useCourseVariantTabs from "~/hooks/useCourseVariantTabs";
import useContent from "~/hooks/useContent";
import useContentVarient from "~/hooks/useContentVarient";
import mergeObjects from "~/utils/mergeObjects";
import Editor from "~/components/Editor";

// const ContentEditor = dynamic(
//   () => import("~/ui/studio/components/ContentEditor"),
//   {
//     loading: () => <p>Loading...</p>,
//   },
// );

export default function PageCourseContent({
  courseCode,
  moduleCode,
  contentCode,
}: {
  courseCode: string;
  moduleCode: string;
  contentCode: string;
}) {
  const ctx = api.useUtils();

  const { content } = useContent(courseCode, moduleCode, contentCode);
  const { course } = useCourseByOwner(courseCode);
  const {
    tabs,
    selectedVariantTab,
    setSelectedVariantTab,
    selectedCourseVariantId,
  } = useCourseVariantTabs(course?.id);
  const { contentVariant } = useContentVarient(
    content?.id,
    selectedCourseVariantId,
  );

  const { mutate: update, isLoading: isLoadingUpdate } =
    api.content.update.useMutation({
      onSuccess: (data) => {
        toast.success("Content updated!");
        void ctx.content.getModuleContents.invalidate({
          moduleCode: moduleCode,
        });
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

  //

  const { register, handleSubmit, reset } = useForm();
  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: content ? content.contentJson ?? "" : "",
  });

  // todo save variant
  function onSubmit(data: FieldValues) {
    if (content) {
      const _content = {
        id: content.id,
        contentCode: data.contentCode,
        type: data.contentType,
        title: data.title,
        description: data.description,
        slt: data.slt ?? "",
        videoUrl: data.videoUrl ?? "",
        contentJson: editor.getJSON(),
      };
      update(_content);
    }
  }

  useEffect(() => {
    if (content) {
      reset({
        contentCode: content.contentCode,
        type: content.type,
        title: content.title,
        description: content.description,
        slt: content.slt,
        videoUrl: content.videoUrl,
      });

      //@ts-expect-error todo how to fix this
      if (content.contentJson) editor.setContent(content.contentJson);
    }
  }, [content]);

  // useEffect(() => {
  //   setLoaded(false);

  //   setTimeout(() => {
  //     if (contentVariant) {
  //       console.log(3, loaded);
  //       if (contentVariant.contentJson)
  //         setContentJson(contentVariant.contentJson);
  //       if (contentVariant.contentHtml)
  //         setcontentHtml(contentVariant.contentHtml);
  //       reset({
  //         title: contentVariant.title,
  //         description: contentVariant.description,
  //         slt: contentVariant.slt,
  //         videoUrl: contentVariant.videoUrl,
  //       });
  //       setLoaded(true);
  //     } else if (content) {
  //       console.log(4, loaded);
  //       if (content.contentJson) setContentJson(content.contentJson);
  //       if (content.contentHtml) setcontentHtml(content.contentHtml);
  //       reset({
  //         contentCode: content.contentCode,
  //         type: content.type,
  //         title: content.title,
  //         description: content.description,
  //         slt: content.slt,
  //         videoUrl: content.videoUrl,
  //       });
  //       setLoaded(true);
  //     }
  //   }, 1000);
  // }, [content]);

  // if (!loaded || content == undefined) return <></>;

  // useEffect(() => {
  //   if (content && !loaded) {
  //     if (content.contentJson) setContentJson(content.contentJson);
  //     if (content.contentHtml) setcontentHtml(content.contentHtml);
  //     reset({
  //       contentCode: content.contentCode,
  //       type: content.type,
  //       title: content.title,
  //       description: content.description,
  //       slt: content.slt,
  //       videoUrl: content.videoUrl,
  //     });
  //     setLoaded(true);
  //   }
  // }, [content]);

  const _content = contentVariant
    ? mergeObjects(contentVariant, content)
    : content;

  if (_content === undefined) return <></>;

  return (
    <StudioLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden shadow sm:rounded-lg">
          <div className="flex px-4 py-6 sm:px-6">
            <div className="grow">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {_content.type} - {_content.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {_content.description}
              </p>
            </div>

            <div>
              <div className="gap-2 sm:flex">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      `/course/${courseCode}/${moduleCode}/${contentCode}`,
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
              tabs={tabs}
              current={selectedVariantTab}
              onChange={setSelectedVariantTab}
            />
          </div>

          <div className="m-6">
            <ContentInfoForm
              register={register}
              //@ts-expect-error todo fix this
              content={_content}
              courseCode={courseCode}
            />

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
  );
}

function ContentContainer({
  content,
  courseCode,
  update,
}: {
  content: any;
  courseCode: string;
  update: any;
}) {
  const { register, handleSubmit, reset } = useForm();
  const editor = new Editor({
    initialContent: content.contentJson,
  });

  function onSubmit(data: FieldValues) {
    if (content) {
      const _content = {
        id: content.id,
        contentCode: data.contentCode,
        type: data.contentType,
        title: data.title,
        description: data.description,
        slt: data.slt ?? "",
        videoUrl: data.videoUrl ?? "",
        contentJson: editor.getJSON(),
      };
      update(_content);
    }
  }

  useEffect(() => {
    if (content) {
      reset({
        contentCode: content.contentCode,
        type: content.type,
        title: content.title,
        description: content.description,
        slt: content.slt,
        videoUrl: content.videoUrl,
      });
    }
  }, [content]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-6">
        <div>
          <div className="gap-2 sm:flex">
            <Button disabled={false}>
              {false ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>

        <ContentInfoForm
          register={register}
          content={content}
          courseCode={courseCode}
        />

        <div className="relative w-full max-w-screen-lg">{editor.render()}</div>
      </div>
    </form>
  );
}
