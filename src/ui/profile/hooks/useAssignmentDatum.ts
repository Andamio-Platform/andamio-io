import { useQuery } from "@tanstack/react-query"; 
import { INDEXER_URL } from "~/config/indexer";
import { DecodedAssignmentDecisionDatum } from "@andamiojs/datum-utils"

export default function useAssignmentDatum(courseNftPolicy: string, alias: string) {
  return useQuery<DecodedAssignmentDecisionDatum, unknown>(['assignment', courseNftPolicy, alias], async () => {
    const response = await fetch(`${INDEXER_URL}/api/assignment-validator/decodedAssignmentValidatorUtxoByCourseNftPolicyAndAlias?policy=${courseNftPolicy}&alias=${alias}`, {cache: "no-store"});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<DecodedAssignmentDecisionDatum>;
  });
}