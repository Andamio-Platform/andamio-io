import { Network } from "@prisma/client";
import { Course } from "~/types/db";
import { api } from "~/utils/api";

export default function useCourseOnchain(course: Course, network: Network) {
  const { data: courseOnchain, isLoading: isLoadingCourseOnchain } =
    api.courseOnChainInstance.getCourseOnchainInstances.useQuery({
      courseId: course.id,
      network: network,
    });

  return { courseOnchain, isLoadingCourseOnchain };
}
