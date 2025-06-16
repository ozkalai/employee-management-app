import { createStore } from 'zustand/vanilla';
import { useEmployeeStore } from './employee-store.js';

const totalPage = Math.ceil(useEmployeeStore.getState().employees.length / 9).toFixed(0); 

export const usePaginationStore = createStore((set) => ({
  currentPage: 1,
  totalPages: totalPage,
  setPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
})); 