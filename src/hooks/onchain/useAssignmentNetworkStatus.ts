import { useWallet } from "@meshsdk/react";
import useAssignment from "../course/useAssignment";
import { useAccessToken } from "~/ui/profile/hooks/useAccessToken";
import { NETWORK } from "~/andamio.config";
import useNetworkCourseConfig from "../course/useNetworkCourseConfig";
import { api } from "~/utils/api";

export default function useAssignmentNetworkStatus(
  courseCode: string,
  moduleCode: string,
) {
  const {
    assignment,
    isLoadingAssignment,
    isErrorAssignment,
    errorAssignment,
  } = useAssignment(courseCode, moduleCode);

  const { wallet } = useWallet();

  const { data: accessTokenData } = useAccessToken(wallet);
  const { courseOnchain } = useNetworkCourseConfig(courseCode, NETWORK);

  const { data: isAssignmentOnchain, isLoading: isLoadingAssignmentOnchain } =
    api.assignmentValidator.isAssignmentOnchain.useQuery(
      {
        courseCreatorNFTPolicyID: courseOnchain?.CourseCreatorNFTPolicyID ?? "",
        assignmentCode: assignment?.assignmentCode ?? "",
      },
      {
        enabled:
          !!courseOnchain &&
          !!courseOnchain.CourseCreatorNFTPolicyID &&
          !!assignment,
      },
    );

  const { data: isLearnerCommitted, isLoading: isLoadingLearnerCommitted } =
    api.assignmentValidator.isLearnerCommittedToAssignment.useQuery(
      {
        courseCreatorNFTPolicyID: courseOnchain?.CourseCreatorNFTPolicyID ?? "",
        assignmentCode: assignment?.assignmentCode ?? "",
        alias: accessTokenData?.alias ?? "",
      },
      { enabled: !!accessTokenData && !!accessTokenData.alias },
    );

  return {
    assignment,
    isLoadingAssignment,
    isErrorAssignment,
    errorAssignment,
    isAssignmentOnchain,
    isLoadingAssignmentOnchain,
    isLearnerCommitted,
    isLoadingLearnerCommitted,
  };
}
