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
  addProfessorCourses: (newCourses) =>
    set((state) => ({
      professors: state.professors.map((professor) =>
        professor.id === newCourses.facultyId
          ? { ...professor, courses: newCourses.courses }
          : professor
      ),
    })),

  deleteProfessorCourse: (facultyId, courseId) =>
    set((state) => ({
      professors: state.professors.map((professor) =>
        professor.id === facultyId
          ? {
            ...professor,
            courses: professor.courses.filter(
              (course) => course.id !== courseId
            ),
          }
          : professor
      ),
    })),

  addProfessorAvailability: (newAvailability) =>
    set((state) => ({
      professors: state.professors.map((professor) =>
        professor.id === newAvailability.facultyId
          ? { ...professor, facultyAvailabilities: newAvailability.availabilities }
          : professor
      ),
    })),

  deleteProfessorAvailability: (facultyId, availabilityId) =>
    set((state) => ({
      professors: state.professors.map((professor) =>
        professor.id === facultyId
          ? {
            ...professor,
            facultyAvailabilities: professor.facultyAvailabilities.filter(
              (availability) => availability.id !== availabilityId
            ),
          }
          : professor
      ),
    })),

  updateProfessorAvailability: (professorId, availabilityId, updatedAvailability) =>
    set((state) => ({
      professors: state.professors.map((professor) =>
        professor.id === professorId
          ? {
            ...professor,
            facultyAvailabilities: professor.facultyAvailabilities.map(
              (availability) =>
                availability.id === availabilityId
                  ? { ...availability, ...updatedAvailability } // Update the matched availability
                  : availability
            ),
          }
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
