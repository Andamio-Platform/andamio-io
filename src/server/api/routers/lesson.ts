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
        contentJson: z.any().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lesson.create({
        data: {
          lessonCode: input.lessonCode,
          title: input.title,
          slt: { connect: { id: input.sltId } },
          createdBy: { connect: { id: ctx.session.user.id } },
          contentJson: input.contentJson,
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

  upsert: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        moduleId: z.string().min(1),
        lessonCode: z.string().min(1),
        title: z.string().min(1),
        sltID: z.string().min(1),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        contentJson: z.any().optional(),
        live: z.boolean().optional(),
      })
    )
    .mutation(async ({ctx, input}) => {
      return ctx.db.lesson.upsert({
        where: {
          id: input.id
        },
        create: {
          lessonCode: input.lessonCode,
          title: input.title,
          sltId: input.sltID,
          moduleId: input.moduleId,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          live: input.live,
          createdById: ctx.session.user.id,
        },
        update: {
          lessonCode: input.lessonCode,
          title: input.title,
          sltId: input.sltID,
          moduleId: input.moduleId,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          live: input.live,
        }
      })
    }),

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
