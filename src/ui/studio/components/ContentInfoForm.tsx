import { ContentType } from "@prisma/client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Input from "~/components/form/input";
import Select from "~/components/form/select";
import { Content } from "~/types/db";
import { api } from "~/utils/api";

export default function ContentInfoForm({
  register,
  content,
  courseCode,
}: {
  register: UseFormRegister<FieldValues>;
  content: Content;
  courseCode: string;
}) {
  const { data: modules } = api.module.getCourseModules.useQuery({
    courseCode: courseCode,
  });

  return (
    <>
      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Input name="title" register={register} />
        </dd>
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Code</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Input name="contentCode" register={register} />
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
            value={content.type}
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
            value={content.moduleId}
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
          />
        </dd>
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">
          Description
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Input name="description" register={register} />
        </dd>
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">
          Student Learning Target
        </dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
          <Input name="slt" register={register} />
        </dd>
      </div>
    </>
  );
}
