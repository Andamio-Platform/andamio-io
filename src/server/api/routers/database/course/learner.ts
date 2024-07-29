import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const learnerRouter = createTRPCRouter({
  getLearnerByUser: publicProcedure
    .input(z.object({ userId: z.string().min(3) }))
    .query(({ ctx, input }) => {
      const user = ctx.db.learner.findFirst({
        where: {
          user: {
            id: input.userId,
          },
        },
      });

      return user;
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.learner.create({
        data: {
          user: { connect: { id: input.userId } },
        },
      });
    }),

  addLessonToLearner: protectedProcedure
    .input(
      z.object({
        learnerId: z.string().min(1),
        lessonId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const checkLesson = await ctx.db.lesson.findUnique({
        where: { id: input.lessonId },
      });
      if (!checkLesson) {
        throw new Error("Lesson does not exist");
      }

      return ctx.db.learner.update({
        where: { id: input.learnerId },
        data: {
          lessons: {
            connect: { id: input.lessonId },
          },
        },
      });
    }),

  getLearnerLessons: publicProcedure
    .input(
      z.object({
        learnerId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const learnerWithLessons = await ctx.db.learner.findUnique({
        where: { id: input.learnerId },
        include: {
          lessons: true,
        },
      });

      if (!learnerWithLessons) {
        throw new Error("Learner not found");
      }

      return learnerWithLessons.lessons;
    }),
});
