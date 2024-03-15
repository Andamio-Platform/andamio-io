import { CourseVariant } from "@prisma/client";
import { create } from "zustand";

interface CourseState {
  courseVariant: CourseVariant | undefined;
  setCourseVariant: (variant: CourseVariant | undefined) => void;
}

export const useCourseStore = create<CourseState>()((set, get) => ({
  courseVariant: undefined,
  setCourseVariant: (variant) => set({ courseVariant: variant }),
}));
