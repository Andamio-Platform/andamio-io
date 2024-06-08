import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { AssignmentCommitment } from "~/types/db";
import { api } from "~/utils/api";

type LearnerAssignment = {
  title: string;
  assignmentCode: string;
  courseTitle: string;
  courseCode: string;
  moduleTitle: string;
  moduleCode: string;
  status: "SAVE_FOR_LATER" | "IN_PROGRESS" | "COMPLETE" | "COMMITMENT";
  learnerNote: string;
};

export default function useLearnerAssignments() {
  const ctx = api.useUtils();
  const { data: sessionData } = useSession();

  const [assignmentStatuses, setAssignmentStatuses] = useState<
    AssignmentCommitment[]
  >([]);
  const [learnerAssignments, setLearnerAssignments] = useState<
    LearnerAssignment[]>([]);

  const { data: assignmentInfo } = api.assignment.getAssignments.useQuery(
    {
      assignmentIds:
        sessionData?.user.assignmentCommitments.map((a) => a.assignmentId) ??
        [],
    },
    {
      enabled: !!sessionData && !!sessionData.user.assignmentCommitments,
      staleTime: 30000,
    },
  );

  useEffect(() => {
    if (sessionData) {
      setAssignmentStatuses(sessionData.user.assignmentCommitments);
    }
  }, [sessionData, ctx]);

  useEffect(() => {
    if (assignmentInfo && assignmentStatuses) {
      const _laList: LearnerAssignment[] = [];
      assignmentStatuses.forEach((as) => {
        const aInfo = assignmentInfo.find((aI) => aI.id === as.assignmentId);

        if (aInfo) {
          const _la: LearnerAssignment = {
            title: aInfo.title,
            assignmentCode: aInfo.assignmentCode,
            courseTitle: aInfo.module.originalCourse.title,
            courseCode: aInfo.module.originalCourse.courseCode,
            moduleTitle: aInfo.module.title,
            moduleCode: aInfo.module.moduleCode,
            status: as.status,
            learnerNote: as.learnerNotes,
          };
          _laList.push(_la);
        }
      });
      setLearnerAssignments(_laList);
    }
  }, [assignmentInfo, assignmentStatuses]);

  return { assignmentStatuses, assignmentInfo, learnerAssignments };
}
