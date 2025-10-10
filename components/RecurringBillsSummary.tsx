import { useEffect } from 'react';
import { getDate, parseISO } from 'date-fns';

import { TransactionType } from '@/types';
import { useRecurringBillsStore } from '@/store/useRecurringBillsStore';

interface RecurringBillsSummaryProps {
  transactions: TransactionType[];
}

const RecurringBillsSummary = ({ transactions }: RecurringBillsSummaryProps) => {
  const { recurringBills, setRecurringBills } = useRecurringBillsStore();

  const getDaysUntilDue = (transaction: TransactionType) => {
    const dueDate = parseISO(transaction?.date);
    const dueDay = getDate(dueDate);
    const todayDay = getDate(new Date());

    const daysUntilDue = dueDay - todayDay;

    return daysUntilDue;
  };

  const paidBills = transactions.filter((transaction) => getDaysUntilDue(transaction) < 0);
  const upcomingBills = transactions.filter((transaction) => getDaysUntilDue(transaction) > 5);
  const billsDueSoon = transactions.filter(
    (transaction) => getDaysUntilDue(transaction) <= 5 && getDaysUntilDue(transaction) >= 0
  );

  const calculateBillsTotal = (bills: TransactionType[]) => {
    return bills.reduce((sum, transaction) => sum + Math.abs(transaction?.amount), 0);
  };

  const paid = calculateBillsTotal(paidBills);
  const upcoming = calculateBillsTotal(upcomingBills);
  const dueSoon = calculateBillsTotal(billsDueSoon);

  useEffect(() => {
    setRecurringBills({
      paid,
      upcoming,
      dueSoon,
    });
  }, [paid, upcoming, dueSoon]);

  return (
    <div className='flex flex-col gap-5 bg-white p-5 rounded-[12px] max-xl:flex-1'>
      <h2 className='text-preset-3 text-gray-900'>Summary</h2>
      <div className='flex flex-col'>
        <span className='flex justify-between'>
          <p className='text-preset-5 text-gray-500'>Paid Bills</p>
          {paidBills.length > 0 && (
            <p className='text-preset-5-bold text-gray-900'>{`${
              paidBills.length
            } (${recurringBills.paid.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })})`}</p>
          )}
        </span>
        <div className='border-b-1 border-gray-100 my-4' />
        <span className='flex justify-between'>
          <p className='text-preset-5 text-gray-500'>Total Upcoming</p>
          {upcomingBills.length > 0 && (
            <p className='text-preset-5-bold text-gray-900'>{`${
              upcomingBills.length
            } (${recurringBills.upcoming.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })})`}</p>
          )}
        </span>
        <div className='border-b-1 border-gray-100 my-4' />
        <span className='flex justify-between'>
          <p className='text-preset-5 text-red'>Due Soon</p>
          {billsDueSoon.length > 0 && (
            <p className='text-preset-5-bold text-red'>{`${
              billsDueSoon.length
            } (${recurringBills.dueSoon.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })})`}</p>
          )}
        </span>
      </div>
    </div>
  );
};

export default RecurringBillsSummary;
