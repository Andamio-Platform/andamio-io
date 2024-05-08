import { useSession } from "next-auth/react";

import Loading from "~/components/loading";
import useCourses from "~/hooks/useCourses";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { CoursePublic } from "~/types/db";

export default function AllCourses() {
  const { data: sessionData } = useSession();

  const { courses, isLoadingCourses } = useCourses();
  const [freeCourses, setFreeCourses] = useState<CoursePublic[]>([]);
  const [premiumCourses, setPremiumCourses] = useState<CoursePublic[]>([]);
  const [networkCourses, setNetworkCourses] = useState<CoursePublic[]>([]);

  useEffect(() => {
    if (courses) {
      const _free = courses.filter((c) => c.accessTier === "FREE");
      const _network = courses.filter((c) => c.accessTier === "NETWORK");
      const _premium = courses.filter((c) => c.accessTier === "PREMIUM");
      setFreeCourses(_free);
      setPremiumCourses(_premium);
      setNetworkCourses(_network);
    }
  }, [courses]);

  return (
    <>
      {isLoadingCourses && <Loading />}
      {courses && (
        <>
          <div className="my-3 border-t border-accent-foreground py-3">
            <h3 className="my-10 text-3xl font-bold">Free Courses</h3>

            <ul
              role="list"
              className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4"
            >
              {freeCourses.map((course) => (
                <>{course && <CourseCard course={course} enabled={true} />}</>
              ))}
            </ul>
          </div>
          {/* <div className="my-3 border-t border-accent-foreground py-3">
            <h3 className="py-5 text-3xl font-bold">
              Premium Courses / Discord Login
            </h3>
            <p className="prose max-w-2xl">
              &quot;Premium&quot; may not be the right word here, or maybe it
              points to two different purposes. On the one hand, there might be
              cases where we or someone else building on the platform decide
              that a course should have a cost. For example, we might make a
              course that accompanies a premium level of customer support. There
              are many reasons why clients might want to charge a fee for access
              to a course. On the other hand, we might decide never to put
              paywalls around any course content.
            </p>
            <p className="prose max-w-2xl pb-5">
              Either way, we might still put some content behind a simple login,
              which is the case with the courses in this section. Anyone can
              view these, but they must first log in with Discord. What is the
              value proposition for logging in with Discord? It can be simple.
              When we define a good one, we can use it in a CTA here.
            </p>
            <ul
              role="list"
              className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4"
            >
              {premiumCourses.map((course) => (
                <>
                  {course && (
                    <CourseCard course={course} enabled={!!sessionData} />
                  )}
                </>
              ))}
            </ul>
          </div>
          <div className="my-3 border-t border-accent-foreground py-3">
            <h3 className="py-5 text-3xl font-bold">
              Andamio Network-Only Courses
            </h3>
            <p className="prose max-w-2xl">
              No matter what we decide about fees and Web2 login methods,
              Network-Only courses offer a different value proposition. The
              Andamio Network Access Token enables organizations of any size to
              set custom rules for how people can access advanced learning
              content. What stories can we tell about these courses?
            </p>
            <p className="prose max-w-2xl">
              We can start by considering our own case: if someone is going to
              build a Course on Andamio, do they first need to have an Access
              Token? We can deliver onboarding docs with a course in Andamio
              about building Courses. Is there an on-chain prerequisite to
              taking this Course? Did someone already complete a brief
              &quot;Andamio 101&quot; course?
            </p>
            <p className="prose max-w-2xl pb-5">
              Note: there is more for Product Circle to discuss re: course
              creators -- to be continued!
            </p>
            <ul
              role="list"
              className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4"
            >
              {networkCourses.map((course) => (
                <>{course && <CourseCard course={course} enabled={false} />}</>
              ))}
            </ul>
          </div> */}
        </>
      )}
    </>
  );
}