import { z } from "zod";
import { indexerGetWithParams } from "~/lib/axios/indexer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type AccessTokenMintingParams = {
  userAddress: string;
  alias: string;
  userInfo: string;
};

export const accessTokenTxRouter = createTRPCRouter({
  mintAccessToken: publicProcedure
    .input(
      z.object({
        userAddress: z.string().min(62),
        alias: z.string().min(2),
      }),
    )
    .query(async ({ input }) => {
      const accessTokenMintingParams: AccessTokenMintingParams = {
        userAddress: input.userAddress,
        alias: input.alias,
        userInfo: "Andamio Access Token",
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AccessTokenMintingParams
      >(`txs/mintAccessToken`, accessTokenMintingParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not mint access token");
    }),
});
