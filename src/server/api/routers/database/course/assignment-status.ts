import { AssignmentStatus } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const assignmentStatusRouter = createTRPCRouter({
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

  setAssignmentStatus: protectedProcedure
    .input(
      z.object({
        assignmentId: z.string().min(1),
        learnerNotes: z.string().optional(),
        status: z.nativeEnum(AssignmentStatus),
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
          learnerNotes: input.learnerNotes,
          status: input.status,
        },
      });
    }),

  updateLearnerNotes: protectedProcedure
    .input(
      z.object({
        assignmentCommitmentId: z.string().min(1),
        learnerNotes: z.string().min(1),
        status: z.nativeEnum(AssignmentStatus),
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
          learnerNotes: input.learnerNotes,
          status: input.status,
        },
      });
    }),

  setFavorite: protectedProcedure
    .input(
      z.object({
        assignmentCommitmentId: z.string().min(1),
        favorite: z.boolean(),
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
          favorite: input.favorite,
        },
      });
    }),

    setArchived: protectedProcedure
    .input(
      z.object({
        assignmentCommitmentId: z.string().min(1),
        archived: z.boolean(),
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
          archived: input.archived,
        },
      });
    }),
});
