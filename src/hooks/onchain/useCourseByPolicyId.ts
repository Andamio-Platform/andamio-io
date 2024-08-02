import { api } from "~/utils/api";

export default function useCourseByPolicyId(courseNftPolicy: string) {
  const { data: courseInfo, isLoading: isLoadingCourseInfo } =
    api.courseOnChainInstance.getCourseByCourseNftPolicy.useQuery(
      {
        CourseCreatorNFTPolicyID: courseNftPolicy,
      },
      { enabled: !!courseNftPolicy },
    );
  return { courseInfo, isLoadingCourseInfo };
}
