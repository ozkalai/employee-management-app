import { createStore } from 'zustand/vanilla';

export const useLanguageStore = createStore((set) => ({
  language: 'tr',
  setLanguage: (lang) => set({ language: lang }),
})); 