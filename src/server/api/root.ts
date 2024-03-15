import { createTRPCRouter } from "~/server/api/trpc";
import { courseRouter } from "./routers/course";
import { moduleRouter } from "./routers/module";
import { contentRouter } from "./routers/content";
import { userRouter } from "./routers/user";
import { courseVariantRouter } from "./routers/course-variant";
import { moduleVariantRouter } from "./routers/module-variant";
import { contentVariantRouter } from "./routers/content-variant";
import { courseOnChainInstanceRouter } from "./routers/course-onChainInstance";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,

  course: courseRouter,
  module: moduleRouter,
  content: contentRouter,
  courseVariant: courseVariantRouter,
  moduleVariant: moduleVariantRouter,
  contentVariant: contentVariantRouter,
  courseOnChainInstance: courseOnChainInstanceRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
