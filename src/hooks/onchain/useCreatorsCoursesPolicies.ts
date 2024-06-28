import { api } from "~/utils/api";

export default function useCreatorsCoursesPolicies(alias: string) {
  const {
    data: creatorCoursePolicies,
    isLoading: isLoadingCreatorCoursePolicies,
    isError: isErrorCreatorCoursePolicies,
    error: errorCreatorCoursePolicies,
  } = api.courseGovernanceValidator.getCreatorCoursePoliciesByAlias.useQuery({
    alias,
  });

  return {
    creatorCoursePolicies,
    isLoadingCreatorCoursePolicies,
    isErrorCreatorCoursePolicies,
    errorCreatorCoursePolicies,
  };
}
