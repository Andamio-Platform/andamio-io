import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CircleIcon from "~/components/icons/circle";
import { Course, Module } from "~/types/db";
import { RouterOutputs, api } from "~/utils/api";

type Content =
  RouterOutputs["module"]["getCourseModules"][number]["lessons"][number];

export default function ListContent({
  course,
  module,
}: {
  course: Course;
  module: Module;
}) {
  if (course == null) return null;

  const { data: moduleLessons, isLoading } =
    api.lesson.getModuleLessons.useQuery({
      courseCode: course.courseCode,
      moduleCode: module.moduleCode,
    });

  function sortBy(a: Content, b: Content) {
    return a.lessonCode > b.lessonCode ? 1 : -1;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {moduleLessons &&
        moduleLessons.sort(sortBy).map((lesson, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
          >
            <div className="grow">
              <p className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
                <Link
                  href={`/studio/${course.courseCode}/${module.moduleCode}/${lesson.lessonCode}`}
                  className="hover:underline"
                >
                  <span>{lesson.title}</span>
                </Link>
              </p>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <span>{lesson.lessonCode}</span>
                <CircleIcon />
                <span>{lesson.sltId}</span>
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
