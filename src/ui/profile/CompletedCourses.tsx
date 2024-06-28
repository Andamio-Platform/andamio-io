import useGlobalStateDatum from "~/hooks/onchain/useGlobalStateDatum";

export default function CompletedCourses({
  alias,
}: {
  alias: string;
}) {
  const {
    globalStateDatum,
    isLoadingGlobalStateDatum,
    isErrorGlobalStateDatum,
    errorGlobalStateDatum,
  } = useGlobalStateDatum(alias);

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
