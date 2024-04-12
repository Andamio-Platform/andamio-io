import { Lesson, Module, Slt } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Link from "next/link";
import useCourseModules from "~/hooks/useCourseModules";
import classNames from "~/utils/classnames";

export default function CourseOutline({
  courseCode,
  isCreator,
}: {
  courseCode: string;
  isCreator: boolean;
}) {
  const { courseModules, isLoadingCourseModules } =
    useCourseModules(courseCode);

  function sortBy(a: Module, b: Module) {
    return a.moduleCode > b.moduleCode ? 1 : -1;
  }

  return (
    <div className="-mx-2 mt-3 space-y-1">
      {courseModules?.sort(sortBy).map((module, i) => {
        return (
          <Accordion key={module.moduleCode} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                className={classNames(
                  "hover:text-accent-foreground-foreground rounded-sm px-3 text-foreground hover:bg-accent",
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
                        "hover:text-accent-foreground-foreground text-foreground hover:bg-accent",
                        "rounded-md p-2",
                      )}
                    >
                      <Link
                        href={isLessonLive(
                          module.lessons,
                          slt,
                          isCreator,
                          courseCode,
                          module,
                        )}
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

              {module && module.assignments[0] && (
                <AccordionContent
                  key={module.assignments[0].assignmentCode}
                  className={classNames(
                    "hover:text-accent-foreground-foreground text-foreground hover:bg-accent",
                    "rounded-md p-2",
                  )}
                >
                  <Link
                    href={
                      module?.assignments[0]?.live || isCreator
                        ? `/course/${courseCode}/${module.moduleCode}/assignment/${module.assignments[0].assignmentCode}`
                        : "#"
                    }
                  >
                    <p
                      className={classNames(
                        "group flex gap-x-3 text-sm font-semibold leading-6",
                      )}
                    >
                      <span>{module.assignments[0].title}</span>
                    </p>
                  </Link>
                </AccordionContent>
              )}
            </AccordionItem>
          </Accordion>
        );
      })}
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
