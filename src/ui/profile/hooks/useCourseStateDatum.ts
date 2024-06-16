import { useQuery } from "@tanstack/react-query"; 
import { INDEXER_URL } from "~/config/indexer";
import { DecodedCourseStateDatum } from "@andamiojs/datum-utils"

export default function useCourseStateDatum(courseNftPolicy: string, alias: string) {
  return useQuery<DecodedCourseStateDatum, unknown>(['courseState', courseNftPolicy, alias], async () => {
    const response = await fetch(`${INDEXER_URL}/api/course-state/decodedCourseStateDatumByCourseNftPolicyAndAlias?policy=${courseNftPolicy}&alias=${alias}`, {cache: "no-store"});
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('Error message:', errorMessage );
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<DecodedCourseStateDatum>;
  });
}