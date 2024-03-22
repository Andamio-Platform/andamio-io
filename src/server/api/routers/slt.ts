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
            course: {
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

// Todo: feature implement updateMany - for re-ordering

// Todo: feature: implement change SLT from one Module to another

// Todo: when integrating shadcn, implement Lesson status icon
