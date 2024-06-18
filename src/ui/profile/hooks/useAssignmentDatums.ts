import { useQuery } from "@tanstack/react-query"; 
import { INDEXER_URL } from "~/config/indexer";
import { DecodedAssignmentDecisionDatum } from "@andamiojs/datum-utils"

export default function useAssignmentDatums(courseNftPolicy: string) {
  return useQuery<DecodedAssignmentDecisionDatum[], unknown>(['assignmentDatums', courseNftPolicy], async () => {
    const response = await fetch(`${INDEXER_URL}/api/assignment-validator/decodedAssignmentDatumsByCourseNftPolicy?policy=${courseNftPolicy}`, {cache: "no-store"});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<DecodedAssignmentDecisionDatum[]>;
  });
}