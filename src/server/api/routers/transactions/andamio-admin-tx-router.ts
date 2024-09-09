// start here!
import { z } from "zod";
import { indexerGetWithParams } from "~/lib/axios/indexer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type InitCourseStepOneParams = {
  aliases: string;
};

type InitCourseStepTwoAndThreeParams = {
  policy: string;
};

type AddRemoveCourseCreatorParams = {
  aliases: string;
  policy: string;
};

export const andamioAdminTxRouter = createTRPCRouter({
  initCourseStepOne: publicProcedure
    .input(
      z.object({
        aliases: z.array(z.string().min(1)),
      }),
    )
    .query(async ({ input }) => {
      const stepOneParams: InitCourseStepOneParams = {
        aliases: JSON.stringify(input.aliases),
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        InitCourseStepOneParams
      >(`txs/instance-admin-actions/init-course-step-1`, stepOneParams);

      https: if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not complete step 1");
    }),

  initCourseStepTwo: publicProcedure
    .input(
      z.object({
        policy: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const stepTwoParams: InitCourseStepTwoAndThreeParams = {
        policy: input.policy,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        InitCourseStepTwoAndThreeParams
      >(`txs/txs/instance-admin-actions/init-course-step-2`, stepTwoParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not complete step 2");
    }),

  initCourseStepThree: publicProcedure
    .input(
      z.object({
        policy: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const stepThreeParams: InitCourseStepTwoAndThreeParams = {
        policy: input.policy,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        InitCourseStepTwoAndThreeParams
      >(`txs/txs/instance-admin-actions/init-course-step-3`, stepThreeParams);

      if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not complete step 3");
    }),

  addCourseCreators: publicProcedure
    .input(
      z.object({
        aliases: z.array(z.string().min(1)),
        policy: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const creatorParams: AddRemoveCourseCreatorParams = {
        aliases: JSON.stringify(input.aliases),
        policy: input.policy,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AddRemoveCourseCreatorParams
      >(`txs/instance-admin-actions/add-course-creators`, creatorParams);

      https: if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not add course creators");
    }),

  removeCourseCreators: publicProcedure
    .input(
      z.object({
        aliases: z.array(z.string().min(1)),
        policy: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const creatorParams: AddRemoveCourseCreatorParams = {
        aliases: JSON.stringify(input.aliases),
        policy: input.policy,
      };
      const unsignedTxCBOR = await indexerGetWithParams<
        { unsignedTxCBOR: string },
        AddRemoveCourseCreatorParams
      >(`txs/instance-admin-actions/remove-course-creators`, creatorParams);

      https: if (unsignedTxCBOR) return unsignedTxCBOR;
      else throw new Error("Could not remove course creators");
    }),
});
