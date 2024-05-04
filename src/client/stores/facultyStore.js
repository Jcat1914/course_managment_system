import { create } from 'zustand'

export const useFacultyStore = create((set) => ({
  professors: [],
  setProfessors: (professors) => set({ professors }),
  addProfessor: (newProfessor) =>
    set((state) => ({ professors: [...state.professors, newProfessor] })),
  updateProfessor: (updatedProfessor) =>
    set((state) => ({
      professors: state.professors.map((professor) =>
        professor.id === updatedProfessor.id
          ? updatedProfessor
          : professor
      ),
    })),
  deleteProfessor: (id) =>
    set((state) => ({
      professors: state.professors.filter(
        (professor) => professor.id !== id
      ),
    })),
}))

export const useSelectedProfessorStore = create((set) => ({
  selectedProfessor: null,
  setSelectedProfessor: (professor) => set({ selectedProfessor: professor }),
  clearSelectedProfessor: () => set({ selectedProfessor: null }),
}))

export const useSelectedAvailabilityProfessorStore = create((set) => ({
  selectedAvailabilityProfessor: null,
  addSelectedAvailabilityProfessor: (newAvailability) =>
    set((state) => ({
      selectedAvailabilityProfessor: [
        ...state.selectedAvailabilityProfessor,
        newAvailability,
      ],
    })),
  updateSelectedAvailabilityProfessor: (updatedAvailability) =>
    set((state) => ({
      selectedAvailabilityProfessor:
        state.selectedAvailabilityProfessor.map((availability) =>
          availability.id === updatedAvailability.id
            ? updatedAvailability
            : availability
        ),
    })),
  deleteSelectedAvailabilityProfessor: (id) =>
    set((state) => ({
      selectedAvailabilityProfessor:
        state.selectedAvailabilityProfessor.filter(
          (availability) => availability.id !== id
        ),
    })),
  setSelectedAvailabilityProfessor: (professor) =>
    set({ selectedAvailabilityProfessor: professor }),
  clearSelectedAvailabilityProfessor: () =>
    set({ selectedAvailabilityProfessor: null }),
}))

export const useSelectedUniqueAvailabilityProfessorStore = create((set) => ({
  selectedUniqueAvailabilityProfessor: null,
  setSelectedUniqueAvailabilityProfessor: (professor) =>
    set({ selectedUniqueAvailabilityProfessor: professor }),
  clearSelectedUniqueAvailabilityProfessor: () =>
    set({ selectedUniqueAvailabilityProfessor: null }),
}))

// TODOS LOS CURSOS DEL PROFESOR
export const useSelectedCoursesProfessorStore = create((set) => ({
  selectedCoursesProfessor: [],
  setSelectedCoursesProfessor: (professor) =>
    set({ selectedCoursesProfessor: professor }),
  addSelectedCoursesProfessor: (newCourse) =>
    set((state) => ({
      selectedCoursesProfessor: [
        ...state.selectedCoursesProfessor,
        newCourse,
      ],
    })),
  deleteSelectedCoursesProfessor: (id) =>
    set((state) => ({
      selectedCoursesProfessor: state.selectedCoursesProfessor.filter(
        (course) => course.id != id
      ),
    })),
  clearSelectedCoursesProfessor: () =>
    set({ selectedCoursesProfessor: null }),
}))
