import { RouterOutputs, api } from "~/utils/api";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Button } from "~/components/ui/button";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "~/components/link";
import CircleIcon from "~/components/icons/circle";
import { CourseVariant, Module, ModuleSLT } from "~/types/db";
import CourseLayout from "../components/layout/CourseLayout";
import { signIn, useSession } from "next-auth/react";
import { useCourseStore } from "~/lib/zustand/course";
import mergeObjects from "~/utils/mergeObjects";
import useCourseVariants from "~/hooks/useCourseVariants";
import useCourseModules from "~/hooks/useCourseModules";
import useCourse from "~/hooks/useCourse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Card } from "~/components/ui/card";

export default function PageCourse({ courseCode }: { courseCode: string }) {
  const { data: sessionData } = useSession();

  const { course, isLoadingCourse } = useCourse(courseCode);
  const { listCourseVariant, setSelectedVariantName, selectedCourseVariant } =
    useCourseVariants(course?.id);

  const setCourseVariant = useCourseStore((state) => state.setCourseVariant);

  if (course === null && isLoadingCourse) {
    return <Loading />;
  }

  function getCourse() {
    let _course = course;
    let _courseVariant = undefined;

    if (selectedCourseVariant) {
      _courseVariant = selectedCourseVariant;
      setCourseVariant(selectedCourseVariant);
    } else {
      setCourseVariant(undefined);
    }

    if (_courseVariant) {
      //@ts-expect-error todo merging need improvement
      _course = mergeObjects(_courseVariant, _course);
    }

    return { _course, _courseVariant };
  }
  const { _course, _courseVariant } = getCourse();

  if (_course === undefined) return <></>;

  if (_course === null) {
    return (
      <CourseLayout>
        <h1>Course not found</h1>
      </CourseLayout>
    );
  }

  return (
    <CourseLayout>
      <div className="flex flex-col w-full md:w-11/12 lg:w-1/2 mx-auto gap-5">
        <h1 className="text-[5rem] font-bold leading-[5rem]">
          {_course.title}
        </h1>

        <div className="flex gap-4">
          {listCourseVariant?.map((variant) => (
            <button
              key={variant.name}
              onClick={() => {
                setSelectedVariantName(variant.value);
              }}
            >
              {variant.name}
            </button>
          ))}
        </div>

        <div className="my-2 flex flex-col gap-4 md:flex-row">
          {_course.videoUrl && (
            <div className="grow">
              <VideoPlayer videoId={_course.videoUrl} />
            </div>
          )}
          <div className="flex basis-1/3 flex-col gap-4">
            <div className="grow">
              <div className="text-xl leading-8">{_course.description}</div>
            </div>
            {!sessionData && (
              <Button
                onClick={() => {
                  void signIn(undefined, {
                    callbackUrl: `/course/${courseCode}`,
                  });
                }}
              >
                Start Course
              </Button>
            )}
          </div>
        </div>

        <ListModules courseCode={courseCode} _courseVariant={_courseVariant} />
      </div>
    </CourseLayout>
  );
}

type SLT = RouterOutputs["module"]["getCourseModules"][number]["slts"][number];

function ListModules({
  courseCode,
  _courseVariant,
}: {
  courseCode: string;
  _courseVariant: CourseVariant | undefined;
}) {
  const { courseModules, isLoadingCourseModules } =
    useCourseModules(courseCode);

  function sortBy(a: Module, b: Module) {
    return a.moduleCode > b.moduleCode ? 1 : -1;
  }

  if (courseModules == undefined) return <></>;

  return (
    <div className="mx-auto flex w-full">
      <Card intent="none">
        <dl className="divide-forground">
          {isLoadingCourseModules && <Loading />}
          {courseModules.sort(sortBy).map((module, i) => (
            <ModuleContainer
              key={i}
              module={module}
              courseCode={courseCode}
              _courseVariant={_courseVariant}
            />
          ))}
        </dl>
      </Card>
    </div>
  );
}

function ModuleContainer({
  module,
  courseCode,
  _courseVariant,
}: {
  module: Module;
  courseCode: string;
  _courseVariant: CourseVariant | undefined;
}) {
  // Todo: When ready to implement variants, we can change this to a useModuleVariants hook:
  const { data: moduleVariants } = api.moduleVariant.getModuleVariants.useQuery(
    {
      moduleId: module.id,
    },
  );

  function getModule() {
    let _module = module;

    if (_courseVariant && moduleVariants) {
      const _moduleVariant = moduleVariants.find(
        (v) => v.courseVariant.id === _courseVariant.id,
      );

      if (_courseVariant) {
        //@ts-expect-error todo merging need improvement
        _module = mergeObjects(_moduleVariant, _module);
      }
    }

    return _module;
  }
  const _module = getModule();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex w-full items-start justify-between gap-4 text-left text-foreground hover:text-primary hover:no-underline">
          <span className="text-base font-semibold leading-7">
            {_module.moduleCode}
          </span>
          <span className="grow">
            <div>
              <p className="text-3xl font-semibold leading-7">
                {_module.title}
              </p>
              <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-accent-foreground">
                <p>{_module.description}</p>
              </div>
            </div>
          </span>
        </AccordionTrigger>
        <div className="mb-5 ml-10 mt-2">
          {_module.slts.map((slt, i) => (
            <AccordionContent
              key={`slt${i}`}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 text-foreground hover:text-primary sm:flex-nowrap"
            >
              <Link
                href={`/course/${courseCode}/${_module.moduleCode}/lesson/${slt.moduleIndex}`}
              >
                <p className="flex items-center gap-x-2 text-sm font-semibold leading-6 ">
                  <span>
                    {_module.moduleCode}.{slt.moduleIndex}
                  </span>
                  <CircleIcon />
                  {slt.sltText}
                </p>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-accent-foreground">
                  LESSON STATUS
                </div>
              </Link>
            </AccordionContent>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
