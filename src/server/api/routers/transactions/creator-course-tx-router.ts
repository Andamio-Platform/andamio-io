import { z } from "zod";
import { indexerGetWithParams } from "~/lib/axios/indexer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type ModuleMintingParams = {
  userAccessToken: string;
  policy: string;
  moduleInfos: string;
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
      console.log("check input", input);
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
});
