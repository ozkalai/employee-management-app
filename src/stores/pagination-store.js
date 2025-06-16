import { createStore } from 'zustand/vanilla';
import { useEmployeeStore } from './employee-store.js';
import { getPageFromUrl, setPageInUrl } from '../utils/url.js';

const totalPage = Math.ceil(useEmployeeStore.getState().employees.length / 9).toFixed(0); 

export const usePaginationStore = createStore((set) => ({
  currentPage: getPageFromUrl(),
  totalPages: totalPage,
  setPage: (page) => {
    set({ currentPage: page });
    setPageInUrl(page);
  },
  setTotalPages: (total) => set({ totalPages: total }),
})); 