import { CourseVariant } from "@prisma/client";
import { create } from "zustand";

interface CourseState {
  courseVariant: CourseVariant | undefined;
  setCourseVariant: (variant: CourseVariant | undefined) => void;
  updateLessonEdit: undefined | string;
  setUpdateLessonEdit: (update: string) => void;
}

export const useCourseStore = create<CourseState>()((set, get) => ({
  courseVariant: undefined,
  setCourseVariant: (variant) => set({ courseVariant: variant }),
  updateLessonEdit: undefined,
  setUpdateLessonEdit: (update) => set({ updateLessonEdit: update }),
}));
