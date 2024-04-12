import { api } from "~/utils/api";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Button } from "~/components/ui/button";
import Link from "~/components/link";
import CircleIcon from "~/components/icons/circle";
import { CourseVariant, Module } from "~/types/db";
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
import useCourseById from "~/hooks/useCourseById";

export default function PageCourse({
  courseCode,
  courseId
}: {
  courseCode?: string;
  courseId?: string;
}) {
  const { data: sessionData } = useSession();

  const { course: courseById, isLoadingCourse: isLoadingCourseById } = useCourseById(courseId);
  const { course: courseByCode, isLoadingCourse: isLoadingCourseByCode } = useCourse(courseCode);
  
  const course = courseById || courseByCode;

  const { listCourseVariant, setSelectedVariantName, selectedCourseVariant } =
    useCourseVariants(course?.id);

  const setCourseVariant = useCourseStore((state) => state.setCourseVariant);

  if (course === null) {
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
      <div className="mx-auto flex w-full flex-col md:w-11/12 lg:w-11/12">
        <h1 className="text-[5rem] font-bold leading-[5rem]">
          {_course.title}
        </h1>
        <div className="text-xl leading-8">{_course.description}</div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          <div>
            <h1 className="mt-10 text-[1.5rem] font-bold">Course Outline</h1>
            <ListModules
              courseCode={_course.courseCode}
              _courseVariant={_courseVariant}
            />
          </div>
          <div>
            {_course.videoUrl && (
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="grow">
                  <VideoPlayer videoId={_course.videoUrl} />
                </div>
              </div>
            )}

            {!sessionData && (
              <div className="flex basis-1/3 flex-col gap-4">
                <div className="grow">
                  <Button
                    onClick={() => {
                      void signIn(undefined, {
                        callbackUrl: `/course/${courseCode}`,
                      });
                    }}
                  >
                    Start Course
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div className="flex gap-4">
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
        </div> */}
      </div>
    </CourseLayout>
  );
}

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
    <>
      {isLoadingCourseModules && <Loading />}
      {courseModules.sort(sortBy).map((module, i) => (
        <ModuleContainer
          key={i}
          module={module}
          courseCode={courseCode}
          _courseVariant={_courseVariant}
        />
      ))}
    </>
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
              <p className="text-[1.5rem] font-semibold leading-7">
                {_module.title}
              </p>
              <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-accent-foreground">
                <p>{_module.description}</p>
              </div>
            </div>
          </span>
          <Link href={`/course/${courseCode}/${_module.moduleCode}`}>
            <span className="hover:text-warning">Start Module</span>
          </Link>
        </AccordionTrigger>
        <div className="mb-5 mt-2">
          {_module.slts.map((slt, i) => (
            <AccordionContent
              key={`slt${i}`}
              className="flex flex-wrap items-center justify-between gap-y-4 py-5 text-foreground hover:text-primary sm:flex-nowrap"
            >
              <Link
                href={`/course/${courseCode}/${_module.moduleCode}/lesson/${slt.moduleIndex}`}
              >
                <div className="flex items-center gap-x-2 font-semibold leading-6 ">
                  <span className="text-sm">
                    {_module.moduleCode}.{slt.moduleIndex}
                  </span>
                  <CircleIcon />
                  <span className="text-base">{slt.sltText}</span>
                </div>
              </Link>
            </AccordionContent>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
