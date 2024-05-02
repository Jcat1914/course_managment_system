import { create } from 'zustand'

export const useStudentStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),

  addUser: (newUser) =>
    set((state) => ({ users: [...state.users, newUser] })),

  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

}))
