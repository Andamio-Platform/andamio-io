import { api } from "~/utils/api";

export default function useAssignment(courseCode: string, moduleCode: string) {
  const {
    data: assignment,
    isLoading: isLoadingAssignment,
    isError: isErrorAssignment,
    error: errorAssignment,
    refetch: refetchAssignment,
  } = api.assignment.getAssignmentByCourseModuleCodes.useQuery({
    courseCode,
    moduleCode,
  });

  return { assignment, isLoadingAssignment, isErrorAssignment, errorAssignment };
}
