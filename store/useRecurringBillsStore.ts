import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getDate, parseISO } from 'date-fns';

import { TransactionType } from '@/types';

interface RecurringBillsStore {
  recurringBills: {
    paid: number;
    upcoming: number;
    dueSoon: number;
  };
  recurringTransactions?: TransactionType[];
  fetchRecurringBills: () => Promise<void>;
}

const getDaysUntilDue = (transaction: TransactionType) => {
  const dueDate = parseISO(transaction?.date);
  const dueDay = getDate(dueDate);
  const todayDay = getDate(new Date());

  const daysUntilDue = dueDay - todayDay;

  return daysUntilDue;
};

const calculateBillsTotal = (bills: TransactionType[]) => {
  return bills.reduce((sum, transaction) => sum + Math.abs(transaction?.amount), 0);
};

export const useRecurringBillsStore = create<RecurringBillsStore>()(
  persist(
    (set, get) => ({
      recurringBills: {
        paid: 0,
        upcoming: 0,
        dueSoon: 0,
      },

      transactions: [],

      fetchRecurringBills: async () => {
        const response = await fetch('/api/transaction', {
          method: 'GET',
        });
        const data = await response.json();

        set({
          recurringTransactions: data
            .filter((transaction: TransactionType) => transaction.recurring)
            .filter(
              (transaction: TransactionType, index: number, self: TransactionType[]) =>
                self.findIndex((t) => t.name === transaction.name) === index
            ),
        });

        const { recurringTransactions } = get();

        const paidBills =
          recurringTransactions?.filter(
            (transaction: TransactionType) => getDaysUntilDue(transaction) < 0
          ) ?? [];
        const upcomingBills =
          recurringTransactions?.filter(
            (transaction: TransactionType) => getDaysUntilDue(transaction) > 5
          ) ?? [];
        const billsDueSoon =
          recurringTransactions?.filter(
            (transaction: TransactionType) =>
              getDaysUntilDue(transaction) <= 5 && getDaysUntilDue(transaction) >= 0
          ) ?? [];

        set({
          recurringBills: {
            paid: calculateBillsTotal(paidBills),
            upcoming: calculateBillsTotal(upcomingBills),
            dueSoon: calculateBillsTotal(billsDueSoon),
          },
        });
      },
    }),
    {
      name: 'recurring-bills-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
