import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { TransactionType } from '@/types';

interface TransactionStore {
  transactions: TransactionType[];
  fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      fetchTransactions: async () => {
        const response = await fetch('/api/transaction', {
          method: 'GET',
        });
        const data = await response.json();
        set({ transactions: data });
      },
    }),
    {
      name: 'transaction-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
