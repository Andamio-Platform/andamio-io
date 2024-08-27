import { z } from "zod";
import {
  type DecodedAssignmentDecisionDatum,
  type DecodedModuleRefDatum,
} from "@andamiojs/datum-utils";
import { indexerGet } from "~/lib/axios/indexer";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type Course, type CourseModuleOverview } from "~/types/db";

export const assignmentValidatorRouter = createTRPCRouter({
  isCourseModuleOnchain: publicProcedure
    .input(
      z.object({
        courseCreatorNFTPolicyID: z.string().length(56),
        moduleCode: z.string().min(3),
      }),
    )
    .query(async ({ input }) => {
      type OnchainCourseModule = {
        module_token: string;
        decoded_datum: DecodedModuleRefDatum;
      };

      const onchainCourseModules = await indexerGet<OnchainCourseModule[]>(
        `module-ref/decodedModuleRefDatumsByCourseNftPolicy?policy=${input.courseCreatorNFTPolicyID}`,
      );
      if (
        onchainCourseModules.some((m) => m.module_token === input.moduleCode)
      ) {
        return true;
      } else {
        return false;
      }
    }),

  isLearnerCommittedToAssignment: protectedProcedure
    .input(
      z.object({
        courseCreatorNFTPolicyID: z.string().length(56),
        assignmentCode: z.string().min(3),
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const assignment = await indexerGet<DecodedAssignmentDecisionDatum>(
        `assignment-validator/decodedAssignmentValidatorUtxoByCourseNftPolicyAndAlias?policy=${input.courseCreatorNFTPolicyID}&alias=${input.alias}`,
      );
      if (assignment.CommittedAssignmentId === input.assignmentCode) {
        return true;
      } else {
        return false;
      }
    }),

  getDecodedCourseAssignmentDatums: protectedProcedure
    .input(
      z.object({
        courseNftPolicy: z.string().length(56),
      }),
    )
    .query(async ({ input }) => {
      const assignments = await indexerGet<DecodedAssignmentDecisionDatum[]>(
        `assignment-validator/decodedAssignmentDatumsByCourseNftPolicy?policy=${input.courseNftPolicy}`,
      );
      return assignments;
    }),

  getDecodedCourseAssignmentDatumsByAlias: protectedProcedure
    .input(
      z.object({
        courseCreatorNFTPolicyID: z.string().length(56),
        alias: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const assignments = await indexerGet<DecodedAssignmentDecisionDatum>(
        `assignment-validator/decodedAssignmentValidatorUtxoByCourseNftPolicyAndAlias?policy=${input.courseCreatorNFTPolicyID}&alias=${input.alias}`,
      );
      return assignments;
    }),

  getCourseAssignmentStats: protectedProcedure
    .input(
      z.object({
        courseCode: z.string().min(1),
        courseCreatorNFTPolicyID: z.string().length(56),
      }),
    )
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.course.findFirst({
        where: {
          courseCode: input.courseCode,
        },
        include: {
          modules: {
            include: {
              assignments: true,
            },
          },
        },
      });

      if (!res) {
        throw new Error("Course not found");
      }

      // TODO: Pick up here 2024-08-28

      const assignmentModules = res.modules.filter(
        (cM) => cM.assignments.length > 0,
      );

      return assignmentModules.length;
      //   (cm: CourseModuleOverview) => cm.assignments && cm.assignments.length > 0,
      // );
      //
      // return modulesWithAssignments.length;
    }),
});
