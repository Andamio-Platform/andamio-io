import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const clientDomainsRouter = createTRPCRouter({
  getCourseCodeFromHost: publicProcedure
    .input(
      z.object({
        host: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.clientsDomain.findFirst({
        where: {
          host: input.host,
        },
      });
    }),

  updateHost: protectedProcedure
    .input(
      z.object({
        host: z.string().min(1),
        courseId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.clientsDomain.upsert({
        where: {
          courseId: input.courseId,
        },
        create: {
          host: input.host,
          courseId: input.courseId,
        },
        update: {
          host: input.host,
        },
      });
    }),
});
