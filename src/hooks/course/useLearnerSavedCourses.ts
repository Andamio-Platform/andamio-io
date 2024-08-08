import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function useLearnerSavedCourses() {
  const { data: sessionData } = useSession();
  const {
    data: savedCourses,
    isLoading,
    isError,
  } = api.learner.getSavedCoursesByLearner.useQuery({
    learnerId: sessionData?.user.learnerId ?? "",
  });

  return {
    savedCourses: savedCourses,
    isLoading,
    isError,
  };
}
