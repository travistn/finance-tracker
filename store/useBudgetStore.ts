import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { BudgetType, ColorType } from '@/types';

interface BudgetStore {
  budgets: BudgetType[];
  colors: ColorType[];
  fetchBudgets: () => Promise<void>;
  createBudget: (newBudget: BudgetType) => Promise<void>;
  editBudget: (id: string, updatedBudget: Partial<BudgetType>) => Promise<void>;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      budgets: [],

      colors: [
        { name: 'green', used: false },
        { name: 'yellow', used: false },
        { name: 'cyan', used: false },
        { name: 'navy', used: false },
        { name: 'red', used: false },
        { name: 'purple', used: false },
        { name: 'turquoise', used: false },
        { name: 'orange', used: false },
        { name: 'blue', used: false },
        { name: 'magenta', used: false },
      ],

      fetchBudgets: async () => {
        try {
          const response = await fetch('/api/budget', {
            method: 'GET',
          });
          const data = await response.json();
          set({ budgets: data });

          set((state) => {
            const updatedColors = state.colors.map((color) => {
              const isUsed = state.budgets.some((budget) => budget.theme === color.name);
              return { ...color, used: isUsed };
            });
            return { colors: updatedColors };
          });
        } catch (error) {
          console.error;
        }
      },

      createBudget: async (budget) => {
        try {
          await fetch('/api/budget', {
            method: 'POST',
            body: JSON.stringify({ budget }),
          });

          setTimeout(() => {
            window.location.reload();
          }, 300);
        } catch (error) {
          console.error;
        }
      },

      editBudget: async (id, updatedBudget) => {
        try {
          const response = await fetch(`/api/budget/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, ...updatedBudget }),
          });

          if (response.ok) {
            const updatedBudgets = await response.json();

            set((state) => ({
              budgets: state.budgets.map((b) => (b._id === id ? { ...b, ...updatedBudgets } : b)),
            }));

            setTimeout(() => {
              window.location.reload();
            }, 300);
          }
        } catch (error) {
          console.error;
        }
      },
    }),
    {
      name: 'budgets-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
