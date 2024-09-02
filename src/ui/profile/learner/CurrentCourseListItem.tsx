import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import CompletedAssignments from "./CompletedAssignments";
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
  if (isLoadingCourseInfo) return <LoadingCircle />;

  return (
    <Link href={`/dashboard/learner/${courseInfo?.courseCode}`}>
      <div key={key} className="my-3 flex flex-col">
        <h2 className="text-xl font-semibold">{courseInfo?.title}</h2>
        <pre>{JSON.stringify(assignmentStats, null, 2)}</pre>
        <CompletedAssignments courseNftPolicy={lsCs} alias={alias} />
      </div>
    </Link>
  );
}
