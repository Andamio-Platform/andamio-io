import axios from "axios";
import { z } from "zod";
import {
  DecodedAssignmentDecisionDatum,
  DecodedModuleRefDatum,
} from "@andamiojs/datum-utils";
import { INDEXER_URL } from "~/config/indexer";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const assignmentValidatorRouter = createTRPCRouter({
  isAssignmentOnchain: publicProcedure
    .input(
      z.object({
        courseCreatorNFTPolicyID: z.string().length(56),
        assignmentCode: z.string().min(3),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await axios.get(
        `${INDEXER_URL}/api/module-ref/decodedModuleRefDatumsByCourseNftPolicy?policy=${input.courseCreatorNFTPolicyID}`,
      );
      const onchainCourseModules: {
        module_token: string;
        decoded_datum: DecodedModuleRefDatum;
      }[] = res.data;

      if (
        onchainCourseModules.some(
          (m) => m.module_token === input.assignmentCode,
        )
      ) {
        return true;
      } else {
        return false;
      }
    }),

  isLearnerCommittedToAssignment: protectedProcedure
    .input(
      z.object({
        courseCreatorNFTPolicyID: z.string().length(56),
        assignmentCode: z.string().min(3),
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const res = await axios.get(
        `${INDEXER_URL}/api/assignment-validator/decodedAssignmentValidatorUtxoByCourseNftPolicyAndAlias?policy=${input.courseCreatorNFTPolicyID}&alias=${input.alias}`,
      );
      const assignment: DecodedAssignmentDecisionDatum = res.data;
      if (assignment.CommittedAssignmentId === input.assignmentCode) {
        return true;
      } else {
        return false;
      }
    }),

  getDecodedCourseAssignmentDatums: protectedProcedure
    .input(
      z.object({
        courseNftPolicy: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const res = await axios.get(
        `${INDEXER_URL}/api/assignment-validator/decodedAssignmentDatumsByCourseNftPolicy?policy=${input.courseNftPolicy}`,
      );
      const result: DecodedAssignmentDecisionDatum[] = res.data
      return result
    }),
  
  getDecodedCourseAssignmentDatumsByAlias: protectedProcedure
  .input(
    z.object({
      courseCreatorNFTPolicyID: z.string().length(56),
      alias: z.string().min(1),
    }),
  )
  .query(async ({ input }) => {
    const res = await axios.get(
      `${INDEXER_URL}/api/assignment-validator/decodedAssignmentValidatorUtxoByCourseNftPolicyAndAlias?policy=${input.courseCreatorNFTPolicyID}&alias=${input.alias}`,
    );
    const result: DecodedAssignmentDecisionDatum = res.data
    return result
  }),
});
