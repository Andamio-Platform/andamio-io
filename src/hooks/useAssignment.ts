import { api } from "~/utils/api";

export default function useAssignment(
  courseCode: string,
  moduleCode: string,
) {
  const {
    data: assignment,
    isLoading: isLoadingAssignment,
    isError: isErrorAssignment,
    error: errorAssignment,
    refetch: refetchAssignment,
  } = api.assignment.getAssignment.useQuery({
    courseCode,
    moduleCode,
  });
  console.log("Check2", assignment)

  return { assignment, isLoadingAssignment, isErrorAssignment, errorAssignment, refetchAssignment };
}
