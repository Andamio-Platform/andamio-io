import { AccessTier } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCourses: publicProcedure.query(({ ctx }) => {
    return ctx.db.course.findMany({
      include: {
        onchainInstance: true,
      },
    });
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
          contributors: {
            include: {
              user: true,
            },
          },
          variants: true,
        },
      });
    }),

  getCourseById: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.course.findFirst({
        where: {
          id: input.courseId,
        },
        include: {
          modules: true,
          contributors: {
            include: {
              user: true,
            },
          },
          variants: true,
        },
      });
    }),

  getCoursesByIds: publicProcedure
    .input(z.object({ courseIds: z.array(z.string()) }))
    .query(({ ctx, input }) => {
      return ctx.db.course.findMany({
        where: {
          id: {
            in: input.courseIds,
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        courseCode: z.string().min(1, "Course code is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        category: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.creatorId) {
        throw new Error("User does not have Creator role.");
      }

      return ctx.db.course.create({
        data: {
          courseCode: input.courseCode,
          title: input.title,
          description: input.description,
          category: input.category,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          accessTier: "HIDDEN",
          createdBy: { connect: { id: ctx.session.user.creatorId } },
        },
      });
    }),

  getCoursesByOwner: protectedProcedure.query(({ ctx }) => {
    return ctx.db.course.findMany({
      where: {
        OR: [
          { createdBy: { id: ctx.session.user.creatorId } },
          { contributors: { some: { id: ctx.session.user.creatorId } } },
        ],
      },
      include: {
        modules: true,
        contributors: {
          include: {
            user: true,
          },
        },
        variants: true,
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
        accessTier: z.nativeEnum(AccessTier).optional()
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
          accessTier: input.accessTier,
        },
      });
    }),

  addCourseContributor: protectedProcedure
    .input(
      z.object({
        courseCode: z.string().min(1, "Course code is required"),
        creatorId: z.string().min(1, "Creator ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.course.update({
        where: {
          courseCode: input.courseCode,
        },
        data: {
          contributors: {
            connect: { userId: input.creatorId },
          },
        },
        include: {
          contributors: true,
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
          contributors: {
            disconnect: { id: input.userId },
          },
        },
        include: {
          contributors: true,
        },
      });
    }),
});
