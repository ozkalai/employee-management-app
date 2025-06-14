import { createStore } from 'zustand/vanilla';

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'tr';
  }
  return 'tr';
};

export const useLanguageStore = createStore((set) => ({
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    set({ language: lang });
  },
})); 