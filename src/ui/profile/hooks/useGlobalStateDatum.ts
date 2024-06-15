import { useQuery } from "@tanstack/react-query"; 
import { INDEXER_URL } from "~/config/indexer";
import { DecodedGlobalStateDatum } from "@andamiojs/datum-utils"

export default function useGlobalStateDatum(alias: string) {
  return useQuery<DecodedGlobalStateDatum, unknown>(['globalState', alias], async () => {
    const response = await fetch(`${INDEXER_URL}/api/global-state/decodedGlobalStateDatumByAlias?alias=${alias}`, {cache: "no-store"});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<DecodedGlobalStateDatum>;
  });
}