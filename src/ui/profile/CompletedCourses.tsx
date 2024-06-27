import {
  DecodedGlobalStateDatum,
  DecodedTokenInfo,
} from "@andamiojs/datum-utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useGlobalStateDatum from "../../hooks/onchain/useGlobalStateDatum";
import CourseStateDatum from "./CompletedAssignments";

export default function CompletedCourses({
  alias,
  setCourses,
}: {
  alias: string;
  setCourses: Dispatch<SetStateAction<DecodedTokenInfo[]>>;
}) {
  const [globalState, setGlobalState] = useState<
    DecodedGlobalStateDatum | undefined
  >(undefined);
  const { data, isLoading, isError, error } = useGlobalStateDatum(alias);

  useEffect(() => {
    if (data) {
      setGlobalState(data);
      setCourses(data.TokenInfos);
    }
  }, [data]);

  return (
    <>
      {data &&
        data.TokenInfos.map((c, i) => {
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
