import { z } from "zod";
import maestro from "~/config/maestro";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// TODO: James ask Nelson if this is completely outdated now :)

export const learnerOnChainRouter = createTRPCRouter({
  getCoursesByTokenName: publicProcedure
    .input(z.object({ tokenName: z.string().min(3) }))
    .query(async ({ ctx, input }) => {
      const courses = await ctx.db.courseOnChainInstance.findMany();

      const courseQueries = courses.map(async (c) => {
        const _course = await maestro
          .fetchAssetAddresses(c.LocalStatePolicyID + input.tokenName) // This is currently a lot of maestro queries - perfect to replace with local state indexer
          .then((res) => {
            if (res[0]?.address) {
              return {
                course: c.courseCode,
                assignment: res[0]?.address === c.AssignmentValidatorAddress,
              };
            }
          });
        if (_course) return _course;
      });

      const courseList = await Promise.all(courseQueries);
      return courseList.filter(
        (c) => c !== undefined && c.course !== undefined,
      );
    }),
});
