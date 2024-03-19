import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const moduleVariantRouter = createTRPCRouter({
  getModuleVariants: publicProcedure
    .input(
      z.object({
        moduleId: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.moduleVariant.findMany({
        where: {
          moduleId: input.moduleId,
        },
        include: {
          courseVariant: true,
          module: true
        },
      });
    }),

  getCourseModuleVariants: publicProcedure
    .input(
      z.object({
        courseVariantId: z.string().min(1),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.moduleVariant.findMany({
        where: {
          courseVariantId: input.courseVariantId,
        },
        include: {
          courseVariant: true,
          sltVariants: true,
          module: true
        },
      });
    }),

  getModuleVariant: publicProcedure
    .input(
      z.object({
        courseVariantId: z.string().min(1),
        moduleId: z.string().min(1)
      })
    )
    .query(({ctx, input}) => {
      return ctx.db.moduleVariant.findFirst({
        where: {
          moduleId: input.moduleId,
          courseVariantId: input.courseVariantId
        },
        include: {
          module: true,
          courseVariant: true,
          sltVariants: true
        }
      })
    }),

  upsert: protectedProcedure
    .input(
      z.object({
        courseVariantId: z.string().min(1),
        moduleId: z.string().min(1),
        moduleVariantId: z.string(),
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.moduleVariant.upsert({
        where: {
          id: input.moduleVariantId,
        },
        create: {
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          module: {
            connect: {
              id: input.moduleId,
            },
          },
          courseVariant: {
            connect: {
              id: input.courseVariantId,
            },
          },
        },
        update: {
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
        },
      });
    }),
});
