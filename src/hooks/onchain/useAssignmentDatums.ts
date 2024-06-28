import { api } from "~/utils/api";

export default function useAssignmentDatums(
  courseNftPolicy: string,
  alias?: string,
) {
  // return useQuery<DecodedAssignmentDecisionDatum[], unknown>(['assignmentDatums', courseNftPolicy], async () => {
  //   const response = await fetch(`${INDEXER_URL}/api/assignment-validator/decodedAssignmentDatumsByCourseNftPolicy?policy=${courseNftPolicy}`, {cache: "no-store"});
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json() as Promise<DecodedAssignmentDecisionDatum[]>;
  // });

  const {
    data: listCourseAssignmentDatums,
    isLoading: isLoadingListCourseAssignmentDatums,
    isError: isErrorListCourseAssignmentDatums,
    error: errorListCourseAssignmentDatums,
  } = api.assignmentValidator.getDecodedCourseAssignmentDatums.useQuery(
    {
      courseNftPolicy: courseNftPolicy,
    },
    { enabled: !alias },
  );

  const {
    data: assignmentDatum,
    isLoading: isLoadingAssignmentDatum,
    isError: isErrorAssignmentDatum,
    error: errorAssignmentDatum,
  } = api.assignmentValidator.getDecodedCourseAssignmentDatumsByAlias.useQuery(
    {
      courseCreatorNFTPolicyID: courseNftPolicy,
      alias: alias!,
    },
    {
      enabled: !!alias,
    },
  );

  return {
    listCourseAssignmentDatums,
    isLoadingListCourseAssignmentDatums,
    isErrorListCourseAssignmentDatums,
    errorListCourseAssignmentDatums,
    assignmentDatum,
    isLoadingAssignmentDatum,
    isErrorAssignmentDatum,
    errorAssignmentDatum,
  };
}
