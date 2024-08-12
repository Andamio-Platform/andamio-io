import { z } from "zod";
import { indexerGet } from "~/lib/axios/indexer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
      const unsignedTxCBOR = await indexerGet<{ unsignedTxCBOR: string }>(
        `txs/mintLocalState?userAccessToken=${input.userAccessTokenUnit}&policy=${input.courseNftPolicyId}`,
      );

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
      const unsignedTxCBOR = await indexerGet<{ unsignedTxCBOR: string }>(
        `txs/burnLocalState?userAccessToken=${input.userAccessTokenUnit}&policy=${input.courseNftPolicyId}`,
      );

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not build minting transaction");
    }),
});
