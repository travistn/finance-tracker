import { TransactionType } from '@/types';

interface TransactionProps {
  transaction: TransactionType;
}

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <>
      <div className='flex flex-row items-center justify-between md:hidden'>
        <div className='flex flex-row items-center gap-3'>
          <img
            src={transaction.avatar}
            alt={`${transaction.name} avatar`}
            className='w-8 h-8 rounded-full md:w-10 md:h-10'
          />
          <div className='flex flex-col gap-1 text-left md:flex-row md:items-center'>
            <p className='text-preset-4-bold text-gray-900'>{transaction.name}</p>
            <p className='text-preset-5 text-gray-500'>{transaction.category}</p>
          </div>
        </div>
        <div className='flex flex-col gap-1 text-right md:flex-row md:items-center'>
          <p
            className={`text-preset-4-bold ${
              transaction.amount > 0 ? 'text-green' : 'text-gray-900'
            }`}>
            {`${transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}`}
          </p>
          <p className='text-preset-5 text-gray-500'>
            {new Date(transaction.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className='max-md:hidden grid grid-cols-5 gap-8 items-center'>
        <div className='flex items-center gap-4 col-start-1 col-end-3'>
          <img
            src={transaction.avatar}
            alt={`${transaction.name} avatar`}
            className='w-10 h-10 rounded-full'
          />
          <p className='text-preset-4-bold text-gray-900'>{transaction.name}</p>
        </div>
        <p className='text-preset-5 text-gray-500 col-start-3'>{transaction.category}</p>
        <p className='text-preset-5 text-gray-500 col-start-4'>
          {new Date(transaction.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p
          className={`text-preset-4-bold col-start-5 text-right ${
            transaction.amount > 0 ? 'text-green' : 'text-gray-900'
          }`}>
          {`${transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}`}
        </p>
      </div>
      <div className='border-b-1 border-gray-100 my-4' />
    </>
  );
};

export default Transaction;
