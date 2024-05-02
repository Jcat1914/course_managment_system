import { create } from 'zustand'

export const useStudentStore = create((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
  addStudent: (newStudent) =>
    set((state) => ({ students: [...state.students, newStudent] })),
  updateStudent: (updatedStudent) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      ),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),

}))

export const useStudentEnrollmentStore = create((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
  addStudent: (newStudent) =>
    set((state) => ({ students: [...state.students, newStudent] })),
  updateStudent: (updatedStudent) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      ),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),

}))
