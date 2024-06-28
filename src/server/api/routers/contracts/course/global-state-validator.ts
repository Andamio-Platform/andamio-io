import { DecodedGlobalStateDatum } from "@andamiojs/datum-utils";
import axios from "axios";
import { z } from "zod";
import { INDEXER_URL } from "~/config/indexer";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const globalStateValidatorRouter = createTRPCRouter({
  getGlobalStateDatumByAlias: protectedProcedure
    .input(
      z.object({
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const res = await axios.get(
        `${INDEXER_URL}/api/global-state/decodedGlobalStateDatumByAlias?alias=${input.alias}`,
      );
      const result: DecodedGlobalStateDatum = res.data
      return result
    }),
});
