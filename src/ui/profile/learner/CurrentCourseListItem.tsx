import { Button } from "~/components/ui/button";
import useCourseByPolicyId from "~/hooks/onchain/useCourseByPolicyId";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import CompletedAssignments from "./CompletedAssignments";
export default function CurrentCourseListItem({
  lsCs,
  setSelectedCourse,
  setSelectedCoursePolicyId,
  alias,
  key,
}: {
  lsCs: string;
  setSelectedCourse?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedCoursePolicyId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  alias: string;
  key: number;
}) {
  const { courseInfo, isLoadingCourseInfo, assignmentStats } =
    useCourseByPolicyId(lsCs);
  if (isLoadingCourseInfo) return <LoadingCircle />;

  function handleSelectCourse() {
    if (!!setSelectedCourse) {
      setSelectedCourse(courseInfo?.courseCode);
    }

    setSelectedCoursePolicyId(lsCs);
  }

  return (
    <div
      key={key}
      className="my-3 flex flex-col"
      onClick={() => setSelectedCoursePolicyId(lsCs)}
    >
      <h2 className="text-xl font-semibold">{courseInfo?.title}</h2>
      <pre>{JSON.stringify(assignmentStats, null, 2)}</pre>
      <CompletedAssignments courseNftPolicy={lsCs} alias={alias} />
      <Button onClick={handleSelectCourse}>Show Course Details</Button>
    </div>
  );
}
