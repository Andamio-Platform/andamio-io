import { type FieldValues } from "react-hook-form";
import FormInput from "~/components/form/form-input";

export default function VideoLink({ form }: { form: FieldValues }) {
  return (
    <>
      <FormInput
        name="videoUrl"
        label="Video URL"
        form={form}
        placeholder={`Video ID from YouTube`}
        info="e.g. youtube.com/watch?v=123456, enter 123456"
      />
      <FormInput
        name="videoStartTime"
        label="Video Start Time"
        form={form}
        placeholder={`0`}
        info="number of seconds from start of video"
      />
    </>
  );
}
