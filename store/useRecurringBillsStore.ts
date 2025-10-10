import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RecurringBillsStore {
  recurringBills: {
    paid: number;
    upcoming: number;
    dueSoon: number;
  };
  setRecurringBills: (bills: Partial<RecurringBillsStore['recurringBills']>) => void;
}

export const useRecurringBillsStore = create<RecurringBillsStore>()(
  persist(
    (set) => ({
      recurringBills: {
        paid: 0,
        upcoming: 0,
        dueSoon: 0,
      },

      setRecurringBills: (bills) => {
        set((state) => ({
          recurringBills: { ...state.recurringBills, ...bills },
        }));
      },
    }),
    {
      name: 'recurring-bills-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
