import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { TransactionType } from '@/types';

interface TransactionStore {
  transactions: TransactionType[];
  setTransactions: (transactions: TransactionType[]) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      setTransactions: (transactions) => set({ transactions }),
    }),
    {
      name: 'transaction-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
