import { useEffect, useState } from "react";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import useCourseStateDatum from "~/hooks/onchain/useCourseStateDatum";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import Link from "next/link";
export default function CurrentCourseListItem({
  lsCs,
  alias,
  key,
}: {
  lsCs: string;
  alias: string;
  key: number;
}) {
  const { courseInfo, isLoadingCourseInfo, assignmentStats } =
    useCourseByPolicyId(lsCs);
  const {
    courseStateDatum,
    isLoadingCourseStateDatum,
    isErrorCourseStateDatum,
    errorCourseStateDatum,
  } = useCourseStateDatum(lsCs, alias);

  const [completedAssignments, setCompletedAssignments] = useState<
    number | undefined
  >(undefined);

  const [completionPercentage, setCompletionPercentage] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (courseStateDatum) {
      const _assignments = courseStateDatum.CompletedAssignments.length;
      setCompletedAssignments(_assignments);
    }
  }, [courseStateDatum]);

  useEffect(() => {
    if (
      completedAssignments &&
      assignmentStats &&
      assignmentStats.networkPublishedModules > 0
    ) {
      const _ratio: number =
        completedAssignments / assignmentStats.networkPublishedModules;
      const _percentage: number = _ratio * 100;
      setCompletionPercentage(_percentage.toString() + "%");
    }
  }, [completedAssignments, assignmentStats]);

  if (isLoadingCourseInfo) return <LoadingCircle />;
  if (isLoadingCourseStateDatum) {
    return <LoadingCircle />;
  }

  if (isErrorCourseStateDatum) {
    return (
      <div>
        <p>ERROR</p>
        <p>{lsCs}</p>
        <p>{alias}</p>
        <pre>{JSON.stringify(errorCourseStateDatum, null, 2)}</pre>
      </div>
    );
  }

  return (
    <Link href={`/dashboard/learner/${courseInfo?.courseCode}`}>
      <div key={key} className="my-3 flex flex-col">
        <div className="flex w-full flex-col items-center bg-primary px-3 py-2 text-primary-foreground md:flex-row md:justify-between">
          <h2 className="text-xl font-semibold">{courseInfo?.title}</h2>
          <p>Percent Completed: {completionPercentage}</p>
        </div>
        <ul className="ml-3 list-disc pl-5">
          <li className="my-1">
            Course Modules: {assignmentStats?.courseModules}
          </li>
          <li className="my-1">
            Modules with Assignments: {assignmentStats?.modulesWithAssignments}
          </li>
          <li className="my-1">
            Published Modules: {assignmentStats?.networkPublishedModules}
          </li>
          <li className="my-1">
            Your Completed Assignments: {completedAssignments}
          </li>
        </ul>
      </div>
    </Link>
  );
}
