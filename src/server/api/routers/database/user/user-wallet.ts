import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userWalletRouter = createTRPCRouter({
  getWallet: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.userWallet.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  getUserWallet: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.userWallet.findUnique({
        where: {
          userId: input.userId,
        },
      });
    }),

  updateWalletAddresses: protectedProcedure
    .input(
      z.object({
        walletAddress: z.string().min(1),
        stakeAddress: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.userWallet.upsert({
        where: {
          userId: ctx.session.user.id,
        },
        create: {
          walletAddress: input.walletAddress,
          stakeAddress: input.stakeAddress,
          user: { connect: { id: ctx.session.user.id } },
        },
        update: {
          walletAddress: input.walletAddress,
          stakeAddress: input.stakeAddress,
        },
      });
    }),
});
