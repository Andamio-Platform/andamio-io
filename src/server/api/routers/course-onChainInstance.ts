import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseOnChainInstanceRouter = createTRPCRouter({
  getCourseOnchainInstances: publicProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.findMany({
        where: {
          courseId: input.courseId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
        onchainInstanceId: z.string().min(1),
        courseRefAddress: z.string().optional(),
        assignmentAddress: z.string().optional(),
        creatorCS: z.string().optional(),
        facilitatorCS: z.string().optional(),
        learnerCS: z.string().optional(),
        courseRefUTxO: z.string().optional(),
        assignmentRefUTxO: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.create({
        data: {
          onchainInstanceId: input.onchainInstanceId,
          courseRefAddress: input.courseRefAddress,
          assignmentAddress: input.assignmentAddress,
          creatorCS: input.creatorCS,
          facilitatorCS: input.facilitatorCS,
          learnerCS: input.learnerCS,
          courseRefUTxO: input.courseRefUTxO,
          assignmentRefUTxO: input.assignmentRefUTxO,
          withCourse: {
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
        onchainInstanceId: z.string().min(1),
        courseRefAddress: z.string().optional(),
        assignmentAddress: z.string().optional(),
        creatorCS: z.string().optional(),
        facilitatorCS: z.string().optional(),
        learnerCS: z.string().optional(),
        courseRefUTxO: z.string().optional(),
        assignmentRefUTxO: z.string().optional(),
      })
    )
    .mutation(async ({ctx, input}) => {
      return ctx.db.courseOnChainInstance.update({
        where: {
          onchainInstanceId: input.onchainInstanceId
        },
        data: {
          courseRefAddress: input.courseRefAddress,
          assignmentAddress: input.assignmentAddress,
          creatorCS: input.creatorCS,
          facilitatorCS: input.facilitatorCS,
          learnerCS: input.learnerCS,
          courseRefUTxO: input.courseRefUTxO,
          assignmentRefUTxO: input.assignmentRefUTxO,
        }
      })
    })
});
