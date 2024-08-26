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
import { Skeleton } from "~/components/ui/skeleton";
import BurnLocalStateMeshDialog from "~/components/transactions/dialogs/BurnLocalStateMeshDialog";
import { useAccessToken } from "~/hooks/onchain/useAccessToken";

export default function CourseDetails({
  currentCourseCode,
  learnerAssignments,
  courseNftPolicyId,
}: {
  currentCourseCode: string;
  learnerAssignments: LearnerAssignment[];
  courseNftPolicyId?: string;
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

  const { accessTokenAsset } = useAccessToken();

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
      <div className="col-span-3 flex min-h-[500px] w-full flex-col justify-center">
        <Image src="/andamio.png" width={200} height={200} alt="loading" />
        <Skeleton className="my-2 h-[20px] w-3/4 rounded-full bg-primary opacity-50" />
        <Skeleton className="my-2 h-[20px] w-3/4 rounded-full bg-primary opacity-50" />
        <Skeleton className="my-2 h-[20px] w-3/4 rounded-full bg-primary opacity-50" />
        <Skeleton className="my-2 h-[20px] w-3/4 rounded-full bg-primary opacity-50" />
      </div>
    );

  return (
    <div className="col-span-3 grid w-full grid-cols-2 px-5">
      <div className="col-span-2 flex h-[150px] w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-5">
          {course?.imageUrl && (
            <div className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.imageUrl}
                className="max-h-[100px]"
                alt="course image"
              />
            </div>
          )}
          <h1 className="text-4xl font-semibold">{course?.title}</h1>
        </div>
        <Link href={`/course/${course?.courseCode}`}>
          <Button size="lg">View Course</Button>
        </Link>
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
        {accessTokenAsset && courseNftPolicyId && (
          <BurnLocalStateMeshDialog
            accessTokenAssetId={accessTokenAsset.unit}
            courseNftPolicyId={courseNftPolicyId}
          />
        )}
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
