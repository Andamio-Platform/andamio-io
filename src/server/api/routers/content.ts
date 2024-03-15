import { ContentType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const contentRouter = createTRPCRouter({
  getContent: publicProcedure
    .input(
      z.object({
        courseCode: z.string(),
        moduleCode: z.string(),
        contentCode: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.content.findFirst({
        where: {
          contentCode: input.contentCode,
          module: {
            moduleCode: input.moduleCode,
            course: {
              courseCode: input.courseCode,
            },
          },
        },
      });
    }),

  getModuleContents: publicProcedure
    .input(z.object({ courseCode: z.string(), moduleCode: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.content.findMany({
        where: {
          module: {
            moduleCode: input.moduleCode,
            course: {
              courseCode: input.courseCode,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        moduleId: z.string().min(1),
        contentCode: z.string().min(1),
        type: z.nativeEnum(ContentType),
        title: z.string().min(1),
        slt: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.content.create({
        data: {
          contentCode: input.contentCode,
          type: input.type,
          title: input.title,
          slt: input.slt,
          createdBy: { connect: { id: ctx.session.user.id } },
          module: {
            connect: {
              id: input.moduleId,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        contentCode: z.string().min(1),
        type: z.nativeEnum(ContentType),
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
      return ctx.db.content.update({
        where: {
          id: input.id,
        },
        data: {
          contentCode: input.contentCode,
          type: input.type,
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

    // 2024-03-15 pick up here...
  // createMany: protectedProcedure
  //   .input(
  //     z.object({}).array()
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.content.createMany({}[])
  //   )

  //   })

  delete: protectedProcedure
    .input(
      z.object({
        contentId: z.string().min(1, "Content ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.delete({
        where: {
          id: input.contentId,
        },
      });
    }),
});
