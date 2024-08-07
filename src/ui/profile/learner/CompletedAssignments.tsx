import useCourseStateDatum from "~/hooks/onchain/useCourseStateDatum";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function CompletedAssignments({
  courseNftPolicy,
  alias,
}: {
  courseNftPolicy: string;
  alias: string;
}) {
  const {
    courseStateDatum,
    isLoadingCourseStateDatum,
    isErrorCourseStateDatum,
    errorCourseStateDatum,
  } = useCourseStateDatum(courseNftPolicy, alias);

  if (isLoadingCourseStateDatum) {
    return <LoadingCircle />;
  }

  if (isErrorCourseStateDatum) {
    return (
      <div>
        <pre>{JSON.stringify(errorCourseStateDatum, null, 2)}</pre>
      </div>
    );
  }
  return (
    <>
      {courseStateDatum &&
        courseStateDatum.CompletedAssignments.map((c, i) => (
          <div key={i}>
            <h3>Completed Assignments</h3>
            <p key={i}>{c}</p>
          </div>
        ))}
    </>
  );
}
