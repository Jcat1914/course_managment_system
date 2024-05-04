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

export const useSelectedProgramStore = create((set) => ({
  selectedProgram: null,
  setSelectedProgram: (program) => set({ selectedProgram: program }),
  addSelectedProgram: (newProgram) =>
    set((state) => ({
      selectedProgram: [...state.selectedProgram, newProgram],
    })),
  updateSelectedProgram: (updatedProgram) =>
    set((state) => ({
      selectedProgram: state.selectedProgram.map((program) =>
        program.id === updatedProgram.id ? updatedProgram : program
      ),
    })),

  clearSelectedProgram: () => set({ selectedProgram: null }),
}))

// PARA MUCHOS CURSOS
export const useSelectedCoursesStore = create((set) => ({
  selectedCourses: [],
  setSelectedCourses: (courses) => set({ selectedCourses: courses }),
  addSelectedCourses: (newCourse) =>
    set((state) => ({
      selectedCourses: [...state.selectedCourses, newCourse],
    })),
  updateSelectedCourses: (updatedCourses) =>
    set((state) => ({
      selectedCourses: state.selectedCourses.map((course) =>
        course.id === updatedCourses.id ? updatedCourses : course
      ),
    })),
}))

// SOLO PARA EL CURSO SELECCIONADO
export const useSelectedCourseStore = create((set) => ({
  selectedCourse: [],
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  clearSelectedCourse: () => set({ selectedCourse: null }),
}))

// PREREQUISITES

export const useSelectedPrerequisiteStore = create((set) => ({
  selectedPrerequisite: [],
  setSelectedPrerequisite: (prerequisite) =>
    set({ selectedPrerequisite: prerequisite }),
  addSelectedPrerequisite: (newPrerequisite) =>
    set((state) => ({
      selectedPrerequisite: [
        ...state.selectedPrerequisite,
        newPrerequisite,
      ],
    })),
  deleteSelectedPrerequisite: (courseId, prerequisiteCourseId) =>
    set((state) => ({
      selectedPrerequisite: state.selectedPrerequisite.filter(
        (prerequisite) =>
          !(
            prerequisite.courseId == courseId &&
            prerequisite.prerequisiteCourseId ==
            prerequisiteCourseId
          )
      ),
    })),
  clearSelectedPrerequisite: () => set({ selectedPrerequisite: null }),
}))
