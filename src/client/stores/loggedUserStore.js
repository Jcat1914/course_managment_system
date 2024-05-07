import { create } from 'zustand'

const defaultUser = {
  id: null,
  firstName: null,
  lastName: null,
  role: null
}

export const useLoggedUserStore = create(set => ({
  user: defaultUser,
  setUser: user => set({ user }),
  resetUser: () => set({ user: defaultUser }),
  updateRole: role => set(state => ({ user: { ...state.user, role } }))
}))

