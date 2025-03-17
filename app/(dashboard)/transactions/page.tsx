import { transactions } from '../../../constants/data.json';
import Transaction from '@/components/Transaction';

const Transactions = () => {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-preset-1 text-gray-900'>Transactions</h1>
      <div className='flex flex-col gap-6 px-5 py-6 rounded-xl bg-white'>
        <div className='max-md:hidden flex flex-row items-center justify-start py-3 gap-8 border-b-1 border-gray-100 md:grid md:grid-cols-5'>
          <p className='text-preset-5 text-gray-500 col-start-1 col-end-3'>Recipient / Sender</p>
          <p className='text-preset-5 text-gray-500'>Category</p>
          <p className='text-preset-5 text-gray-500'>Transaction Date</p>
          <p className='text-preset-5 text-gray-500 text-right'>Amount</p>
        </div>
        <div>
          {transactions.slice(0, 6).map((transaction, index) => (
            <Transaction transaction={transaction} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
