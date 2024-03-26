import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// Get one Assignment
export const assignmentRouter = createTRPCRouter({
  getAssignment: publicProcedure
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
            course: {
              courseCode: input.courseCode,
            },
          },
        },
        include: {
          slts: true
        }
      });
    }),

  // Get all Assignments
  // getAssignment and getModuleAssignments might be redundant for now - don't delete yet
  // Think about how Assigments might not need "Variants"?
  getModuleAssignments: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        moduleId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.assignment.findMany({
        where: {
          module: {
            id: input.moduleId,
            course: {
              id: input.courseId,
            },
          },
        },
        include: {
          slts: true
        }
      });
    }),


    // TEST ME!!!

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
      const newAssignment = await ctx.db.assignment.create({
        data: {
          assignmentCode: input.assignmentCode,
          title: input.title,
          module: { connect: { id: input.moduleId }},
          createdBy: { connect: { id: ctx.session.user.id }},
          slts: { connect: input.sltIds.map(id => ({ id })) }
        },
      })

      // Connect the Lesson to the Modules
      await Promise.all(input.sltIds.map(async (slt: string) => {
        await ctx.db.slt.update({
          where: { id: slt },
          data: {
            assignmentId: newAssignment.id,
            assignment: {
              connect: { id: newAssignment.id },
            },
          },
        });
      }));

      return newAssignment
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        videoUrl: z.string().optional(),
        contentJson: z.any().optional(),
        live: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.assignment.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          videoUrl: input.videoUrl,
          contentJson: input.contentJson,
          live: input.live,
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
