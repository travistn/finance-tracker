import { getDate, format } from 'date-fns';

import { TransactionType } from '@/types';

interface RecurringTransactionProps {
  transaction: TransactionType;
}

const RecurringTransaction = ({ transaction }: RecurringTransactionProps) => {
  return (
    <div className='flex flex-col max-md:gap-3 md:grid md:grid-cols-6'>
      <span className='flex items-center gap-4 md:col-start-1 md:col-end-4'>
        <img
          src={transaction.avatar}
          alt={`${transaction.name} avatar`}
          className='w-8 h-8 rounded-full'
        />
        <h3 className='text-preset-4-bold text-gray-900'>{transaction.name}</h3>
      </span>
      <div className='flex items-center justify-between md:col-start-5'>
        <span className='flex items-center gap-2'>
          <p className='text-preset-5 text-green'>{`Monthly - ${format(
            transaction?.date,
            'do'
          )}`}</p>
          <img src='/assets/images/icon-bill-paid.svg' />
        </span>
        <p className='text-preset-4-bold text-gray-900 md:hidden'>
          {transaction.amount
            .toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
            .slice(1)}
        </p>
      </div>
      <p className='text-preset-4-bold text-gray-900 max-md:hidden text-right'>
        {transaction.amount
          .toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          .slice(1)}
      </p>
    </div>
  );
};

export default RecurringTransaction;
