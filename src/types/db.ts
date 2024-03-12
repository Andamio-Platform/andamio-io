import { RouterOutputs } from "~/utils/api";

// Todo
// Compare Course with [number]
// to CourseOnChainInstance, which doesn't have it
// Add [number] and see how TS complains

// Try refactoring to upsert

export type Course = RouterOutputs["course"]["getCoursesByOwner"][number];
export type Module = RouterOutputs["module"]["getCourseModules"][number];
export type Content = RouterOutputs["content"]["getModuleContents"][number];
export type User = RouterOutputs["user"]["getUserByName"][number];
export type CourseVariant =
  RouterOutputs["courseVariant"]["getCourseVariants"][number];
export type ModuleVariant =
  RouterOutputs["moduleVariant"]["getmoduleVariants"][number];
export type CourseOnChainInstance = RouterOutputs["courseOnChainInstance"]["getCourseOnchainInstances"]
