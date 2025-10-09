'use client';

import { useEffect, Fragment } from 'react';

import { useTransactionStore } from '@/store/useTransactionStore';
import RecurringBillsSummary from '@/components/RecurringBillsSummary';
import RecurringTransaction from '@/components/RecurringTransaction';

const RecurringBills = () => {
  const { transactions, fetchTransactions } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const recurringTransactions = transactions
    .filter((transaction) => transaction.recurring)
    .filter(
      (transaction, index, self) => self.findIndex((t) => t.name === transaction.name) === index
    );

  const totalBills = recurringTransactions.reduce(
    (sum, transaction) => sum + Math.abs(transaction?.amount),
    0
  );

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-preset-1 text-gray-900'>Recurring Bills</h1>
      <div className='flex flex-col gap-6 xl:grid xl:grid-cols-3'>
        <div className='flex flex-col gap-3 md:flex-row md:gap-6 max-xl:justify-between xl:flex-col'>
          <div className='flex gap-6 px-5 py-6 bg-gray-900 rounded-[12px] md:flex-col md:gap-8 md:px-6 max-xl:flex-1'>
            <img src='/assets/images/icon-recurring-bills.svg' className='md:w-[32px]' />
            <div className='flex flex-col gap-3 text-white'>
              <h2 className='text-preset-4'>Total bills</h2>
              <p className='text-preset-1'>${totalBills}</p>
            </div>
          </div>
          <RecurringBillsSummary transactions={recurringTransactions} />
        </div>
        <div className='flex flex-col gap-6 bg-white rounded-[12px] px-5 py-6 md:p-8 xl:col-start-2 xl:col-end-4'>
          <div className='flex flex-col'>
            <div className='max-md:hidden md:grid grid-cols-6'>
              <p className='text-preset-5 text-gray-500'>Bill Title</p>
              <p className='text-preset-5 text-gray-500 col-start-5'>Due Date</p>
              <p className='text-preset-5 text-gray-500 text-right'>Amount</p>
            </div>
            <div className='border-b-1 border-gray-100 my-6 max-md:hidden' />
            {recurringTransactions.map((transaction, index) => (
              <Fragment key={index}>
                <RecurringTransaction transaction={transaction} />
                <div
                  className={`border-b-1 border-gray-100 my-5 ${
                    index === recurringTransactions.length - 1 ? 'hidden' : ''
                  }`}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringBills;
