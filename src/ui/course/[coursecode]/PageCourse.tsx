import H1 from "~/components/typography/h1";
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
        <H1>Course not found</H1>
      </CourseLayout>
    );
  }

  return (
    <CourseLayout>
      <div className="flex flex-col gap-8">
        <H1>{_course.title}</H1>

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
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <Card>
          <dl className="divide-gray-900/10">
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
        <AccordionTrigger className="flex w-full items-start justify-between gap-4 text-left text-gray-900 hover:no-underline hover:text-indigo-600">
          <span className="text-5xl font-semibold leading-7">
            {_module.moduleCode}
          </span>
          <span className="grow">
            <div>
              <p className="text-base font-semibold leading-7">
                {_module.title}
              </p>
              <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500">
                <p>{_module.description}</p>
              </div>
            </div>
          </span>
        </AccordionTrigger>
        <div className="mt-2 px-12 pr-12">
          {_module.slts.map((slt, i) => (
            <AccordionContent
              key={`slt${i}`}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap text-gray-900 hover:text-indigo-600"
            >
              <Link
                href={`/course/${courseCode}/${_module.moduleCode}/lesson/${slt.moduleIndex}`}
              >
                <p className="flex items-center gap-x-2 text-sm font-semibold leading-6 ">
                  <span>{slt.moduleIndex}</span>
                  <CircleIcon />
                  {slt.sltText}
                </p>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p>{slt.sltText}</p>
                </div>
              </Link>
            </AccordionContent>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
