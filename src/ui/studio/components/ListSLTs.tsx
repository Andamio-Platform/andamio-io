import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CircleIcon from "~/components/icons/circle";
import { Course, Module } from "~/types/db";
import { RouterOutputs, api } from "~/utils/api";

type SLT =
  RouterOutputs["module"]["getCourseModules"][number]["slts"][number];

export default function ListSLTs({
  course,
  module,
}: {
  course: Course;
  module: Module;
}) {
  if (course == null) return null;

  const { data: moduleSLTs, isLoading } =
    api.slt.getModuleSLTs.useQuery({
      courseCode: course.courseCode,
      moduleCode: module.moduleCode,
    });

  function sortBy(a: SLT, b: SLT) {
    return a.sltId > b.sltId ? 1 : -1;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {moduleSLTs &&
        moduleSLTs.sort(sortBy).map((slt, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
          >
            <div className="grow">
              <p className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
                <Link
                  href={`/studio/${course.courseCode}/${module.moduleCode}/${slt.sltId}`}
                  className="hover:underline"
                >
                  <span>{slt.sltText}</span>
                </Link>
              </p>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <span>{slt.sltId}</span>
                <CircleIcon />
              </div>
            </div>
            <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
              <div className="flex w-16 gap-x-2.5">
                <dt>
                  <UserIcon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd className="text-sm leading-6 text-gray-900">{0}</dd>
              </div>
            </dl>
          </li>
        ))}
    </ul>
  );
}
