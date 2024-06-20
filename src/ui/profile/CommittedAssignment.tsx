import { DecodedAssignmentDecisionDatum } from "@andamiojs/datum-utils";
import { useEffect, useState } from "react";
import useAssignmentDatum from "../../hooks-onchain/useAssignmentDatum";

export default function CommittedAssignment({
  courseNftPolicy,
  alias,
}: {
  courseNftPolicy: string;
  alias: string;
}) {
  const [courseState, setAssignment] = useState<
    DecodedAssignmentDecisionDatum | undefined
  >(undefined);
  const { data, isLoading, isError, error } = useAssignmentDatum(
    courseNftPolicy,
    alias,
  );
  useEffect(() => {
    setAssignment(data);
  }, [data]);

  return data && <div>
    {courseNftPolicy} - {data.CommittedAssignmentId} - {data.StudentAssignmentInfo? data.StudentAssignmentInfo : "No Assignment Info"}
  </div>;
}
