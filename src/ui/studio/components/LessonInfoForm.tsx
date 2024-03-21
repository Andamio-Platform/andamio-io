import FormInput from "~/components/form/form-input";
import FormSelect from "~/components/form/form-select";
import FormSwitch from "~/components/form/form-switch";
import { Lesson } from "~/types/db";
import { api } from "~/utils/api";
import useCourseModules from "~/hooks/useCourseModules";
import LoadingCircle from "./ContentEditor/ui/icons/loading-circle";
import { Card } from "~/components/ui/card";

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
    <Card className="flex flex-row p-3 w-3/4 mx-auto justify-between">

      <FormInput
        name="videoUrl"
        label="Video URL"
        form={form}
        placeholder={`Video ID from YouTube`}
        info="e.g. youtube.com/watch?v=123456, enter 123456"
      />

      <FormSwitch
        name="live"
        label="Content is live"
        form={form}
        info="You can toggle this to make the content live or not live"
      />
    </Card>
  );
}
