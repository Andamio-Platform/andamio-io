import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export function useLearnerSavedCourses() {
  const { data: sessionData } = useSession();
  const [courseCodes, setCourseCodes] = useState<string[]>([]);
  const { data, isLoading, isError } =
    api.learner.getSavedCoursesByLearner.useQuery({
      learnerId: sessionData?.user.learnerId ?? "",
    });

  useEffect(() => {
    if (data) {
      const _courseCodes = data.savedCourses.map((c) => c.courseCode);
      setCourseCodes(_courseCodes);
    }
  }, [data]);

  const { data: savedCoursePolicies } =
    api.courseOnChainInstance.getCourseNftPolicyIds.useQuery({
      courseCodes: courseCodes,
    });

  return {
    savedCoursePolicies,
    isLoading,
    isError,
  };
}
