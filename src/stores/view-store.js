import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

export const useViewStore = createStore(
  persist(
    (set) => ({
      view: 'table',
      setView: (view) => set({ view }),
    }),
    {
      name: 'employee-list-view',
    }
  )
);