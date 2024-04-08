import { api } from "~/utils/api";

export default function useSLTs(
  courseCode: string,
  moduleCode: string,
) {
  const { data: slts, isLoading: isLoadingSLTs, isFetched: isFetchedSLTs } = api.slt.getModuleSLTs.useQuery({
    courseCode,
    moduleCode,
  });

  return { slts, isLoadingSLTs, isFetchedSLTs };
}
