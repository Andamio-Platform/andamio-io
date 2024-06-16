import { DecodedAssignmentDecisionDatum } from "@andamiojs/datum-utils";
import { useEffect, useState } from "react";
import useAssignmentDatum from "./hooks/useAssignmentDatum";

export default function AssignmentDatum({courseNftPolicy, alias}:{courseNftPolicy : string, alias: string}) {
  const [courseState, setAssignment] = useState<
  DecodedAssignmentDecisionDatum | undefined
  >(undefined);
  const { data, isLoading, isError, error } = useAssignmentDatum(courseNftPolicy, alias);
  useEffect(() => {
   setAssignment(data);
  }, [data]);

  return <pre>{JSON.stringify(courseState, null, 2)}</pre>;
}
