import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import useCourse from "~/hooks/course/useCourse";
import { type LearnerAssignment } from "~/hooks/course/useLearnerAssignmentStatuses";
import AssignmentsSection from "./AssignmentSection";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import useLearnerSavedCourses from "~/hooks/course/useLearnerSavedCourses";
import LearnerCourseModuleDetailsComponent from "./LearnerCourseModuleDetailsComponent";
import useCourseModuleWithAssignmentSummary from "~/hooks/course/useCourseModuleWithAssignmentSummary";

export default function CourseDetails({
  currentCourseCode,
  learnerAssignments,
}: {
  currentCourseCode: string;
  learnerAssignments: LearnerAssignment[];
}) {
  const ctx = api.useUtils();
  const { data: sessionData, update: updateSessionData } = useSession();
  const { course, isLoadingCourse } = useCourse(currentCourseCode);
  const { courseModuleOverviews } =
    useCourseModuleWithAssignmentSummary(currentCourseCode);
  const { savedCourses } = useLearnerSavedCourses();
  const [isCourseSaved, setIsCourseSaved] = useState<boolean>(true);
  const [courseAssignments, setCourseAssignments] = useState<
    LearnerAssignment[]
  >([]);

  const { mutate: saveCourseForLearner } =
    api.learner.saveCourseForLearner.useMutation({
      onSuccess: () => {
        void ctx.learner.getSavedCoursesByLearner.invalidate();
        void updateSessionData();
        toast.success("Course saved");
      },
    });

  const { mutate: unsaveCourseForLearner } =
    api.learner.removeSavedCourseForLearner.useMutation({
      onSuccess: () => {
        void ctx.learner.getSavedCoursesByLearner.invalidate();
        void updateSessionData();
        toast.success("Course removed");
      },
    });

  useEffect(() => {
    if (learnerAssignments && !!course) {
      const res = learnerAssignments.filter(
        (a) => a.courseCode === course.courseCode,
      );
      setCourseAssignments(res);
    }
  }, [course, learnerAssignments]);

  useEffect(() => {
    if (savedCourses) {
      const saved = savedCourses.find(
        (c) => c.courseCode === currentCourseCode,
      );
      setIsCourseSaved(!!saved);
    }
  }, [savedCourses, currentCourseCode]);

  const handleSaveCourse = () => {
    if (sessionData && course?.id) {
      saveCourseForLearner({
        learnerId: sessionData.user.learnerId,
        courseId: course.id,
      });
    }
  };

  const handleUnsaveCourse = () => {
    if (sessionData && course?.id) {
      unsaveCourseForLearner({
        learnerId: sessionData.user.learnerId,
        courseId: course.id,
      });
    }
  };

  if (isLoadingCourse)
    return (
      <div className="col-span-3 flex min-h-[500px] w-full animate-pulse items-center justify-center">
        <Image src="/andamio.png" width={200} height={200} alt="loading" />
      </div>
    );

  return (
    <div className="col-span-3 grid w-full grid-cols-2 px-5">
      <div className="flex h-[150px] flex-row items-center gap-10">
        <h1 className="font-beckman text-6xl">{course?.title}</h1>
        <Link href={`/course/${course?.courseCode}`}>
          <Button size="xl">View Course</Button>
        </Link>
      </div>
      <div className="flex w-full items-center justify-center">
        {course?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.imageUrl}
            className="max-h-[100px]"
            alt="course image"
          />
        )}
      </div>
      <div className="col-start-1 grid w-full grid-cols-3 gap-3">
        {isCourseSaved ? (
          <Button size="sm" onClick={handleUnsaveCourse}>
            Remove Save
          </Button>
        ) : (
          <Button size="sm" onClick={handleSaveCourse}>
            Save Course
          </Button>
        )}
        <Button size="sm">Enroll (mint local state)</Button>
        <Button size="sm">UnEnroll (burn local state)</Button>
      </div>
      <div className="col-span-2">
        <h2 className="my-10">{course?.description}</h2>
        <h2 className="my-5 text-2xl font-bold">{course?.title} Outline</h2>
        {courseModuleOverviews?.map((cm, i) => (
          <LearnerCourseModuleDetailsComponent courseModule={cm} key={i} />
        ))}
        {!!courseAssignments && (
          <AssignmentsSection learnerAssignments={courseAssignments} />
        )}
      </div>
    </div>
  );
}
