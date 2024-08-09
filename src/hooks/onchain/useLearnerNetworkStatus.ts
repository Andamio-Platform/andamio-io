import { type Asset } from "@meshsdk/core";
import { api } from "~/utils/api";

export default function useLearnerNetworkStatus(
  accessToken: Asset | undefined,
) {
  // Todo: find or implement onchain assignment commitment type
  //  const [currentAssignments, setCurrentAssignments] = useState<any[]>([]);

  const { data: courseEnrollments, isLoading: isLoadingCourseEnrollments } =
    api.learnerOnchain.getCoursesByTokenName.useQuery(
      {
        tokenName: accessToken?.unit.substring(62) ?? "",
      },
      { enabled: !!accessToken },
    );

  const { data: courseInfos, isLoading: isLoadingCourseInfos } =
    api.course.getCoursesByCourseCodes.useQuery(
      {
        courseCodes: courseEnrollments?.map((ce) => ce?.course ?? "") ?? [""],
      },
      { enabled: !!courseEnrollments },
    );

  // Todo: Implement Assignment Status after on-chain upgrades

  return {
    courseEnrollments,
    courseInfos,
    isLoadingCourseEnrollments,
    isLoadingCourseInfos,
  };
}
