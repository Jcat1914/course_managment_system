import { create } from 'zustand'

export const useProgramStore = create((set) => ({
  programs: [],
  setPrograms: (programs) => set({ programs }),
  addProgram: (newProgram) =>
    set((state) => ({ programs: [...state.programs, newProgram] })),
  updateProgram: (updatedProgram) =>
    set((state) => ({
      programs: state.programs.map((program) =>
        program.id === updatedProgram.id ? updatedProgram : program
      ),
    })),

  updateProgramCourse: (programId, updatedCourse) =>
    set((state) => ({
      programs: state.programs.map((program) =>
        program.id === programId
          ? {
            ...program,
            courses: program.courses.map((course) =>
              course.id === updatedCourse.id ? updatedCourse : course
            ),
          }
          : program
      ),
    })),

  deleteProgramCourse: (programId, courseId) =>
    set((state) => ({
      programs: state.programs.map((program) =>
        program.id === programId
          ? {
            ...program,
            courses: program.courses.filter((course) => course.id !== courseId),
          }
          : program
      ),
    })),

  deleteProgram: (id) =>
    set((state) => ({
      programs: state.programs.filter((program) => program.id !== id),
    })),
}))
