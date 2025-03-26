import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { BudgetType } from '@/types';

interface BudgetStore {
  budgets: BudgetType[];
  fetchBudgets: () => Promise<void>;
  createBudget: (newBudget: BudgetType) => Promise<void>;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      budgets: [],

      fetchBudgets: async () => {
        try {
          const response = await fetch('/api/budget', {
            method: 'GET',
          });
          const data = await response.json();
          set({ budgets: data });
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
    }),
    {
      name: 'budgets-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
