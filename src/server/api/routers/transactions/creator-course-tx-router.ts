import { z } from "zod";
import { indexerGetWithParams } from "~/lib/axios/indexer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type ModuleMintingParams = {
  userAccessToken: string;
  policy: string;
  moduleInfos: string;
};

type AssignmentAcceptanceParams = {
  userAccessToken: string;
  studentAlias: string;
  policy: string;
};

export const creatorCourseTxRouter = createTRPCRouter({
  mintCourseModule: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        courseNftPolicyId: z.string().length(56),
        moduleInfos: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const moduleMintingParams: ModuleMintingParams = {
        userAccessToken: input.userAccessTokenUnit,
        policy: input.courseNftPolicyId,
        moduleInfos: input.moduleInfos,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        ModuleMintingParams
      >(`txs/course-creator-actions/mintModuleTokens`, moduleMintingParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build minting transaction");
    }),

  acceptAssignment: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        studentAlias: z.string().min(1),
        courseNftPolicyId: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const acceptAssignmentParams: AssignmentAcceptanceParams = {
        userAccessToken: input.userAccessTokenUnit,
        studentAlias: input.studentAlias,
        policy: input.courseNftPolicyId,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AssignmentAcceptanceParams
      >(`txs/course-creator-actions/acceptAssignment`, acceptAssignmentParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build accept assignment transaction");
    }),

  denyAssignment: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        studentAlias: z.string().min(1),
        courseNftPolicyId: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const denyAssignmentParams: AssignmentAcceptanceParams = {
        userAccessToken: input.userAccessTokenUnit,
        studentAlias: input.studentAlias,
        policy: input.courseNftPolicyId,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AssignmentAcceptanceParams
      >(`txs/course-creator-actions/denyAssignment`, denyAssignmentParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build deny assignment transaction");
    }),
});
