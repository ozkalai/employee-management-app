import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'tr';
  }
  return 'tr';
};

export const useLanguageStore = createStore((
  persist(
    (set) => ({
      language: getInitialLanguage(),
      setLanguage: (lang) => {
        set({ language: lang });
      },
    }),
    { name: 'language' }
  )
)); 