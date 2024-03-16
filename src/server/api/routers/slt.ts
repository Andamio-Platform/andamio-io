import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const sltRouter = createTRPCRouter({
  getContent: publicProcedure
    .input(
      z.object({
        courseCode: z.string(),
        moduleCode: z.string(),
        moduleId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.sLT.findFirst({
        where: {
          moduleId: input.moduleId,
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
      return ctx.db.sLT.findMany({
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
        sltId: z.string().min(1),
        title: z.string().min(1),
        sltText: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sLT.create({
        data: {
          sltId: input.sltId,
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
        sltId: z.string().min(1),
        title: z.string().min(1),
        sltText: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sLT.update({
        where: {
          id: input.sltId,
        },
        data: {
          sltId: input.sltId,
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


    // Todo
    // 2024-03-15 pick up here...
  // createMany: protectedProcedure
  //   .input(
  //     z.object({}).array()
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.content.createMany({}[])
  //   )

  //   })

  delete: protectedProcedure
    .input(
      z.object({
        contentId: z.string().min(1, "Content ID is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.module.delete({
        where: {
          id: input.contentId,
        },
      });
    }),
});
