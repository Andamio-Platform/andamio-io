import { Network } from "@prisma/client";
import { get } from "http";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const courseOnChainInstanceRouter = createTRPCRouter({
  getAllCoursesOnchain: publicProcedure.query(({ ctx }) => {
    return ctx.db.courseOnChainInstance.findMany();
  }),

  getCourseOnchainInstances: publicProcedure
    .input(
      z.object({
        courseCode: z.string().min(1),
        network: z.nativeEnum(Network),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.findFirst({
        where: {
          courseCode: input.courseCode,
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
        courseCode: z.string().min(1),
        network: z.nativeEnum(Network),
        LocalStateValidatorAddress: z.string().optional(),
        CourseCreatorNFTPolicyID: z.string().optional(),
        LocalStatePolicyID: z.string().optional(),
        CourseInstanceUTxO: z.string().optional(),
        LocalStatePolicyRefUTxO: z.string().optional(),
        AssignmentValidatorAddress: z.string().optional(),
        ModuleValidatorAddress: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.create({
        data: {
          network: input.network,
          LocalStateValidatorAddress: input.LocalStateValidatorAddress ?? "",
          CourseCreatorNFTPolicyID: input.CourseCreatorNFTPolicyID ?? "",
          LocalStatePolicyID: input.LocalStatePolicyID ?? "",
          CourseInstanceUTxO: input.CourseInstanceUTxO ?? "",
          LocalStatePolicyRefUTxO: input.LocalStatePolicyRefUTxO ?? "",
          AssignmentValidatorAddress: input.AssignmentValidatorAddress ?? "",
          ModuleValidatorAddress: input.ModuleValidatorAddress ?? "",
          course: {
            connect: {
              courseCode: input.courseCode,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        courseCode: z.string().min(1),
        network: z.nativeEnum(Network),
        LocalStateValidatorAddress: z.string().optional(),
        CourseCreatorNFTPolicyID: z.string().optional(),
        LocalStatePolicyID: z.string().optional(),
        CourseInstanceUTxO: z.string().optional(),
        LocalStatePolicyRefUTxO: z.string().optional(),
        AssignmentValidatorAddress: z.string().optional(),
        ModuleValidatorAddress: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.courseOnChainInstance.update({
        where: {
          id: input.id,
        },
        data: {
          course: { connect: { id: input.courseCode } },
          network: input.network,
          LocalStateValidatorAddress: input.LocalStateValidatorAddress ?? "",
          CourseCreatorNFTPolicyID: input.CourseCreatorNFTPolicyID ?? "",
          LocalStatePolicyID: input.LocalStatePolicyID ?? "",
          CourseInstanceUTxO: input.CourseInstanceUTxO ?? "",
          LocalStatePolicyRefUTxO: input.LocalStatePolicyRefUTxO ?? "",
          AssignmentValidatorAddress: input.AssignmentValidatorAddress ?? "",
          ModuleValidatorAddress: input.ModuleValidatorAddress ?? "",
        },
      });
    }),
});
