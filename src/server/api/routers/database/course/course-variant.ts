import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseVariantRouter = createTRPCRouter({
  getCourseVariants: publicProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.courseVariant.findMany({
        where: {
          courseId: input.courseId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
        variantCode: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseVariant.create({
        data: {
          variantCode: input.variantCode,
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          course: {
            connect: {
              id: input.courseId,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        courseVariantId: z.string().min(1),
        variantCode: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseVariant.update({
        where: {
          id: input.courseVariantId,
        },
        data: {
          variantCode: input.variantCode,
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
        },
      });
    }),
});
