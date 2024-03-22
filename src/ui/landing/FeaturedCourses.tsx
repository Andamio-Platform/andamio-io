import Link from "~/components/link";
import Loading from "~/components/loading";
import { HoverEffect } from "~/components/ui/card-hover-effect";
import useCourses from "~/hooks/useCourses";

export default function FeaturedCourses() {
  const { courses, isLoadingCourses } = useCourses();

  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
          Start learning today
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to aquire new skills
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Currently, this section shows all courses on the platform, it should
          be marked by admin which courses should be featured.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        {isLoadingCourses && <Loading />}
        {courses && (
          // <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
          //   {courses.map((course, i) => (
          //     <Link href={`/course/${course.courseCode}`} key={i}>
          //       <img
          //         className="aspect-[3/2] w-full rounded-2xl object-cover"
          //         src={
          //           course.imageUrl
          //             ? course.imageUrl
          //             : "/images/sample-covers/1.jpg"
          //         }
          //         alt=""
          //       />
          //       <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
          //         {course.title}
          //       </h3>
          //       <p className="text-base leading-7 text-gray-600">
          //         {course.description}
          //       </p>
          //     </Link>
          //   ))}
          // </dl>
          <div className="mx-auto max-w-5xl px-8">
            <HoverEffect
              items={courses.map((course) => {
                return {
                  title: course.title,
                  description: course.description!,
                  link: `/course/${course.courseCode}`,
                };
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
