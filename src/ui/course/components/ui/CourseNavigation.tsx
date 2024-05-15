import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Course, Module, ModuleSLT } from "~/types/db";

export default function CourseNavigation({
  courseCode,
  courseModule,
  moduleIndex,
}: {
  courseCode: string;
  courseModule: Module;
  moduleIndex: string;
}) {
  const _moduleIndex = parseInt(moduleIndex);

  return (
    <Card
      className="col-span-4 flex w-full flex-row items-center justify-between border border-secondary-foreground p-3"
      size="md"
    >
      <div>
        {_moduleIndex > 1 && (
          <Link
            href={`/course/${courseCode}/${courseModule.moduleCode}/lesson/${_moduleIndex - 1}`}
          >
            <Button intent="navigation">
              <ArrowLeftIcon />{" "}
              <p>
                {courseModule.moduleCode}.{_moduleIndex - 1}
              </p>
            </Button>
          </Link>
        )}
        {_moduleIndex == 1 && (
          <Link href={`/course/${courseCode}/${courseModule.moduleCode}`}>
            <Button intent="navigation">
              <ArrowLeftIcon /> <p> Module Intro</p>
            </Button>
          </Link>
        )}
      </div>
      <div>
        {_moduleIndex < courseModule.slts.length && (
          <Link
            href={`/course/${courseCode}/${courseModule.moduleCode}/lesson/${_moduleIndex + 1}`}
          >
            <Button intent="navigation">
              <p>
                {courseModule.moduleCode}.{_moduleIndex + 1}
              </p>{" "}
              <ArrowRightIcon />
            </Button>
          </Link>
        )}
        {_moduleIndex == courseModule.slts.length && courseModule.assignments[0] && (
          <Link
            href={`/course/${courseCode}/${courseModule.moduleCode}/assignment/${courseModule.assignments[0].assignmentCode}`}
          >
            <Button intent="navigation">
              <p>
                Assignment {courseModule.assignments[0].assignmentCode}
              </p>{" "}
              <ArrowRightIcon />
            </Button>
          </Link>
        )}
        {moduleIndex == "intro" && (
          <Link
            href={`/course/${courseCode}/${courseModule.moduleCode}/lesson/1`}
          >
            <Button intent="navigation">
              <p>Lesson {courseModule.moduleCode}.1</p> <ArrowRightIcon />
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
