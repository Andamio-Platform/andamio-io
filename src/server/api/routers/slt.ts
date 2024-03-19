import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sltRouter = createTRPCRouter({

  // get a specific SLT -> todo: in useSLT() hook

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
            course: {
              courseCode: input.courseCode,
            },
          },
        },
      });
    }),

  // get all SLTs for a Module

  getModuleSLTs: publicProcedure
    .input(z.object({ courseCode: z.string(), moduleCode: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.slt.findMany({
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

  // create new SLT

  create: protectedProcedure
    .input(
      z.object({
        moduleId: z.string().min(1),
        moduleIndex: z.number().min(1),
        sltText: z.string().min(1),
        // todo: understand where this id comes from
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.slt.create({
        data: {
          moduleIndex: input.moduleIndex,
          sltText: input.sltText,
          createdBy: { connect: { id: ctx.session.user.id } },
          module: {
            connect: {
              id: input.moduleId,
            },
          },
        },
      });
    }),

  // update SLT

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
      return ctx.db.slt.update({
        where: {
          id: input.id,
        },
        data: {
          id: input.id,
          moduleIndex: input.moduleIndex,
          sltText: input.sltText,
          createdBy: { connect: { id: ctx.session.user.id } },
          module: {
            connect: {
              id: input.moduleId,
            },
          },
        },
      });
    }),

  // delete SLT

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


// Todo: feature implement updateMany - for re-ordering

// Todo: feature: implement change SLT from one Module to another

// Todo: when integrating shadcn, implement Lesson status icon
