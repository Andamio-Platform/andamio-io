import { RouterOutputs } from "~/utils/api";

export type Course = RouterOutputs["course"]["getCoursesByOwner"][number];
export type Module = RouterOutputs["module"]["getCourseModules"][number];
export type Content = RouterOutputs["content"]["getModuleContents"][number];
export type User = RouterOutputs["user"]["getUserByName"][number];
export type CourseVariant =
  RouterOutputs["courseVariant"]["getCourseVariants"][number];
export type ModuleVariant =
  RouterOutputs["moduleVariant"]["getmoduleVariants"][number];
