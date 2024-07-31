import { type CourseVariant } from "@prisma/client";
import { type JSONContent } from "novel";
import { create } from "zustand";

interface CourseState {
  courseVariant: CourseVariant | undefined;
  setCourseVariant: (variant: CourseVariant | undefined) => void;
  updateLessonEdit: undefined | JSONContent[];
  setUpdateLessonEdit: (update: any[]) => void;
}

export const useCourseStore = create<CourseState>()((set) => ({
  courseVariant: undefined,
  setCourseVariant: (variant) => set({ courseVariant: variant }),
  updateLessonEdit: undefined,
  setUpdateLessonEdit: (update) => set({ updateLessonEdit: update }),
}));
