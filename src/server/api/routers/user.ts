import { User } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserByName: publicProcedure
    .input(z.object({ username: z.string().min(3) }))
    .query(({ ctx, input }) => {
      const users = ctx.db.user.findMany({
        where: {
          name: {
            contains: input.username,
          },
        },
        include: {
          creator: {
            select: {
              id: true,
              userId: true,
              courses: true
            }
          },
          learner: true,
        },
      });

      if (users === undefined) {
        return [];
      } else {
        return users as Promise<User[]>;
      }
    }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          creator: true,
          learner: true,
          accessToken: true,
        },
      });

      if (user === null) {
        throw new Error("User not found");
      } else {
        return user;
      }
    }),

    updateAccessToken: protectedProcedure
    .input(
      z.object({
        alias: z.string().min(1),
        mintTxId: z.string().min(1),
        confirmed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.upsert({
        where: {
          id: ctx.session.user.id,
        },
        create: {
          accessToken: {
            create: {
              alias: input.alias,
              mintTxId: input.mintTxId,
              confirmed: input.confirmed,
            },
          },
        },
        update: {
          accessToken: {
            create: {
              alias: input.alias,
              mintTxId: input.mintTxId,
              confirmed: input.confirmed,
            },
          },
        },
      });
    }),
});
