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
        network: z.string().min(1),
        courseRefAddress: z.string().optional(),
        assignmentAddress: z.string().optional(),
        creatorCS: z.string().optional(),
        facilitatorCS: z.string().optional(),
        learnerCS: z.string().optional(),
        moduleCS: z.string().optional(),
        courseRefUTxO: z.string().optional(),
        assignmentRefUTxO: z.string().optional(),
        moduleMintingRefUTxO: z.string().optional()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.create({
        data: {
          onchainInstanceId: input.onchainInstanceId,
          network: input.network,
          courseRefAddress: input.courseRefAddress,
          assignmentAddress: input.assignmentAddress,
          creatorCS: input.creatorCS,
          facilitatorCS: input.facilitatorCS,
          learnerCS: input.learnerCS,
          moduleCS: input.moduleCS,
          courseRefUTxO: input.courseRefUTxO,
          assignmentRefUTxO: input.assignmentRefUTxO,
          moduleMintingRefUTxO: input.moduleMintingRefUTxO,
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
        network: z.string().min(1),
        courseRefAddress: z.string().optional(),
        assignmentAddress: z.string().optional(),
        creatorCS: z.string().optional(),
        facilitatorCS: z.string().optional(),
        learnerCS: z.string().optional(),
        moduleCS: z.string().optional(),
        courseRefUTxO: z.string().optional(),
        assignmentRefUTxO: z.string().optional(),
        moduleMintingRefUTxO: z.string().optional()
      })
      )
    .mutation(async ({ctx, input}) => {
      return ctx.db.courseOnChainInstance.update({
        where: {
          onchainInstanceId: input.onchainInstanceId
        },
        data: {
          network: input.network,
          courseRefAddress: input.courseRefAddress,
          assignmentAddress: input.assignmentAddress,
          creatorCS: input.creatorCS,
          facilitatorCS: input.facilitatorCS,
          learnerCS: input.learnerCS,
          moduleCS: input.moduleCS,
          courseRefUTxO: input.courseRefUTxO,
          assignmentRefUTxO: input.assignmentRefUTxO,
          moduleMintingRefUTxO: input.moduleMintingRefUTxO,
        }
      })
    })
});
