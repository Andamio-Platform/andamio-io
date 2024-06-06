import { useSession } from "next-auth/react";

import Loading from "~/components/loading";
import useCourses from "~/hooks/useCourses";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { CoursePublic } from "~/types/db";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Button } from "~/components/ui/button";
import MintLocalState from "~/components/transactions/mintLocalState/mintLocalState";

// Patch 0.2.8: Temporarily define public course list here:
const publicCourseList = [
  "andamio101",
  "mesh",
  "DFA-Genesis",
  "ppbl2024",
  "gpbl2024",
];

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
              className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Patch 0.2.8: Temporarily hide free courses */}
              {/* {freeCourses.map((course) => (
                <>{course && <CourseCard course={course} enabled={true} />}</>
              ))} */}
              {courses.map((course) => (
                <>
                  {publicCourseList.includes(course.courseCode) && (
                    <CourseCard course={course} enabled={true} />
                  )}
                </>
              ))}
            </ul>
          </div>

          {/* <div>
            <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
              {courses.map((course, i) => (
                <div key={i}>
                  {course.onchainInstance.length !== 0 ? (
                    <>
                      <CourseOnChain {...course} />
                    </>
                  ) : (
                    <>
                      <CourseNotOnChain {...course} />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div> */}
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

interface Course {
  id: string;
  courseCode: string;
  createdById: string;
  title: string;
  description: string | null;
  category: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  live: boolean | null;
  accessTier: any;
}

function CourseNotOnChain(course: Course) {
  return (
    <Link href={`/course/${course.courseCode}`}>
      <img
        className="aspect-[3/2] w-full rounded-2xl object-cover"
        src={course.imageUrl ? course.imageUrl : "/images/sample-covers/1.jpg"}
        alt=""
      />
      <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-foreground">
        {course.title}
      </h3>
      <p className="text-base leading-7 text-gray-600">{course.description}</p>
    </Link>
  );
}

function CourseOnChain(course: Course) {
  const [isOpen, setIsOpen] = useState(false);

  // TO_DO: Add logic for if the user already have enrolled in the course

  return (
    <Dialog>
      <DialogTrigger>
        <img
          className="aspect-[3/2] w-full rounded-2xl object-cover"
          src={
            course.imageUrl ? course.imageUrl : "/images/sample-covers/1.jpg"
          }
          alt=""
        />
        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-foreground">
          {course.title}
        </h3>
        <p className="text-base leading-7 text-gray-600">
          {course.description}
        </p>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center justify-items-center">
        <DialogHeader>
          <DialogTitle className="py-4">
            Thinking of taking this course?
          </DialogTitle>
          <DialogDescription>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-[350px] space-y-2 py-4"
            >
              <div className="flex items-center justify-start">
                <CollapsibleTrigger asChild>
                  <Button>{isOpen ? <>Back</> : <>Enroll On-Chain</>}</Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="space-y-2">
                <MintLocalState courseCode={course.courseCode} />
              </CollapsibleContent>
            </Collapsible>
          </DialogDescription>
          <DialogFooter className="py-4 text-xs sm:justify-start">
            <Link href={`/course/${course.courseCode}`}>
              I&apos;ll do it after taking a look inside first
            </Link>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
