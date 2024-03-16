import { ContentType } from "@prisma/client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import FormInput from "~/components/form/form-input";
import FormSelect from "~/components/form/form-select";
import FormSwitch from "~/components/form/form-switch";
import Input from "~/components/form/input";
import Select from "~/components/form/select";
import { Content } from "~/types/db";
import { api } from "~/utils/api";

export default function ContentInfoForm({
  content,
  courseCode,
  form,
  disabledVariantFields = false,
}: {
  content: Content;
  courseCode: string;
  form: any;
  disabledVariantFields: boolean;
}) {
  const { data: modules } = api.module.getCourseModules.useQuery({
    courseCode: courseCode,
  });
  return (
    <div className="space-y-8 lg:max-w-2xl">
      <FormInput
        name="title"
        label="Title"
        form={form}
        placeholder={`Title of this content`}
        info="What is this content about?"
      />

      <FormInput
        name="slt"
        label="Student Learning Target"
        form={form}
        placeholder={`Learning target for this content`}
      />

      <FormInput name="contentCode" label="Content Code" form={form} />

      <FormSelect
        name="contentType"
        form={form}
        options={Object.keys(ContentType).map((type) => ({
          value: type,
          label: type,
        }))}
        label="Type"
        disabled={disabledVariantFields}
        placeholder="Select the type of content"
      />

      <FormInput
        name="videoUrl"
        label="Video URL"
        form={form}
        placeholder={`Video ID from YouTube`}
        info="e.g. youtube.com/watch?v=123456, enter 123456"
      />

      <FormSelect
        name="moduleId"
        form={form}
        options={
          modules
            ? modules.map((module) => ({
                value: module.id,
                label: `${module.title} (${module.moduleCode})`,
              }))
            : []
        }
        label="Module"
        disabled={disabledVariantFields}
        placeholder="Select the module"
      />

      <FormSwitch
        name="live"
        label="Content is live"
        form={form}
        info="You can toggle this to make the content live or not live"
      />

      {/* <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Input name="title" register={register} />
        </dd>
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">
          Content code
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Input
            name="contentCode"
            register={register}
            disabled={disabledVariantFields}
          />
        </dd>
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Select
            name="contentType"
            register={register}
            options={Object.keys(ContentType).map((type) => ({
              value: type,
              label: type,
            }))}
            disabled={disabledVariantFields}
          />
        </dd>
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">
          Video URL
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Input name="videoUrl" register={register} />
        </dd>
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Module</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Select
            name="moduleId"
            register={register}
            options={
              modules
                ? modules.map((module) => ({
                    value: module.id,
                    label: `${module.title} (${module.moduleCode})`,
                  }))
                : []
            }
            disabled={disabledVariantFields}
          />
        </dd>
      </div> */}

      {/* <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">
          Content is Live
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Select
            name="live"
            register={register}
            options={[
              {
                value: false,
                label: "Not Live",
              },
              {
                value: true,
                label: "Live",
              },
            ]}
            disabled={disabledVariantFields}
          />
        </dd>
      </div>

      {content.type == "LESSON" && (
        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Student Learning Target
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
            <Input
              name="slt"
              register={register}
              disabled={content.type != "LESSON"}
            />
          </dd>
        </div>
      )} */}
    </div>
  );
}
