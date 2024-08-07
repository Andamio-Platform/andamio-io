import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";
import LoadingCircle from "~/ui/studio/components/ContentEditor/ui/icons/loading-circle";

export default function CompletedCourses({ alias }: { alias: string }) {
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
    </>
  );
}
