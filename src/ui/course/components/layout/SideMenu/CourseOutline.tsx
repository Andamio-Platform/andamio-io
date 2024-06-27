import { Lesson, Module, Slt } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Link from "next/link";
import useCourseModules from "~/hooks/course/useCourseModules";
import classNames from "~/utils/classnames";
import { DocumentIcon } from "@heroicons/react/24/outline";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import { useRouter } from "next/router";

function useCourseRoute() {
  const router = useRouter();
  const { coursecode, modulecode, moduleindex, assignmentcode } = router.query;

  return {
    courseCode: typeof coursecode === "string" ? coursecode : null,
    moduleCode: typeof modulecode === "string" ? modulecode : null,
    moduleIndex: typeof moduleindex === "string" ? moduleindex : null,
    assignmentCode: typeof assignmentcode === "string" ? assignmentcode : null,
  };
}

export default function CourseOutline({
  currentCourseCode,
  isCreator,
}: {
  currentCourseCode: string;
  isCreator: boolean;
}) {
  const { courseCode, moduleCode, moduleIndex, assignmentCode } =
    useCourseRoute();

  const { courseModules, isLoadingCourseModules } =
    useCourseModules(currentCourseCode);

  function sortBy(a: Module, b: Module) {
    return a.moduleCode > b.moduleCode ? 1 : -1;
  }

  function accordionContentClassNames(active: boolean) {
    return classNames(
      "hover:text-accent-foreground-foreground text-foreground hover:bg-accent",
      "p-2 my-1",
      active ? "bg-indigo-200 hover:bg-indigo-200" : "",
    );
  }

  if (isLoadingCourseModules) {
    return <LoadingCircle />;
  }

  if (!courseModules || courseModules.length === 0) {
    return <p className="my-5">This course does not have any contents</p>;
  }

  return (
    <div className="-mx-3 mt-3">
      <Accordion
        key={courseCode}
        type="single"
        collapsible
        className="py-3"
        defaultValue={`module-${moduleCode}`}
      >
        {courseModules?.sort(sortBy).map((courseModule, i) => {
          return (
            <AccordionItem
              value={`module-${courseModule.moduleCode}`}
              key={`module-${courseModule.moduleCode}`}
            >
              <AccordionTrigger
                className={classNames(
                  "my-1 bg-primary px-1 py-2 text-left text-primary-foreground hover:text-indigo-200",
                  "text-sm font-semibold",
                  "hover:no-underline",
                )}
              >
                {courseModule.moduleCode}: {courseModule.title}
              </AccordionTrigger>
              {courseModule.introduction && (
                <AccordionContent
                  key={courseModule.introduction?.id}
                  className={accordionContentClassNames(
                    courseModule.moduleCode === moduleCode &&
                      !assignmentCode &&
                      !moduleIndex,
                  )}
                >
                  <Link
                    href={
                      courseModule?.introduction.live || isCreator
                        ? `/course/${currentCourseCode}/${courseModule.moduleCode}`
                        : "#"
                    }
                  >
                    <span className="font-semibold">Start Module</span>
                  </Link>
                </AccordionContent>
              )}

              {courseModule.slts
                .sort((a, b) => a.moduleIndex - b.moduleIndex)
                .map((slt) => {
                  return (
                    <AccordionContent
                      key={slt.id}
                      className={accordionContentClassNames(
                        courseModule.moduleCode === moduleCode &&
                          slt.moduleIndex.toString() === moduleIndex,
                      )}
                    >
                      <Link
                        href={isLessonLive(
                          courseModule.lessons,
                          slt,
                          isCreator,
                          currentCourseCode,
                          courseModule,
                        )}
                      >
                        <p
                          className={classNames(
                            "group flex gap-x-3 text-sm leading-6",
                          )}
                        >
                          <span className="text-secondary-foreground">
                            {courseModule.moduleCode}.{slt.moduleIndex}
                          </span>
                          <span className="font-semibold">{slt.sltText}</span>
                        </p>
                      </Link>
                    </AccordionContent>
                  );
                })}

              {courseModule && courseModule.assignments[0] && (
                <AccordionContent
                  key={courseModule.assignments[0].assignmentCode}
                  className={accordionContentClassNames(
                    courseModule.assignments[0].assignmentCode ===
                      assignmentCode,
                  )}
                >
                  <Link
                    href={
                      courseModule?.assignments[0]?.live || isCreator
                        ? `/course/${currentCourseCode}/${courseModule.moduleCode}/assignment/${courseModule.assignments[0].assignmentCode}`
                        : "#"
                    }
                  >
                    <div
                      className={classNames(
                        "grid grid-cols-5 gap-3 rounded-sm border border-primary py-1 text-sm leading-6 hover:bg-indigo-200",
                        courseModule.assignments[0].assignmentCode ===
                          assignmentCode
                          ? "border-none"
                          : "",
                      )}
                    >
                      <div className="flex items-center justify-center">
                        <DocumentIcon width={"15px"} height={"15px"} />
                      </div>
                      <div className="col-span-4 flex flex-col justify-start">
                        <p className="font-semibold">
                          Assignment {courseModule.assignments[0].assignmentCode}:
                        </p>
                        <p className="font-semibold">
                          {courseModule.assignments[0].title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

function isLessonLive(
  lessons: Partial<Lesson>[],
  slt: Slt,
  isCreator: boolean,
  courseCode: string,
  module: Module,
) {
  const lesson = lessons.find((lesson) => lesson.sltId === slt.id);

  if ((lesson && lesson.live) || isCreator) {
    return `/course/${courseCode}/${module.moduleCode}/lesson/${slt.moduleIndex}`;
  }
  return "#";
}
