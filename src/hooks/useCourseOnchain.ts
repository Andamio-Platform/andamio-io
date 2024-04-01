import { Network } from "@prisma/client";
import { Course } from "~/types/db";
import { api } from "~/utils/api";

export default function useCourseOnchain(courseId: string, network: Network) {

  const { data: courseOnchain, isLoading: isLoadingCourseOnchain } =
    api.courseOnChainInstance.getCourseOnchainInstances.useQuery({
      courseId: courseId,
      network: network,
    });

  return { courseOnchain, isLoadingCourseOnchain };
}
