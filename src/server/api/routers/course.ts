import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCourses: publicProcedure.query(({ ctx }) => {
    return ctx.db.course.findMany();
  }),

  getCourse: publicProcedure
    .input(
      z.object({
        courseCode: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.course.findFirst({
        where: {
          courseCode: input.courseCode,
        },
        include: {
          modules: true,
          managers: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        courseCode: z.string().min(1, "Course code is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        category: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.create({
        data: {
          courseCode: input.courseCode,
          title: input.title,
          description: input.description,
          category: input.category,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getCoursesByOwner: protectedProcedure.query(({ ctx }) => {
    return ctx.db.course.findMany({
      where: {
        OR: [
          { createdBy: { id: ctx.session.user.id } },
          { managers: { some: { id: ctx.session.user.id } } },
        ],
      },
      include: {
        managers: true,
      },
    });
  }),

  update: protectedProcedure
    .input(
      z.object({
        courseCode: z.string().min(1, "Course code is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        category: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.update({
        where: {
          courseCode: input.courseCode,
        },
        data: {
          title: input.title,
          description: input.description,
          category: input.category,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
        },
      });
    }),

  addCourseManager: protectedProcedure
    .input(
      z.object({
        courseCode: z.string().min(1, "Course code is required"),
        userId: z.string().min(1, "User ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.update({
        where: {
          courseCode: input.courseCode,
        },
        data: {
          managers: {
            connect: { id: input.userId },
          },
        },
        include: {
          managers: true,
        },
      });
    }),

  removeCourseManager: protectedProcedure
    .input(
      z.object({
        courseCode: z.string().min(1, "Course code is required"),
        userId: z.string().min(1, "User ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.update({
        where: {
          courseCode: input.courseCode,
        },
        data: {
          managers: {
            disconnect: { id: input.userId },
          },
        },
        include: {
          managers: true,
        },
      });
    }),
});
