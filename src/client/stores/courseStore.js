import { create } from 'zustand'
export const useCourseStore = create((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  addCourse: (newCourse) =>
    set((state) => ({ courses: [...state.courses, newCourse] })),
  updateCourse: (updatedCourse) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      ),
    })),
  deleteCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    })),
}))
