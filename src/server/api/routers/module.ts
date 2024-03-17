import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const moduleRouter = createTRPCRouter({
  getModule: publicProcedure
    .input(z.object({ moduleId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.module.findFirst({
        where: {
          id: input.moduleId,
        },
        include: {
          slts: {
            select: {
              id: true,
              moduleIndex: true,
              moduleId: true,
              sltText: true,
              assignmentId: true,
              createdById: true,
            },
          },
        },
      });
    }),

  getCourseModules: publicProcedure
    .input(z.object({ courseCode: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.module.findMany({
        where: {
          course: {
            courseCode: input.courseCode,
          },
        },
        include: {
          course: {
            select: {
              courseCode: true,
            },
          },
          slts: {
            select: {
              id: true,
              moduleIndex: true,
              moduleId: true,
              sltText: true,
              assignmentId: true,
              createdById: true,
            },
          },
          lessons: {
            select: {
              id: true,
              title: true,
              lessonCode: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
        moduleCode: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.create({
        data: {
          moduleCode: input.moduleCode,
          title: input.title,
          description: input.description,
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
        moduleId: z.string().min(1, "Module ID is required"),
        courseCode: z.string().min(1, "Course code is required"),
        moduleCode: z.string().min(1, "Module code is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.update({
        where: {
          id: input.moduleId,
        },
        data: {
          title: input.title,
          description: input.description,
          moduleCode: input.moduleCode,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        moduleId: z.string().min(1, "Module ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.delete({
        where: {
          id: input.moduleId,
        },
      });
    }),
});
