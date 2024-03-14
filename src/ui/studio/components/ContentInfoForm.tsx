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
  disabledVariantFields = false,
}: {
  register: UseFormRegister<FieldValues>;
  content: Content;
  courseCode: string;
  disabledVariantFields: boolean;
}) {
  const { data: modules } = api.module.getCourseModules.useQuery({
    courseCode: courseCode,
  });
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
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
      </div>

      <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
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
      )}

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
  );
}
