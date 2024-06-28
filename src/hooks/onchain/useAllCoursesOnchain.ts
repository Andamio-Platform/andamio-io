import { Network } from "@prisma/client";
import { Course } from "~/types/db";
import { api } from "~/utils/api";

export default function useNetworkCourseConfig() {
  const { data: AllCoursesOnchain, isLoading: isLoadingAllCoursesOnchain } =
    api.courseOnChainInstance.getAllCoursesOnchain.useQuery();

  return { AllCoursesOnchain, isLoadingAllCoursesOnchain };
}
