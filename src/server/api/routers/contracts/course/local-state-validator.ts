import { z } from "zod";
import { type DecodedCourseStateDatum } from "@andamiojs/datum-utils";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { indexerGet } from "~/lib/axios/indexer";

export const localStateValidatorRouter = createTRPCRouter({
  getCourseStateDatumByAlias: protectedProcedure
    .input(
      z.object({
        courseNftPolicy: z.string().length(56),
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const localStateValidator = indexerGet<DecodedCourseStateDatum>(
        `course-state/decodedCourseStateDatumByCourseNftPolicyAndAlias?policy=${input.courseNftPolicy}&alias=${input.alias}`,
      );
      return localStateValidator;
    }),
});
