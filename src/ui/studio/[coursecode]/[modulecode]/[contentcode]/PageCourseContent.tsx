import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import StudioLayout from "~/ui/studio/components/layout/StudioLayout";
import ContentInfoForm from "~/ui/studio/components/ContentInfoForm";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Tabs from "~/components/tabs";
import useCourseByOwner from "~/hooks/useCourseByOwner";
import useCourseVariants from "~/hooks/useCourseVariants";
import useContent from "~/hooks/useContent";
import useContentVarient from "~/hooks/useContentVarient";
import mergeObjects from "~/utils/mergeObjects";
import Editor from "~/components/Editor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { ContentType } from "@prisma/client";

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
    listCourseVariant,
    selectedVariantName,
    setSelectedVariantName,
    selectedCourseVariant,
  } = useCourseVariants(course?.id);
  const { contentVariant } = useContentVarient(
    content?.id,
    selectedCourseVariant?.id,
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

  const {
    mutate: upsertContentVariant,
    isLoading: isLoadingUpsertContentVariant,
  } = api.contentVariant.upsert.useMutation({
    onSuccess: (data) => {
      toast.success("Content updated!");
      void ctx.contentVariant.getContentVariants.invalidate({
        contentId: content?.id,
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

  const FormSchema = z.object({
    title: z.string().min(3, {
      message: "Title must be at least 3 characters.",
    }),
    contentCode: z.string().min(1, {
      message: "Must provide a content code.",
    }),
    contentType: z.string().min(1, {
      message: "Must select a content type.",
    }),
    slt: z.string().optional(),
    videoUrl: z.string().optional(),
    live: z.boolean().optional(),
    moduleId: z.string().min(1, {
      message: "Must select a module.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      moduleId: "",
      contentCode: "",
      contentType: "",
      title: "",
      slt: "",
      videoUrl: "",
      live: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    if (!content) return;

    if (selectedCourseVariant && contentVariant) {
      const updateContent = {
        courseVariantId: selectedCourseVariant.id,
        contentId: content.id,
        contentVariantId: contentVariant.id,
        title: data.title,
        slt: data.slt ?? "",
        videoUrl: data.videoUrl ?? "",
        contentJson: editor.getJSON(),
      };
      upsertContentVariant(updateContent);
    } else {
      const _content = {
        id: content.id,
        moduleId: data.moduleId,
        contentCode: data.contentCode,
        type: data.contentType as ContentType,
        title: data.title,
        slt: data.slt ?? "",
        videoUrl: data.videoUrl ?? "",
        contentJson: editor.getJSON(),
        live: data.live,
      };
      update(_content);
    }
  }

  const editor = new Editor({
    //@ts-expect-error todo how to fix this
    initialContent: content ? content.contentJson ?? undefined : undefined,
  });
  const [thisContent, setThisContent] = useState<any>();

  // todo save variant
  // function onSubmit2(data: FieldValues) {
  //   if (!content) return;

  //   if (selectedCourseVariant && contentVariant) {
  //     const updateContent = {
  //       courseVariantId: selectedCourseVariant.id,
  //       contentId: content.id,
  //       contentVariantId: contentVariant.id,
  //       title: data.title,
  //       slt: data.slt ?? "",
  //       videoUrl: data.videoUrl ?? "",
  //       contentJson: editor.getJSON(),
  //     };
  //     upsertContentVariant(updateContent);
  //   } else {
  //     const _content = {
  //       id: content.id,
  //       contentCode: data.contentCode,
  //       type: data.contentType,
  //       title: data.title,
  //       slt: data.slt ?? "",
  //       videoUrl: data.videoUrl ?? "",
  //       contentJson: editor.getJSON(),
  //       live: data.live == "true",
  //     };
  //     update(_content);
  //   }
  // }

  useEffect(() => {
    if (content) {
      const _content = contentVariant
        ? mergeObjects(contentVariant, content)
        : content;

      if (_content) {
        form.reset({
          contentCode: _content.contentCode,
          contentType: _content.type,
          title: _content.title,
          slt: _content.slt,
          videoUrl: _content.videoUrl,
          live: _content.live ? _content.live : false,
          moduleId: _content.moduleId,
        });

        if (_content.contentJson) editor.setContent(_content.contentJson);

        setThisContent(_content);
      }
    }
  }, [content, contentVariant]);

  if (thisContent === undefined) return <></>;

  return (
    <StudioLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="flex px-4 py-6 sm:px-6">
              <div className="grow">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  {thisContent.type} - {thisContent.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {thisContent.description}
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
                    variant="secondary"
                  >
                    View Lesson
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoadingUpdate || isLoadingUpsertContentVariant}
                  >
                    {isLoadingUpdate || isLoadingUpsertContentVariant ? (
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
              <ContentInfoForm
                content={thisContent}
                courseCode={courseCode}
                disabledVariantFields={!!contentVariant}
                form={form}
              />

              <div className="relative my-8 w-full max-w-screen-lg">
                {editor.render()}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </StudioLayout>
  );
}
