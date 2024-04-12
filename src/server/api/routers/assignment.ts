import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Get one Assignment
export const assignmentRouter = createTRPCRouter({
  getAssignmentByCourseModuleCodes: publicProcedure
    .input(
      z.object({
        courseCode: z.string(),
        moduleCode: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.assignment.findFirst({
        where: {
          module: {
            moduleCode: input.moduleCode,
            originalCourse: {
              courseCode: input.courseCode,
            },
          },
        },
        include: {
          slts: true,
        },
      });
    }),

  // Get all Assignments
  // getAssignmentByCourseModuleCodes and getAssignmentByModuleId might be redundant for now - don't delete yet
  // Think about how Assigments might not need "Variants"?

  // WIP 2024-04-08 - courseId is redundant, remove it.
  getAssignmentByModuleId: publicProcedure
    .input(
      z.object({
        moduleId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.assignment.findFirst({
        where: {
          module: {
            id: input.moduleId,
          },
        },
        include: {
          slts: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        moduleId: z.string().min(1),
        sltIds: z.array(z.string().min(1)),
        assignmentCode: z.string().min(1),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.creatorId) {
        throw new Error("User does not have Creator role.");
      }

      const newAssignment = await ctx.db.assignment.create({
        data: {
          assignmentCode: input.assignmentCode,
          title: input.title,
          module: { connect: { id: input.moduleId } },
          createdBy: { connect: { id: ctx.session.user.creatorId } },
          slts: { connect: input.sltIds.map((id) => ({ id })) },
        },
      });

      return newAssignment;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        assignmentCode: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        contentJson: z.any().optional(),
        live: z.boolean().optional(),
        sltIds: z.array(z.string().min(1)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentAssignment = await ctx.db.assignment.findUnique({
        where: { id: input.id },
        select: { slts: true },
      });

      // Determine slts to disconnect
      const currentSltIds = new Set(
        currentAssignment?.slts.map((slt) => slt.id),
      );
      const newSltIds = new Set(input.sltIds);
      const sltsToDisconnect = [...currentSltIds].filter(
        (id) => !newSltIds.has(id),
      );

      // Prepare connect and disconnect operations
      const connect = input.sltIds.map((id) => ({ id }));
      const disconnect = sltsToDisconnect.map((id) => ({ id }));

      return ctx.db.assignment.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          assignmentCode: input.assignmentCode,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          live: input.live,
          slts: { connect, disconnect },
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        assignmentId: z.string().min(1, "Assignment ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.delete({
        where: {
          id: input.assignmentId,
        },
      });
    }),
});
