import { type DecodedGlobalStateDatum } from "@andamiojs/datum-utils";
import { z } from "zod";

import { indexerGet } from "~/lib/axios/indexer";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const globalStateValidatorRouter = createTRPCRouter({
  getGlobalStateDatumByAlias: protectedProcedure
    .input(
      z.object({
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const globalState = indexerGet<DecodedGlobalStateDatum>(
        `global-state/decodedGlobalStateDatumByAlias?alias=${input.alias}`,
      );
      return globalState;
    }),
});
