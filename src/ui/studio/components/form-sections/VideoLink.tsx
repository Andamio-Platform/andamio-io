import { FieldValues } from "react-hook-form";
import FormInput from "~/components/form/form-input";
import FormSwitch from "~/components/form/form-switch";

export default function VideoLink({
  form,
}: {
  form: FieldValues;
}) {
  return (
    <div className="col-span-4 rounded-md border border-secondary-foreground p-5">
      <FormInput
        name="videoUrl"
        label="Video URL"
        form={form}
        placeholder={`Video ID from YouTube`}
        info="e.g. youtube.com/watch?v=123456, enter 123456"
      />
    </div>
  );
}
