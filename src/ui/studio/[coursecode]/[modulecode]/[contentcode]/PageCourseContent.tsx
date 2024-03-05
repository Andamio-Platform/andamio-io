import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import ContentInfoForm from "~/ui/studio/components/ContentInfoForm";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Tabs from "~/components/tabs";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useCourseVariantTabs from "~/hooks/useCourseVariantTabs";
import useContent from "~/hooks/useContent";

const ContentEditor = dynamic(
  () => import("~/ui/studio/components/ContentEditor"),
  {
    loading: () => <p>Loading...</p>,
  },
);

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

  const { register, handleSubmit, reset } = useForm();

  const [contentJson, setContentJson] = useState<{} | null>(null);
  const [contentHtml, setcontentHtml] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  const { tabs, currentVariantTab, setCurrentVariantTab } =
    useCourseVariantTabs(course?.id);

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
        contentJson: contentJson,
        contentHtml: contentHtml,
      };
      update(_content);
    }
  }

  useEffect(() => {
    if (content && !loaded) {
      if (content.contentJson) setContentJson(content.contentJson);
      if (content.contentHtml) setcontentHtml(content.contentHtml);
      reset({
        contentCode: content.contentCode,
        type: content.type,
        title: content.title,
        description: content.description,
        slt: content.slt,
        videoUrl: content.videoUrl,
      });
      setLoaded(true);
    }
  }, [content]);

  if (content === undefined) return <></>;

  return (
    <StudioLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-hidden shadow sm:rounded-lg">
          <div className="flex px-4 py-6 sm:px-6">
            <div className="grow">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {content.type} - {content.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {content.description}
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
              current={currentVariantTab}
              onChange={setCurrentVariantTab}
            />
          </div>

          <div className="mx-6">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <ContentInfoForm
                register={register}
                content={content}
                courseCode={courseCode}
              />

              <ContentEditor
                contentJson={contentJson}
                setContentJson={setContentJson}
                setcontentHtml={setcontentHtml}
              />

              {/* <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="mt-2 text-sm text-gray-900">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        resume_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        coverletter_back_end_developer.pdf
                      </span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
            </dl>
          </div>
        </div>
      </form>
    </StudioLayout>
  );
}
