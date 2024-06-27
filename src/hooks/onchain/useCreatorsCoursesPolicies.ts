import { useQuery } from "@tanstack/react-query"; 
import { INDEXER_URL } from "~/config/indexer";

export default function useCreatorsCoursesPolicies(alias: string) {
  return useQuery<string[], unknown>(['creatorsCourses', alias], async () => {
    const response = await fetch(`${INDEXER_URL}/api/course-governance-validator/creatorsCoursePoliciesByAlias?alias=${alias}`, {cache: "no-store"});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<string[]>;
  });
}