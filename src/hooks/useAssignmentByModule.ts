import { api } from "~/utils/api";

export default function useAssignmentByModule(
  moduleId: string,
) {
  const {
    data: assignment,
    isLoading: isLoadingAssignment,
    isError: isErrorAssignment,
    error: errorAssignment,
    refetch: refetchAssignment,
  } = api.assignment.getAssignmentByModuleId.useQuery({
    moduleId,
  });

  return { assignment, isLoadingAssignment, isErrorAssignment, errorAssignment, refetchAssignment };
}
