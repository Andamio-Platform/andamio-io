import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import classNames from "~/utils/classnames";
import { RouterOutputs, api } from "~/utils/api";
import { useRouter } from "next/router";
import { Module } from "~/types/db";
import { useSession } from "next-auth/react";
import Select from "~/components/form/select";

export const courseNavigation = [
  { name: "Home", href: "/home", icon: HomeIcon, current: false },
];

export default function Navigation() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <>
      {router.pathname == "/course/[coursecode]" && <CoursePage />}
      {router.pathname == "/course/[coursecode]/[modulecode]/[contentcode]" && (
        <ContentPage />
      )}
    </>
  );
}

function ContentPage() {
  const router = useRouter();

  const { data: modules } = api.module.getCourseModules.useQuery(
    {
      courseCode: router.query.coursecode as string,
    },
    { enabled: router.query.coursecode ? true : false },
  );

  const { data: course } = api.course.getCourse.useQuery(
    {
      courseCode: router.query.coursecode as string,
    },
    { enabled: router.query.coursecode ? true : false },
  );

  function sortBy(a: Module, b: Module) {
    return a.moduleCode > b.moduleCode ? 1 : -1;
  }

  return (
    <>
      {course && (
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            <li>
              <Link
                href={`/course/${course.courseCode}`}
                className={classNames(
                  "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                )}
              >
                <HomeIcon
                  className={classNames(
                    "text-gray-400 group-hover:text-indigo-600",
                    "h-6 w-6 shrink-0",
                  )}
                  aria-hidden="true"
                />
                {course.title}
              </Link>
            </li>
          </ul>
        </li>
      )}

      {modules && (
        <>
          {modules.sort(sortBy).map((module, i) => (
            <li key={`module${i}`}>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                {module.title}
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                <Content
                  contents={module.contents}
                  moduleCode={module.moduleCode}
                />
              </ul>
            </li>
          ))}
        </>
      )}
    </>
  );
}

type Content =
  RouterOutputs["module"]["getCourseModules"][number]["contents"][number];

function Content({
  contents,
  moduleCode,
}: {
  contents: Content[];
  moduleCode: string;
}) {
  function sortBy(a: Content, b: Content) {
    return a.contentCode > b.contentCode ? 1 : -1;
  }

  const router = useRouter();

  return (
    <>
      {contents
        .sort(sortBy)
        .filter((content) => {
          return content.live == true;
        })
        .map((content, i) => (
          <li key={content.contentCode}>
            <Link
              href={`/course/${router.query.coursecode as string}/${moduleCode}/${content.contentCode}`}
              className={classNames(
                router.query.coursecode == content.contentCode
                  ? "bg-gray-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
              )}
            >
              <span
                className={classNames(
                  router.query.coursecode == content.contentCode
                    ? "border-indigo-600 text-indigo-600"
                    : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                )}
              >
                {content.contentCode.length > 1
                  ? content.contentCode.substring(0, 1)
                  : content.contentCode}
              </span>
              <span className="truncate">{content.title}</span>
            </Link>
          </li>
        ))}
    </>
  );
}

function CoursePage() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: ownerCourses } = api.course.getCoursesByOwner.useQuery(
    undefined,
    { enabled: sessionData != null },
  );

  return (
    <>
      <li>
        <ul role="list" className="-mx-2 space-y-1">
          {courseNavigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-indigo-600",
                    "h-6 w-6 shrink-0",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {sessionData && (
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your courses
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {ownerCourses?.map((course) => (
              <li key={course.courseCode}>
                <Link
                  href={`/course/${course.courseCode}`}
                  className={classNames(
                    router.query.coursecode == course.courseCode
                      ? "bg-gray-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                  )}
                >
                  <span
                    className={classNames(
                      router.query.coursecode == course.courseCode
                        ? "border-indigo-600 text-indigo-600"
                        : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                    )}
                  >
                    {course.title.substring(0, 1)}
                  </span>
                  <span className="truncate">{course.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      )}
    </>
  );
}
