import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sltRouter = createTRPCRouter({
  getSLT: publicProcedure
    .input(
      z.object({
        courseCode: z.string(),
        moduleCode: z.string(),
        moduleIndex: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.slt.findFirst({
        where: {
          moduleIndex: input.moduleIndex,
          module: {
            moduleCode: input.moduleCode,
            originalCourse: {
              courseCode: input.courseCode,
            },
          },
        },
      });
    }),

  getModuleSLTs: publicProcedure
    .input(z.object({ courseCode: z.string(), moduleCode: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.slt.findMany({
        where: {
          module: {
            moduleCode: input.moduleCode,
            originalCourse: {
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
        moduleIndex: z.number().min(1),
        sltText: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.creatorId) {
        throw new Error('User does not have Creator role.');
      }

      return ctx.db.slt.create({
        data: {
          moduleIndex: input.moduleIndex,
          sltText: input.sltText,
          createdBy: { connect: { id: ctx.session.user.creatorId } },
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
        moduleId: z.string().min(1),
        id: z.string().min(1),
        moduleIndex: z.number().min(1),
        sltText: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // todo: should we protect this endpoint for Creators only?
      // benefits: security
      // drawbacks: slower query
      // :: learn more about context or session
      // this question generalizes across the application
      return ctx.db.slt.update({
        where: {
          id: input.id,
        },
        data: {
          id: input.id,
          moduleIndex: input.moduleIndex,
          sltText: input.sltText,
          module: {
            connect: {
              id: input.moduleId,
            },
          },
        },
      });
    }),

  updateModuleIndex: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        moduleIndex: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.slt.update({
        where: {
          id: input.id,
        },
        data: {
          id: input.id,
          moduleIndex: input.moduleIndex,
        },
      });
    }),

  updateModuleIndexes: protectedProcedure
    .input(
      z.array(
        z.object({
          id: z.string().min(1),
          moduleIndex: z.number().min(1),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const updates = input.map(async ({ id, moduleIndex }) => {
        return ctx.db.slt.update({
          where: { id },
          data: { moduleIndex },
        });
      });
      return Promise.all(updates);
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "Missing SLT ID"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.slt.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
