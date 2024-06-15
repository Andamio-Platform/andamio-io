import { DecodedGlobalStateDatum } from "@andamiojs/datum-utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useGlobalStateDatum from "./hooks/useGlobalStateDatum";
import CourseStateDatum from "./CourseStateDatum";

export default function GlobalStateDatum({alias, setCourses}:{alias: string, setCourses: Dispatch<SetStateAction<{
    LsCs: string;
    AssignmentList: string[];
    Minted: boolean;
}[]>>}) {
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

  return <pre>{JSON.stringify(globalState, null, 2)}</pre>
    
}
