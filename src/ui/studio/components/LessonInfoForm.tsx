import FormInput from "~/components/form/form-input";
import FormSelect from "~/components/form/form-select";
import FormSwitch from "~/components/form/form-switch";
import { Lesson } from "~/types/db";
import { api } from "~/utils/api";
import useCourseModules from "~/hooks/useCourseModules";
import LoadingCircle from "./ContentEditor/ui/icons/loading-circle";

export default function LessonInfoForm({
  lesson,
  courseCode,
  form,
  disabledVariantFields = false,
}: {
  lesson: Lesson;
  courseCode: string;
  form: any;
  disabledVariantFields: boolean;
}) {
  const { courseModules, isLoadingCourseModules } =
    useCourseModules(courseCode);

  return (
    <div className="space-y-8 lg:max-w-2xl">
      <FormInput
        name="title"
        label="Title"
        form={form}
        placeholder={`Title of this content`}
        info="Give the lesson a catchy name"
      />

      <FormInput
        name="description"
        label="Description"
        form={form}
        placeholder={`Short description of this content`}
        info="What is this Module about?"
      />

      <FormInput
        name="videoUrl"
        label="Video URL"
        form={form}
        placeholder={`Video ID from YouTube`}
        info="e.g. youtube.com/watch?v=123456, enter 123456"
      />

      {isLoadingCourseModules ? (
        <LoadingCircle />
      ) : (
        <FormSelect
          name="moduleId"
          form={form}
          options={
            courseModules
              ? courseModules.map((module) => ({
                  value: module.id,
                  label: `${module.title} (${module.moduleCode})`,
                }))
              : []
          }
          label="Module - Todo: this should change the SLT ID and Lesson ID"
          disabled={disabledVariantFields}
          placeholder="Select the module"
        />
      )}

      <FormSwitch
        name="live"
        label="Content is live"
        form={form}
        info="You can toggle this to make the content live or not live"
      />
    </div>
  );
}
