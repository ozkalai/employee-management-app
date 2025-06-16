import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { generateEmployees } from '../utils/employee-mock.js';

const getInitialEmployees = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('employees');
    if (data) return JSON.parse(data);
  }
  const mockEmployees = generateEmployees(890);
  localStorage.setItem('employees', JSON.stringify(mockEmployees));
  return mockEmployees;
};

const employees = getInitialEmployees();

export const useEmployeeStore = createStore(
  persist(
    (set, get) => ({
      employees,
      addEmployee: (employee) => {
        const updated = [...get().employees, employee];
        set({ employees: updated });
      },
      editEmployee: (id, updatedFields) => {
        const updated = get().employees.map(emp =>
          emp.id === id ? { ...emp, ...updatedFields } : emp
        );
        set({ employees: updated });
      },
      deleteEmployee: (id) => {
        const updated = get().employees.filter(emp => emp.id !== id);
        set({ employees: updated });
      },
    }),
    { name: 'employees' }
  )
);