import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import useCourse from "~/hooks/course/useCourse";
import { type LearnerAssignment } from "~/hooks/course/useLearnerAssignmentStatuses";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import AssignmentsSection from "./AssignmentSection";
import Link from "next/link";

export default function CourseDetails({
  lsCs,
  learnerAssignments,
}: {
  lsCs: string;
  learnerAssignments: LearnerAssignment[];
}) {
  const { courseInfo } = useCourseByPolicyId(lsCs);
  const { course } = useCourse(courseInfo?.courseCode ?? "");
  const [courseAssignments, setCourseAssignments] = useState<
    LearnerAssignment[]
  >([]);

  useEffect(() => {
    if (learnerAssignments && !!course) {
      const res = learnerAssignments.filter(
        (a) => a.courseCode === course.courseCode,
      );
      setCourseAssignments(res);
    }
  }, [course, learnerAssignments]);

  return (
    <div className="col-span-3 mx-auto flex w-11/12 flex-col">
      <div className="flex w-full flex-row justify-between">
        <h1 className="mb-5 font-beckman text-2xl">{course?.title}</h1>
        <h2>{course?.description}</h2>

        <Link href={`/course/${course?.courseCode}`}>
          <Button>View Course</Button>
        </Link>
      </div>
      {course?.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={course.imageUrl} className="max-w-md" alt="course image" />
      )}
      <p>
        Key question - where does the on-chain stuff go? How do learners learn
        where data goes?
      </p>
      {!!courseAssignments && (
        <AssignmentsSection learnerAssignments={courseAssignments} />
      )}
    </div>
  );
}
