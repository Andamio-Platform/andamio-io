import { createTRPCRouter } from "~/server/api/trpc";
import { courseRouter } from "./routers/course";
import { moduleRouter } from "./routers/module";
import { userRouter } from "./routers/user";
import { courseVariantRouter } from "./routers/course-variant";
import { moduleVariantRouter } from "./routers/module-variant";
import { courseOnChainInstanceRouter } from "./routers/course-onChainInstance";
import { sltRouter } from "./routers/slt";
import { lessonRouter } from "./routers/lesson";
import { assignmentRouter } from "./routers/assignment";
import { creatorRouter } from "./routers/creator";
import { learnerRouter } from "./routers/learner";
import { introductionRouter } from "./routers/introduction";
import { clientDomainsRouter } from "./routers/clients-domain";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  creator: creatorRouter,
  learner: learnerRouter,

  course: courseRouter,
  module: moduleRouter,
  courseVariant: courseVariantRouter,
  moduleVariant: moduleVariantRouter,
  courseOnChainInstance: courseOnChainInstanceRouter,
  slt: sltRouter,
  lesson: lessonRouter,
  assignment: assignmentRouter,
  introduction: introductionRouter,

  clientDomains: clientDomainsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
