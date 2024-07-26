import { z } from "zod";
import { indexerGet } from "~/lib/axios/indexer";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseGovernanceValidatorRouter = createTRPCRouter({
  getCreatorCoursePoliciesByAlias: protectedProcedure
    .input(
      z.object({
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const result = (await indexerGet(
        `course-governance-validator/creatorsCoursePoliciesByAlias?alias=${input.alias}`,
      )) as string[];
      // const res = await axios.get(
      //   `${INDEXER_URL}/api/course-governance-validator/creatorsCoursePoliciesByAlias?alias=${input.alias}`,
      // );
      // const result: string[] = res.data;
      return result;
    }),
});
