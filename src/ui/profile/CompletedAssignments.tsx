import { DecodedCourseStateDatum } from "@andamiojs/datum-utils";
import { useEffect, useState } from "react";
import useCourseStateDatum from "../../hooks/onchain/useCourseStateDatum";

export default function CompletedAssignments({
  courseNftPolicy,
  alias,
}: {
  courseNftPolicy: string;
  alias: string;
}) {
  const [courseState, setCourseState] = useState<
    DecodedCourseStateDatum | undefined
  >(undefined);

  const { data, isLoading, isError, error } = useCourseStateDatum(
    courseNftPolicy,
    alias,
  );

  useEffect(() => {
    setCourseState(data);
  }, [data]);

  return (
    <>
      {data &&
        data.CompletedAssignments.map((c, i) => (
          <div key={i}>
            <h3>Completed Assignments</h3>
            <p key={i}>{c}</p>
          </div>
        ))}
    </>
  );
}
