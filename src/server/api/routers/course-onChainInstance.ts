import { Network } from "@prisma/client";
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
        network: z.nativeEnum(Network),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.findFirst({
        where: {
          courseId: input.courseId,
          network: input.network,
        },
        include: {
          course: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
        network: z.nativeEnum(Network),
        courseRefAddress: z.string().optional(),
        assignmentAddress: z.string().optional(),
        creatorCS: z.string().optional(),
        facilitatorCS: z.string().optional(),
        learnerCS: z.string().optional(),
        moduleCS: z.string().optional(),
        courseRefUTxO: z.string().optional(),
        assignmentRefUTxO: z.string().optional(),
        moduleMintingRefUTxO: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.create({
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
          LocalStateValidatorAddress: "", // Add the missing property
          CourseCreatorNFTPolicyID: "", // Add the missing property
          LocalStatePolicyID: "", // Add the missing property
          CourseInstanceUTxO: "", // Add the missing property
          LocalStatePolicyRefUTxO: "", // Add the missing property
          course: {
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
        id: z.string().min(1),
        courseId: z.string().min(1),
        network: z.nativeEnum(Network),
        courseRefAddress: z.string().optional(),
        assignmentAddress: z.string().optional(),
        creatorCS: z.string().optional(),
        facilitatorCS: z.string().optional(),
        learnerCS: z.string().optional(),
        moduleCS: z.string().optional(),
        courseRefUTxO: z.string().optional(),
        assignmentRefUTxO: z.string().optional(),
        moduleMintingRefUTxO: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.update({
        where: {
          id: input.id,
        },
        data: {
          course: { connect: { id: input.courseId } },
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
        },
      });
    }),
});
