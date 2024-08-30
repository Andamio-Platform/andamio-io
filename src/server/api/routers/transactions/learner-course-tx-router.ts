import { z } from "zod";
import { indexerGetWithParams } from "~/lib/axios/indexer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type MintBurnLocalStateParams = {
  userAccessToken: string;
  policy: string;
};

type AssignmentCommitmentParams = {
  userAccessToken: string;
  policy: string;
  assignmentCode: string;
  assignmentInfo: string;
};

type AssignmentUpdateParams = {
  userAccessToken: string;
  policy: string;
  assignmentInfo: string;
};

type AssignmentLeaveParams = {
  userAccessToken: string;
  policy: string;
};

export const learnerCourseTxRouter = createTRPCRouter({
  mintLocalState: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        courseNftPolicyId: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      console.log("check input", input);
      const mintLocalStateParams: MintBurnLocalStateParams = {
        userAccessToken: input.userAccessTokenUnit,
        policy: input.courseNftPolicyId,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        MintBurnLocalStateParams
      >(`txs/student-actions/mintLocalState`, mintLocalStateParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build minting transaction");
    }),

  burnLocalState: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        courseNftPolicyId: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      console.log("check input", input);
      const burnLocalStateParams: MintBurnLocalStateParams = {
        userAccessToken: input.userAccessTokenUnit,
        policy: input.courseNftPolicyId,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        MintBurnLocalStateParams
      >(`txs/burnLocalState?userAccessToken`, burnLocalStateParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build minting transaction");
    }),

  commitToAssignment: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        courseNftPolicyId: z.string().length(56),
        assignmentCode: z.string().min(1),
        assignmentInfo: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const assignmentCommitmentParams: AssignmentCommitmentParams = {
        userAccessToken: input.userAccessTokenUnit,
        policy: input.courseNftPolicyId,
        assignmentCode: input.assignmentCode,
        assignmentInfo: input.assignmentInfo,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AssignmentCommitmentParams
      >(`txs/student-actions/commitToAssignment`, assignmentCommitmentParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build accept assignment transaction");
    }),

  updateAssignment: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        courseNftPolicyId: z.string().length(56),
        assignmentInfo: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const assignmentUpdateParams: AssignmentUpdateParams = {
        userAccessToken: input.userAccessTokenUnit,
        policy: input.courseNftPolicyId,
        assignmentInfo: input.assignmentInfo,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AssignmentUpdateParams
      >(`txs/student-actions/commitToAssignment`, assignmentUpdateParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build accept assignment transaction");
    }),

  leaveAssignment: publicProcedure
    .input(
      z.object({
        userAccessTokenUnit: z.string().min(62),
        courseNftPolicyId: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const assignmentLeaveParams: AssignmentLeaveParams = {
        userAccessToken: input.userAccessTokenUnit,
        policy: input.courseNftPolicyId,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AssignmentLeaveParams
      >(`txs/student-actions/commitToAssignment`, assignmentLeaveParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build accept assignment transaction");
    }),
});
