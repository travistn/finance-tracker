'use client';

import { useState } from 'react';

import Transaction from '@/components/Transaction';
import Dropdown from '@/components/Dropdown';
import { transactions, dropdownSortLabels, dropdownCategories } from '../../../constants/data.json';

const Transactions = () => {
  const [sortLabel, setSortLabel] = useState('Latest');
  const [category, setCategory] = useState('All transactions');

  const [search, setSearch] = useState('');

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-preset-1 text-gray-900'>Transactions</h1>
      <div className='flex flex-col gap-6 px-5 py-6 rounded-[12px] bg-white md:p-8'>
        <div className='flex gap-6 items-center justify-between'>
          <div className='w-full flex items-center justify-between'>
            <input
              placeholder='Search transaction'
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              className='rounded-[8px] border border-beige-500 py-3 px-5 text-gray-900 truncate md:w-[170px] lg:min-w-[280px] 2xl:min-w-[400px]'
            />
            <div className='flex flex-row gap-6 md:hidden'>
              <img src={'/assets/images/icon-sort-mobile.svg'} alt='sort-icon' />
              <img src={'/assets/images/icon-filter-mobile.svg'} alt='filter-icon' />
            </div>
          </div>
          <div className='max-md:hidden flex flex-row gap-6 items-center min-w-fit'>
            <div className='flex gap-2 items-center'>
              <p className='text-preset-4 text-beige-500'>Sort by</p>
              <Dropdown
                dropdownTrigger={sortLabel}
                dropdownMenuItems={dropdownSortLabels}
                className='min-w-[122px]'
                onClick={(e) => setSortLabel(e.target.id)}
              />
            </div>
            <div className='flex gap-2 items-center'>
              <p className='text-preset-4 text-beige-500'>Category</p>
              <Dropdown
                dropdownTrigger={category}
                dropdownMenuItems={dropdownCategories}
                className='min-w-[174.5px]'
                onClick={(e) => setCategory(e.target.id)}
              />
            </div>
          </div>
        </div>
        <div className='max-md:hidden flex flex-row items-center justify-start py-3 gap-8 border-b-1 border-gray-100 select-none md:grid md:grid-cols-5'>
          <h2 className='text-preset-5 text-gray-500 col-start-1 col-end-3'>Recipient / Sender</h2>
          <h2 className='text-preset-5 text-gray-500'>Category</h2>
          <h2 className='text-preset-5 text-gray-500'>Transaction Date</h2>
          <h2 className='text-preset-5 text-gray-500 text-right'>Amount</h2>
        </div>
        <div>
          {transactions
            .slice(0, 6)
            .filter((item) => item?.name.toLowerCase().includes(search))
            .map((transaction, index) => (
              <Transaction transaction={transaction} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
