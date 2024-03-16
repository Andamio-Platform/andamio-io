import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const lessonRouter = createTRPCRouter({
  getLesson: publicProcedure
    .input(
      z.object({
        courseCode: z.string(),
        moduleCode: z.string(),
        lessonCode: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.lesson.findFirst({
        where: {
          lessonCode: input.lessonCode,
          module: {
            moduleCode: input.moduleCode,
            course: {
              courseCode: input.courseCode,
            },
          },
        },
      });
    }),

  getModuleLessons: publicProcedure
    .input(z.object({ courseCode: z.string(), moduleCode: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.lesson.findMany({
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
        lessonCode: z.string().min(1),
        title: z.string().min(1),
        sltId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lesson.create({
        data: {
          lessonCode: input.lessonCode,
          title: input.title,
          slt: { connect: { id: input.sltId } },
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
        lessonCode: z.string().min(1),
        title: z.string().min(1),
        sltId: z.string().min(1),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        contentJson: z.any().optional(),
        live: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lesson.update({
        where: {
          id: input.id,
        },
        data: {
          lessonCode: input.lessonCode,
          title: input.title,
          slt: { connect: { id: input.sltId } },
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          live: input.live,
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
        lessonId: z.string().min(1, "Lesson ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.delete({
        where: {
          id: input.lessonId,
        },
      });
    }),
});
