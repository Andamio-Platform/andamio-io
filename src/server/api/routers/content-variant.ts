import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const contentVariantRouter = createTRPCRouter({
  getContentVariants: publicProcedure
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
        include: {
          courseVariant: true,
        },
      });
    }),

  upsert: protectedProcedure
    .input(
      z.object({
        courseVariantId: z.string().min(1),
        contentId: z.string().min(1),
        contentVariantId: z.string(),
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
      return ctx.db.contentVariant.upsert({
        where: {
          id: input.contentVariantId,
        },
        create: {
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

  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       contentId: z.string().min(1),
  //       title: z.string().min(1),
  //       description: z.string().optional(),
  //       slt: z.string().optional(),
  //       imageUrl: z.string().optional(),
  //       videoUrl: z.string().optional(),
  //       contentJson: z.any().optional(),
  //       contentHtml: z.string().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.contentVariant.create({
  //       data: {
  //         title: input.title,
  //         description: input.description,
  //         slt: input.slt,
  //         imageUrl: input.imageUrl,
  //         videoUrl: input.videoUrl,
  //         contentJson: input.contentJson,
  //         contentHtml: input.contentHtml,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //         content: {
  //           connect: {
  //             id: input.contentId,
  //           },
  //         },
  //         courseVariant
  //       },
  //     });
  //   }),

  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       contentVariantId: z.string().min(1),
  //       variantCode: z.string().min(1),
  //       title: z.string().min(1),
  //       description: z.string().optional(),
  //       slt: z.string().optional(),
  //       imageUrl: z.string().optional(),
  //       videoUrl: z.string().optional(),
  //       contentJson: z.any().optional(),
  //       contentHtml: z.string().optional(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.contentVariant.update({
  //       where: {
  //         id: input.contentVariantId,
  //       },
  //       data: {
  //         title: input.title,
  //         description: input.description,
  //         slt: input.slt,
  //         imageUrl: input.imageUrl,
  //         videoUrl: input.videoUrl,
  //         contentJson: input.contentJson,
  //         contentHtml: input.contentHtml,
  //       },
  //     });
  //   }),
});
