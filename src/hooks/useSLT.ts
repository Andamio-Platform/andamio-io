import { api } from "~/utils/api";

export default function useSLT(
  courseCode: string,
  moduleCode: string,
  moduleIndex: number,
) {
  const { data: slt, isLoading } = api.slt.getSLT.useQuery({
    courseCode,
    moduleCode,
    moduleIndex
  });

  return { slt, isLoading };
}
