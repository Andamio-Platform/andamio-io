import { AssignmentStatus } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const assignmentCommitmentRouter = createTRPCRouter({
  getLearnerCommitments: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.learnerId) {
      throw new Error("User does not have Learner role.");
    }

    return await ctx.db.assignmentCommitment.findMany({
      where: {
        learnerId: ctx.session.user.learnerId,
      },
      include: {
        assignment: {
          include: {
            module: true,
          },
        },
        learner: true,
      },
    });
  }),

  getAssignmentCommitments: protectedProcedure
    .input(
      z.object({
        assignmentId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.assignmentCommitment.findMany({
        where: {
          assignmentId: input.assignmentId,
        },
        include: {
          assignment: {
            include: {
              module: true,
            },
          },
          learner: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        assignmentId: z.string().min(1),
        evidenceString: z.string().optional()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.learnerId) {
        throw new Error("User does not have Learner role.");
      }

      return ctx.db.assignmentCommitment.create({
        data: {
          assignment: { connect: { id: input.assignmentId } },
          learner: { connect: { id: ctx.session.user.learnerId } },
          evidenceString: input.evidenceString
        },
      });
    }),

  addEvidence: protectedProcedure
    .input(
      z.object({
        assignmentCommitmentId: z.string().min(1),
        evidenceString: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.learnerId) {
        throw new Error("User does not have Learner role.");
      }

      const commitment = await ctx.db.assignmentCommitment.findUnique({
        where: { id: input.assignmentCommitmentId },
        include: {
          learner: true,
        },
      });

      const isLearner = commitment?.learnerId === ctx.session.user.learnerId;

      if (!isLearner) {
        throw new Error("Commitment does not belong to connected Learner.");
      }

      return ctx.db.assignmentCommitment.update({
        where: {
          id: input.assignmentCommitmentId,
        },
        data: {
          evidenceString: input.evidenceString,
        },
      });
    }),

  review: protectedProcedure
    .input(
      z.object({
        assignmentCommitmentId: z.string().min(1),
        status: z.nativeEnum(AssignmentStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.creatorId) {
        throw new Error("User not authorized to review this assignment.");
      }

      const commitment = await ctx.db.assignmentCommitment.findUnique({
        where: { id: input.assignmentCommitmentId },
        include: {
          assignment: {
            include: {
              module: {
                include: {
                  originalCourse: {
                    include: {
                      contributors: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!commitment) {
        throw new Error("Assignment commitment not found.");
      }

      const isReviewer =
        commitment.assignment.module.originalCourse.contributors.some(
          (c) => c.id === ctx.session.user.creatorId,
        );

      if (!isReviewer) {
        throw new Error("User is not authorized to review this assignment");
      }

      return ctx.db.assignmentCommitment.update({
        where: {
          id: input.assignmentCommitmentId,
        },
        data: {
          status: input.status,
        },
      });
    }),
});
