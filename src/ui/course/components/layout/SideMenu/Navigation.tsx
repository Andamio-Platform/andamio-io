import { HomeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import classNames from "~/utils/classnames";
import { RouterOutputs, api } from "~/utils/api";
import { useRouter } from "next/router";
import { Module } from "~/types/db";
import { useSession } from "next-auth/react";
import useCourseModules from "~/hooks/useCourseModules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import useCourse from "~/hooks/useCourse";
import { useEffect } from "react";

export const courseNavigation = [
  { name: "Home", href: "/home", icon: HomeIcon, current: false },
  { name: "...", href: "#", icon: AcademicCapIcon, current: false },
];

export default function Navigation() {
  const router = useRouter();
  const { coursecode } = router.query;
  const { data: sessionData } = useSession();

  return (
    <>
      {typeof coursecode === "string" &&
        router.pathname == "/course/[coursecode]" && (
          <CoursePage courseCode={coursecode} />
        )}
      {typeof coursecode === "string" &&
        router.pathname ==
          "/course/[coursecode]/[modulecode]/lesson/[moduleindex]" && (
          <CoursePage courseCode={coursecode} />
        )}
    </>
  );
}

function CoursePage({ courseCode }: { courseCode: string }) {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: ownerCourses } = api.course.getCoursesByOwner.useQuery(
    undefined,
    { enabled: sessionData != null },
  );

  const { course, isLoadingCourse } = useCourse(courseCode);
  useEffect(() => {
    if (course) {
      courseNavigation[1] = {
        name: course.title,
        href: `/course/${course.courseCode}`,
        icon: AcademicCapIcon,
        current: false,
      };
    }
  }, [course]);

  const { courseModules, isLoadingCourseModules } =
    useCourseModules(courseCode);

  function sortBy(a: Module, b: Module) {
    return a.moduleCode > b.moduleCode ? 1 : -1;
  }

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
          {courseModules?.sort(sortBy).map((module, i) => {
            return (
              <>
                <Accordion key={module.moduleCode} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={classNames(
                        "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                        "text-sm font-semibold",
                        "hover:no-underline",
                      )}
                    >
                      {module.title}
                    </AccordionTrigger>

                    {module.slts
                      .sort((a, b) => a.moduleIndex - b.moduleIndex)
                      .map((slt) => {
                        return (
                          <AccordionContent
                            key={slt.id}
                            className={classNames(
                              "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              "rounded-md p-2",
                            )}
                          >
                            <Link
                              href={`/course/${courseCode}/${module.moduleCode}/lesson/${slt.moduleIndex}`}
                            >
                              <p
                                className={classNames(
                                  "group flex gap-x-3 text-sm font-semibold leading-6",
                                )}
                              >
                                <span>{slt.moduleIndex}</span>
                                {slt.sltText}
                              </p>
                            </Link>
                          </AccordionContent>
                        );
                      })}
                  </AccordionItem>
                </Accordion>
              </>
            );
          })}
        </ul>
      </li>

      {/* {sessionData && (
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
      )} */}
    </>
  );
}

// function ContentPage() {
//   const router = useRouter();

//   // still have this useQuery - after setting up correct route, replace with useCourseModules()
//   const { data: modules } = api.module.getCourseModules.useQuery(
//     {
//       courseCode: router.query.coursecode as string,
//     },
//     { enabled: router.query.coursecode ? true : false },
//   );

//   // this should be ready for useCourse() hook - change after fixing everything above
//   const { data: course } = api.course.getCourse.useQuery(
//     {
//       courseCode: router.query.coursecode as string,
//     },
//     { enabled: router.query.coursecode ? true : false },
//   );

//   function sortBy(a: Module, b: Module) {
//     return a.moduleCode > b.moduleCode ? 1 : -1;
//   }

//   return (
//     <>
//       {course && (
//         <li>
//           <ul role="list" className="-mx-2 space-y-1">
//             <li>
//               <Link
//                 href={`/course/${course.courseCode}`}
//                 className={classNames(
//                   "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
//                   "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
//                 )}
//               >
//                 <HomeIcon
//                   className={classNames(
//                     "text-gray-400 group-hover:text-indigo-600",
//                     "h-6 w-6 shrink-0",
//                   )}
//                   aria-hidden="true"
//                 />
//                 {course.title}
//               </Link>
//             </li>
//           </ul>
//         </li>
//       )}

//       {/* todo james */}

//       {modules && (
//         <>
//           {modules.sort(sortBy).map((module, i) => (
//             <li key={`module${i}`}>
//               <div className="text-xs font-semibold leading-6 text-gray-400">
//                 {module.title}
//               </div>
//               <ul role="list" className="-mx-2 mt-2 space-y-1">
//                 <SLTs slts={module.slts} moduleCode={module.moduleCode} />
//               </ul>
//             </li>
//           ))}
//         </>
//       )}
//     </>
//   );
// }

// type SLT = RouterOutputs["module"]["getCourseModules"][number]["slts"][number];

// function SLTs({ slts, moduleCode }: { slts: SLT[]; moduleCode: string }) {
//   function sortBy(a: SLT, b: SLT) {
//     return a.moduleIndex > b.moduleIndex ? 1 : -1;
//   }

//   const router = useRouter();

//   return (
//     <>
//       {slts
//         .sort(sortBy)
//         .filter((slt) => {
//           return slt.moduleIndex > 0;
//         })
//         .map((slt, i) => (
//           <li key={slt.moduleIndex}>
//             <Link
//               href={`/course/${router.query.coursecode as string}/${moduleCode}/${slt.moduleIndex}`}
//               className={classNames(
//                 router.query.coursecode == slt.id
//                   ? "bg-gray-50 text-indigo-600"
//                   : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
//                 "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
//               )}
//             >
//               <span
//                 className={classNames(
//                   router.query.coursecode == slt.id
//                     ? "border-indigo-600 text-indigo-600"
//                     : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
//                   "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
//                 )}
//               >
//                 {slt.moduleIndex > 0 && slt.moduleIndex}
//               </span>
//               <span className="truncate">{slt.sltText}</span>
//             </Link>
//           </li>
//         ))}
//     </>
//   );
// }
