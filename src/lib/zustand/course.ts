import { create } from "zustand";

interface CourseState {
  courseVariant: string | undefined;
  setCourseVariant: (variant: string | undefined) => void;
}

export const useCourseStore = create<CourseState>()((set, get) => ({
  courseVariant: 'JP', // todo
  setCourseVariant: (variant) => set({ courseVariant: variant }),
}));
