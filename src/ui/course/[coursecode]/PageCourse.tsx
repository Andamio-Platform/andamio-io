import H1 from "~/components/typography/h1";
import { RouterOutputs, api } from "~/utils/api";
import Loading from "~/components/loading";
import VideoPlayer from "~/components/media/VideoPlayer";
import { Button } from "~/components/ui/button";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Link from "~/components/link";
import Card from "~/components/card";
import CircleIcon from "~/components/icons/circle";
import { CourseVariant, Module } from "~/types/db";
import CourseLayout from "../components/layout/CourseLayout";
import { signIn, useSession } from "next-auth/react";
import { useCourseStore } from "~/lib/zustand/course";
import mergeObjects from "~/utils/mergeObjects";
import useCourseVariants from "~/hooks/useCourseVariants";

export default function PageCourse({ courseCode }: { courseCode: string }) {
  const { data: sessionData } = useSession();

  const { data: course, isLoading } = api.course.getCourse.useQuery({
    courseCode,
  });
  const { listCourseVariant, setSelectedVariantName, selectedCourseVariant } =
    useCourseVariants(course?.id);

  const setCourseVariant = useCourseStore((state) => state.setCourseVariant);

  if (course === null && isLoading) {
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

type Content =
  RouterOutputs["module"]["getCourseModules"][number]["contents"][number];

function ListModules({
  courseCode,
  _courseVariant,
}: {
  courseCode: string;
  _courseVariant: CourseVariant | undefined;
}) {
  const { data: modules, isLoading } = api.module.getCourseModules.useQuery({
    courseCode,
  });

  function sortBy(a: Module, b: Module) {
    return a.moduleCode > b.moduleCode ? 1 : -1;
  }

  if (modules == undefined) return <></>;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <Card>
          <dl className="space-y-6 divide-y divide-gray-900/10">
            {isLoading && <Loading />}
            {modules.sort(sortBy).map((module, i) => (
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
  const { data: moduleVariants } = api.moduleVariant.getmoduleVariants.useQuery(
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
    <Disclosure as="div" className="pt-6">
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button className="flex w-full items-start justify-between gap-4 text-left text-gray-900">
              <span className="text-5xl font-semibold leading-7">
                {_module.moduleCode}
              </span>
              <span className="grow">
                <div>
                  <p className="text-base font-semibold leading-7 text-gray-900">
                    {_module.title}
                  </p>
                  <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500">
                    <p>{_module.description}</p>
                  </div>
                </div>
              </span>
              <span className="ml-6 flex h-7 items-center">
                {open ? (
                  <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-2 border-t-2 px-12 pr-12">
            <ListContent
              contents={_module.contents}
              courseCode={courseCode}
              moduleCode={_module.moduleCode}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function ListContent({
  contents,
  courseCode,
  moduleCode,
}: {
  contents: Content[];
  courseCode: string;
  moduleCode: string;
}) {
  function sortBy(a: Content, b: Content) {
    return a.contentCode > b.contentCode ? 1 : -1;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {contents
        .sort(sortBy)
        .filter((content) => {
          return content.live == true;
        })
        .map((content, i) => (
          <li
            key={`content${i}`}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
          >
            <Link
              href={`/course/${courseCode}/${moduleCode}/${content.contentCode}`}
            >
              <p className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
                <span>{content.contentCode}</span>
                <CircleIcon />
                {content.title}
              </p>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p>{content.slt}</p>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}
