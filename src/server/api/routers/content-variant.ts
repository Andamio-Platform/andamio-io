import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const contentVariantRouter = createTRPCRouter({
  getcontentVariants: publicProcedure
    .input(
      z.object({
        contentId: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.contentVariant.findMany({
        where: {
          contentId: input.contentId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        contentId: z.string().min(1),
        variantCode: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        slt: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        contentJson: z.any().optional(),
        contentHtml: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contentVariant.create({
        data: {
          variantCode: input.variantCode,
          title: input.title,
          description: input.description,
          slt: input.slt,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          contentHtml: input.contentHtml,
          createdBy: { connect: { id: ctx.session.user.id } },
          content: {
            connect: {
              id: input.contentId,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        contentVariantId: z.string().min(1),
        variantCode: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        slt: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        contentJson: z.any().optional(),
        contentHtml: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contentVariant.update({
        where: {
          id: input.contentVariantId,
        },
        data: {
          title: input.title,
          description: input.description,
          slt: input.slt,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          contentHtml: input.contentHtml,
        },
      });
    }),
});
