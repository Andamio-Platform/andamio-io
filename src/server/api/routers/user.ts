import { User } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserByName: publicProcedure
    .input(z.object({ search: z.string().min(3) }))
    .query(({ ctx, input }) => {
      const users = ctx.db.user.findMany({
        where: {
          name: {
            contains: input.search,
          },
        },
      });

      if (users === undefined) {
        return [];
      } else {
        return users as Promise<User[]>;
      }
    }),
});
