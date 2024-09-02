import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import SideMenuSessionProfile from "~/ui/auth/SideMenuSessionProfile";
import Image from "next/image";
import { CourseStudioLinkItem, DashboardLinkItem } from "./link-items";
import { type Course } from "~/types/db";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import CourseOutline from "../course/components/layout/SideMenu/CourseOutline";
import useValidateCreator from "~/hooks/course/useValidateCreator";
import useCourse from "~/hooks/course/useCourse";
import LearnerDashboardMenu from "./menu-sections/LearnerDashboardMenu";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DesktopSideMenu({
  ownerCourses,
  currentCourseCode,
}: {
  ownerCourses: Course[];
  currentCourseCode: string | undefined;
}) {
  const { data: sessionData } = useSession();

  const router = useRouter();

  const isDashboardRoute = router.asPath.includes("dashboard");
  const isDashboardLearnerRoute = router.asPath.includes("dashboard/learner");
  const isStudioRoute = router.asPath.includes("studio");
  const isCourseRoute = router.asPath.includes("course");

  const { course } = useCourse(currentCourseCode);

  const { isCreator } = useValidateCreator(
    sessionData,
    currentCourseCode ?? "",
  );

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-foreground bg-background px-6">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/">
            <Image
              width={32}
              height={32}
              className="h-8 w-auto"
              src="/andamio-logo.svg"
              alt="Andamio"
            />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                <DashboardLinkItem current={isDashboardRoute} />
                <CourseStudioLinkItem current={isStudioRoute} />
              </ul>
            </li>
            {isStudioRoute && (
              <li>
                <div className="text-xs font-semibold leading-6 text-foreground">
                  Your courses
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {ownerCourses?.map((course) => (
                    <li key={course?.courseCode}>
                      <Link
                        href={`/studio/${course?.courseCode}`}
                        className={classNames(
                          router.query.coursecode == course?.courseCode
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                      >
                        <span
                          className={classNames(
                            router.query.coursecode == course?.courseCode
                              ? "border-primary bg-accent text-accent-foreground"
                              : "border-accent-foreground text-accent-foreground group-hover:border-primary group-hover:text-accent-foreground",
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-secondary text-[0.625rem] font-medium",
                          )}
                        >
                          {course?.title.substring(0, 1)}
                        </span>
                        <span className="truncate">{course?.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {isDashboardLearnerRoute && <LearnerDashboardMenu />}
            {isCourseRoute && !!currentCourseCode && (
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  <li>
                    <Link
                      href={`/course/${currentCourseCode}`}
                      className={classNames(
                        "hover:text-accent-foreground-foreground text-foreground hover:bg-accent",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )}
                    >
                      <AcademicCapIcon
                        className={classNames(
                          "text-accent-foreground-foreground group-hover:text-accent-foreground-foreground",
                          "h-6 w-6 shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {course?.title}
                    </Link>
                  </li>
                </ul>
                <CourseOutline
                  currentCourseCode={currentCourseCode}
                  isCreator={isCreator}
                />
              </li>
            )}
            {sessionData && <SideMenuSessionProfile />}
          </ul>
        </nav>
      </div>
    </div>
  );
}
