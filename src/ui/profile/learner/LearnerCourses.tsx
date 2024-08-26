import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";
import CurrentCourseListItem from "./CurrentCourseListItem";

// TODO: Rename

export default function LearnerCourses({
  alias,
  setSelectedCourse,
  setSelectedCoursePolicyId,
}: {
  alias: string;
  setSelectedCourse?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedCoursePolicyId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) {
  const {
    globalStateDatum,
    isLoadingGlobalStateDatum,
    isErrorGlobalStateDatum,
    errorGlobalStateDatum,
  } = useGlobalStateDatum(alias);
  if (isLoadingGlobalStateDatum) {
    return <LoadingCircle />;
  }
  if (isErrorGlobalStateDatum) {
    return (
      <div>
        <pre>{JSON.stringify(errorGlobalStateDatum, null, 2)}</pre>
      </div>
    );
  }
  return (
    <>
      <div className="mb-3 flex w-full flex-col rounded-md border border-primary p-3">
        <h2 className="font-beckman text-xl">Current Courses</h2>
        <p>You are currently enrolled in these courses:</p>
        {/* TODO: Create a component for enrolled courses to get overview status */}
        {globalStateDatum &&
          globalStateDatum.TokenInfos.map((c, i) => {
            if (c.Minted) {
              return (
                <div key={i}>
                  <CurrentCourseListItem
                    lsCs={c.LsCs}
                    setSelectedCourse={setSelectedCourse}
                    setSelectedCoursePolicyId={setSelectedCoursePolicyId}
                    key={i}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className="mb-3 flex w-full flex-col rounded-md border border-primary p-3">
        <h2 className="font-beckman text-xl">Completed Courses</h2>
        <p>You have completed the following courses:</p>
        {globalStateDatum &&
          globalStateDatum.TokenInfos.map((c, i) => {
            if (!c.Minted) {
              return (
                <div key={i}>
                  <p>{c.LsCs}</p>
                  <div>
                    <h3>Completed Assignments</h3>
                    {c.AssignmentList.map((a, i) => (
                      <p key={i}>{a}</p>
                    ))}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}
