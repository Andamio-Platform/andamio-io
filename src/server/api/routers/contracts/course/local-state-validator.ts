import axios from "axios";
import { z } from "zod";
import { type DecodedCourseStateDatum } from "@andamiojs/datum-utils";
import { INDEXER_URL } from "~/config/indexer";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const localStateValidatorRouter = createTRPCRouter({
  getCourseStateDatumByAlias: protectedProcedure
    .input(
      z.object({
        courseNftPolicy: z.string().length(56),
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const res = await axios.get(
        `${INDEXER_URL}/api/course-state/decodedCourseStateDatumByCourseNftPolicyAndAlias?policy=${input.courseNftPolicy}&alias=${input.alias}`,
      );
      const result: DecodedCourseStateDatum = res.data;
      return result;
    }),
});
