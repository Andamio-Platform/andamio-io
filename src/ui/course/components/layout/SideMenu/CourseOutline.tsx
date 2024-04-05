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

export default function CourseOutline({courseCode, isCreator}:{courseCode: string, isCreator: boolean}) {

    const { courseModules, isLoadingCourseModules } =
    useCourseModules(courseCode);

    function sortBy(a: Module, b: Module) {
        return a.moduleCode > b.moduleCode ? 1 : -1;
      }

    return(
        <div className="-mx-2 space-y-1 mt-3">

        {courseModules?.sort(sortBy).map((module, i) => {
            return (
              <>
                <Accordion key={module.moduleCode} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={classNames(
                        "text-foreground px-3 rounded-sm hover:bg-accent hover:text-accent-foreground-foreground",
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
                              "text-foreground hover:bg-accent hover:text-accent-foreground-foreground",
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

                    {module.assignments.map((assignment) => {
                      return (
                        <AccordionContent
                          key={assignment.assignmentCode}
                          className={classNames(
                            "text-foreground hover:bg-accent hover:text-accent-foreground-foreground",
                            "rounded-md p-2",
                          )}
                        >
                          <Link
                            href={
                              assignment.live || isCreator
                                ? `/course/${courseCode}/${module.moduleCode}/assignment/${assignment.assignmentCode}`
                                : "#"
                            }
                          >
                            <p
                              className={classNames(
                                "group flex gap-x-3 text-sm font-semibold leading-6",
                              )}
                            >
                              <span>{assignment.title}</span>
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
                  </div>
    )
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
