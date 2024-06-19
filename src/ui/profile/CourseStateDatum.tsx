import { DecodedCourseStateDatum } from "@andamiojs/datum-utils";
import { useEffect, useState } from "react";
import useCourseStateDatum from "../../hooks-onchain/useCourseStateDatum";

export default function CourseStateDatum({courseNftPolicy, alias}:{courseNftPolicy : string, alias: string}) {
  const [courseState, setCourseState] = useState<
    DecodedCourseStateDatum | undefined
  >(undefined);
  console.log("courseNftPolicy", courseNftPolicy)
  console.log("alias", alias)
  const { data, isLoading, isError, error } = useCourseStateDatum(courseNftPolicy, alias);
  console.log("DecodedCourseStateDatum", data?.CompletedAssignments)

  useEffect(() => {
   setCourseState(data);
  }, [data]);

  return <pre>{JSON.stringify(courseState, null, 2)}</pre>;
}
