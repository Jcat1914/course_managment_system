import { create } from 'zustand'
export const useTermsStore = create((set) => ({
  terms: [],
  setTerms: (terms) => set({ terms }),
  addTerm: (newTerm) =>
    set((state) => ({ terms: [...state.terms, newTerm] })),
  updateTerm: (updatedTerm) =>
    set((state) => ({
      terms: state.terms.map((term) =>
        term.id === updatedTerm.id ? updatedTerm : term
      ),
    })),
  deleteTerm: (id) =>
    set((state) => ({
      terms: state.terms.filter((term) => term.id !== id),
    })),
}))
