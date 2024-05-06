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
  deleteProgram: (id) =>
    set((state) => ({
      programs: state.programs.filter((program) => program.id !== id),
    })),
}))



