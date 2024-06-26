import { useWallet } from "@meshsdk/react";
import { useAccessToken } from "~/ui/profile/hooks/useAccessToken";
import { api } from "~/utils/api";
import { NETWORK } from "~/andamio.config";
import useCourseOnchain from "~/hooks/useCourseOnchain";

export default function useAssignmentByCourseModule(
  courseCode: string,
  moduleCode: string,
) {
  const { wallet } = useWallet();
  const { data: accessTokenData } = useAccessToken(wallet);

  const { courseOnchain } = useCourseOnchain(courseCode, NETWORK);

  const {
    data: assignment,
    isLoading: isLoadingAssignment,
    isError: isErrorAssignment,
    error: errorAssignment,
    refetch: refetchAssignment,
  } = api.assignment.getAssignmentByCourseModuleCodes.useQuery({
    courseCode,
    moduleCode,
  });

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
    refetchAssignment,
    isAssignmentOnchain,
    isLoadingAssignmentOnchain,
    isLearnerCommitted,
    isLoadingLearnerCommitted,
  };
}
