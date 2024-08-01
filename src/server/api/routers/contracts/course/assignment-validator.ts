import { z } from "zod";
import {
  type DecodedAssignmentDecisionDatum,
  type DecodedModuleRefDatum,
} from "@andamiojs/datum-utils";
import { indexerGet } from "~/lib/axios/indexer";

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
    .query(async ({ input }) => {
      type OnchainCourseModule = {
        module_token: string;
        decoded_datum: DecodedModuleRefDatum;
      };

      const onchainCourseModules = await indexerGet<OnchainCourseModule[]>(
        `module-ref/decodedModuleRefDatumsByCourseNftPolicy?policy=${input.courseCreatorNFTPolicyID}`,
      );
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
      const assignment = await indexerGet<DecodedAssignmentDecisionDatum>(
        `assignment-validator/decodedAssignmentValidatorUtxoByCourseNftPolicyAndAlias?policy=${input.courseCreatorNFTPolicyID}&alias=${input.alias}`,
      );
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
      const assignments = await indexerGet<DecodedAssignmentDecisionDatum[]>(
        `assignment-validator/decodedAssignmentDatumsByCourseNftPolicy?policy=${input.courseNftPolicy}`,
      );
      return assignments;
    }),

  getDecodedCourseAssignmentDatumsByAlias: protectedProcedure
    .input(
      z.object({
        courseCreatorNFTPolicyID: z.string().length(56),
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const assignments = await indexerGet<DecodedAssignmentDecisionDatum>(
        `assignment-validator/decodedAssignmentValidatorUtxoByCourseNftPolicyAndAlias?policy=${input.courseCreatorNFTPolicyID}&alias=${input.alias}`,
      );
      return assignments;
    }),
});
