import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const introductionRouter = createTRPCRouter({
  getIntroduction: publicProcedure
    .input(
      z.object({
        moduleId: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.introduction.findFirst({
        where: {
          module: {
            id: input.moduleId,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        moduleId: z.string().min(1),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newIntroduction = await ctx.db.introduction.create({
        data: {
          module: { connect: { id: input.moduleId } },
          title: input.title,
        },
      });

      return newIntroduction;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        contentJson: z.any().optional(),
        live: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.introduction.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          live: input.live,
        },
      });
    }),
});
