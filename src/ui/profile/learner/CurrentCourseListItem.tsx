import { useEffect, useState } from "react";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import useCourseStateDatum from "~/hooks/onchain/useCourseStateDatum";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import Link from "next/link";
import { type LearnerAssignment } from "~/hooks/course/useLearnerAssignmentStatuses";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function CurrentCourseListItem({
  lsCs,
  alias,
  learnerAssignments,
  key,
}: {
  lsCs: string;
  alias: string;
  learnerAssignments: LearnerAssignment[];
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

  const [courseAssignments, setCourseAssignments] = useState<
    LearnerAssignment[]
  >([]);

  const [completedCredentials, setCompletedCredentials] = useState<
    number | undefined
  >(undefined);

  const [completedAssignments, setCompletedAssignments] = useState<
    number | undefined
  >(undefined);

  const [completionPercentage, setCompletionPercentage] = useState<
    string | undefined
  >(undefined);

  const [credentialPercentage, setCredentialPercentage] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (learnerAssignments && !!courseInfo) {
      const res = learnerAssignments.filter(
        (a) => a.courseCode === courseInfo.courseCode,
      );
      setCourseAssignments(res);
    }
  }, [courseInfo, learnerAssignments]);

  useEffect(() => {
    if (courseStateDatum) {
      const _assignments = courseStateDatum.CompletedAssignments.length;
      setCompletedCredentials(_assignments);
    }
  }, [courseStateDatum]);

  useEffect(() => {
    if (
      completedCredentials &&
      assignmentStats &&
      assignmentStats.networkPublishedModules > 0
    ) {
      const _ratio: number =
        completedCredentials / assignmentStats.networkPublishedModules;
      const _percentage: number = _ratio * 100;
      setCredentialPercentage(_percentage.toString() + "%");
    }
  }, [completedCredentials, assignmentStats]);

  useEffect(() => {
    if (courseAssignments) {
      const _complete = courseAssignments.filter(
        (ca) => ca.status === "COMPLETE",
      );
      setCompletedAssignments(_complete.length);
    }
  }, [courseAssignments]);

  useEffect(() => {
    if (
      completedAssignments &&
      assignmentStats &&
      assignmentStats.networkPublishedModules > 0
    ) {
      const _ratio: number =
        completedAssignments / assignmentStats.modulesWithAssignments;
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
          <div className="flex flex-row items-center gap-1">
            <QuestionMarkCircledIcon />
            <p>Assignments Complete: {completionPercentage} </p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <QuestionMarkCircledIcon />
            <p>Credentials Earned: {credentialPercentage}</p>
          </div>
        </div>
        <div className="my-3 grid w-full grid-cols-1 md:grid-cols-2">
          <div>
            <ul className="ml-3 list-disc pl-5">
              <li className="my-1">
                Total Modules: {assignmentStats?.courseModules}
              </li>
              <li className="my-1">
                Assignments: {assignmentStats?.modulesWithAssignments}
              </li>
              <li className="my-1">
                Credentials to Earn: {assignmentStats?.networkPublishedModules}
              </li>
            </ul>
          </div>
          <div>
            <ul className="ml-3 list-disc pl-5">
              <li className="my-1">
                Your Completed Assignments: {completedAssignments} out of{" "}
                {assignmentStats?.modulesWithAssignments}
              </li>
              <li className="my-1">
                Your Credentials Earned: {completedCredentials} out of{" "}
                {assignmentStats?.networkPublishedModules}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}
