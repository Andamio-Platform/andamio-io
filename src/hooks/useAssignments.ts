import { api } from "~/utils/api";


// WIP 2024-04-08 - courseId is redundant, remove it.
export default function useAssignments(
  courseId: string,
  moduleId: string,
) {
  const {
    data: assignments,
    isLoading: isLoadingAssignments,
    isError: isErrorAssignments,
    error: errorAssignments,
    refetch: refetchAssignments,
  } = api.assignment.getModuleAssignments.useQuery({
    courseId,
    moduleId,
  });

  return { assignments, isLoadingAssignments, isErrorAssignments, errorAssignments, refetchAssignments };
}
