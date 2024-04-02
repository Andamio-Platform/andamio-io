import { RouterOutputs } from "~/utils/api";

export type Course = RouterOutputs["course"]["getCourse"];
export type Module = RouterOutputs["module"]["getCourseModules"][number];
export type ModuleTest = RouterOutputs["module"]["getModule"];
export type User = RouterOutputs["user"]["getUserByName"][number];
export type Creator = RouterOutputs["creator"]["getCreatorByUser"];
export type Learner = RouterOutputs["learner"]["getLearnerByUser"];
export type CourseVariant =
  RouterOutputs["courseVariant"]["getCourseVariants"][number];
export type ModuleVariant =
  RouterOutputs["moduleVariant"]["getCourseModuleVariants"][number];
export type CourseOnChainInstance =
  RouterOutputs["courseOnChainInstance"]["getCourseOnchainInstances"];
export type ModuleSLT = RouterOutputs["slt"]["getModuleSLTs"][number];
export type Lesson = RouterOutputs["lesson"]["getModuleLessons"][number];
export type Assignment =
  RouterOutputs["assignment"]["getModuleAssignments"][number];
export type Introduction = RouterOutputs["introduction"]["getIntroduction"];
