import { createStore } from 'zustand/vanilla';
import { generateEmployees } from '../utils/employee-mock.js';

const getInitialEmployees = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('employees');
    if (data) return JSON.parse(data);
  }
  return generateEmployees(1000);
};

export const useEmployeeStore = createStore((set, get) => ({
  employees: getInitialEmployees(),
  addEmployee: (employee) => {
    const updated = [...get().employees, employee];
    set({ employees: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem('employees', JSON.stringify(updated));
    }
  },
  editEmployee: (id, updatedFields) => {
    const updated = get().employees.map(emp =>
      emp.id === id ? { ...emp, ...updatedFields } : emp
    );
    set({ employees: updated });
    if (typeof window !== 'undefined') {
      localStorage.setItem('employees', JSON.stringify(updated));
    }
  },
})); 