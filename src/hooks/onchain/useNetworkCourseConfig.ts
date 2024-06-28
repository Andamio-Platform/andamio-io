import { Network } from "@prisma/client";
import { Course } from "~/types/db";
import { api } from "~/utils/api";

export default function useNetworkCourseConfig(courseCode: string, network: Network) {
  const { data: courseOnchain, isLoading: isLoadingCourseOnchain } =
    api.courseOnChainInstance.getCourseOnchainInstances.useQuery({
      courseCode: courseCode,
      network: network,
    });

  return { courseOnchain, isLoadingCourseOnchain };
}
