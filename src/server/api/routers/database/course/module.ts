import { TRPCError } from "@trpc/server";
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
          originalCourse: {
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
              assignments: true,
              createdById: true,
            },
          },
          lessons: {
            select: {
              id: true,
              title: true,
              live: true,
              sltId: true,
            },
          },
          assignments: true,
          introduction: true,
        },
      });
    }),

  getCourseModuleOverviews: publicProcedure
    .input(z.object({ courseCode: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.module.findMany({
        where: {
          originalCourse: {
            courseCode: input.courseCode,
          },
        },
        include: {
          originalCourse: {
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
              createdById: true,
            },
          },
          lessons: {
            select: {
              id: true,
              title: true,
              live: true,
              sltId: true,
            },
          },
          assignments: {
            select: {
              id: true,
              title: true,
              assignmentCode: true,
              live: true,
            },
          },
          introduction: {
            select: {
              id: true,
              live: true,
            },
          },
        },
      });
    }),

  getCourseModuleWithAssignmentSummary: publicProcedure
    .input(z.object({ courseCode: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.module.findMany({
        where: {
          originalCourse: {
            courseCode: input.courseCode,
          },
        },
        include: {
          originalCourse: {
            select: {
              courseCode: true,
            },
          },
          assignments: {
            select: {
              id: true,
              title: true,
              assignmentCode: true,
              live: true,
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
        releaseDate: z.coerce.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.creatorId) {
        throw new Error("User does not have Creator role.");
      }

      return ctx.db.module.create({
        data: {
          moduleCode: input.moduleCode,
          title: input.title,
          description: input.description,
          releaseDate: input.releaseDate,
          originalCourse: {
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
        releaseDate: z.coerce.date().optional(),
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
          releaseDate: input.releaseDate,
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

  copyModuleToCourse: protectedProcedure
    .input(
      z.object({
        originalCourseModuleId: z.string().min(1),
        targetCourseId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.creatorId;

      const sourceModule = await ctx.db.module.findFirst({
        where: {
          id: input.originalCourseModuleId,
          originalCourse: {
            createdById: userId, // after this is working, extend to any contributor
          },
        },
        include: {
          slts: true,
          introduction: true,
          lessons: true,
          assignments: true,
        },
      });

      if (!sourceModule) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cannot find this module in the courses you own.",
        });
      }

      const targetCourse = await ctx.db.course.findFirst({
        where: {
          id: input.targetCourseId,
          createdById: userId, // after this is working, extend to any contributor
        },
      });

      if (!targetCourse) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            "You do not have permission to copy a module to this course.",
        });
      }

      const newCourseModule = await ctx.db.module.create({
        data: {
          moduleCode: sourceModule.moduleCode + "_copy",
          title: sourceModule.title + " (copy)",
          description: sourceModule.description,
          courseId: targetCourse.id,
        },
      });

      // Copy SLTs
      for (const slt of sourceModule.slts) {
        await ctx.db.slt.create({
          data: {
            moduleId: newCourseModule.id,
            moduleIndex: slt.moduleIndex,
            sltText: slt.sltText,
            createdById: slt.createdById,
          },
        });
      }

      // Copy Lessons
      for (const lesson of sourceModule.lessons) {
        await ctx.db.lesson.create({
          data: {
            module: { connect: { id: newCourseModule.id } },
            title: lesson.title + " (Copy)",
            description: lesson.description,
            contentJson: lesson.contentJson ?? {},
            imageUrl: lesson.imageUrl,
            videoUrl: lesson.videoUrl,
            live: lesson.live,
            createdBy: { connect: { id: lesson.createdById } },
            slt: { connect: { id: lesson.sltId } }, // this is the old SLT ID - we want it to be the new one - may require additional refactoring
          },
        });
      }

      // Copy Assignments (those directly related to the module)
      for (const assignment of sourceModule.assignments) {
        await ctx.db.assignment.create({
          data: {
            moduleId: newCourseModule.id,
            assignmentCode: assignment.assignmentCode + "_copy",
            title: assignment.title + " (Copy)",
            description: assignment.description,
            contentJson: assignment.contentJson ?? {},
            imageUrl: assignment.imageUrl,
            videoUrl: assignment.videoUrl,
            live: assignment.live,
            createdById: assignment.createdById,
          },
        });
      }

      if (!!sourceModule.introduction) {
        await ctx.db.introduction.create({
          data: {
            moduleId: newCourseModule.id,
            title: sourceModule.introduction.title + " (Copy)",
            description: sourceModule.introduction.description,
            contentJson: sourceModule.introduction.contentJson ?? {},
            imageUrl: sourceModule.introduction.imageUrl,
            videoUrl: sourceModule.introduction.videoUrl,
            live: sourceModule.introduction.live,
          },
        });
      }

      return newCourseModule;
    }),
});
