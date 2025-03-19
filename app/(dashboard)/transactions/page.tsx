'use client';

import { useState } from 'react';

import Transaction from '@/components/Transaction';
import Dropdown from '@/components/Dropdown';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { transactions, dropdownSortLabels, dropdownCategories } from '../../../constants/data.json';

const Transactions = () => {
  const [sortLabel, setSortLabel] = useState('Latest');
  const [category, setCategory] = useState('All Transactions');

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 10;

  const getFilteredTransactions = () => {
    return transactions
      .filter((item) => item?.name.toLowerCase().includes(search))
      .filter(
        (transaction) =>
          category === 'All Transactions' ||
          transaction.category.toLowerCase() === category.toLowerCase()
      )
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        switch (sortLabel) {
          case 'Latest':
            return dateB - dateA;
          case 'Oldest':
            return dateA - dateB;
          case 'A to Z':
            return a.name.localeCompare(b.name);
          case 'Z to A':
            return b.name.localeCompare(a.name);
          case 'Highest':
            return b.amount - a.amount;
          case 'Lowest':
            return a.amount - b.amount;
          default:
            return 0;
        }
      });
  };

  const filteredTransactions = getFilteredTransactions();

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

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
          {currentTransactions.map((transaction, index) => (
            <Transaction transaction={transaction} key={index} />
          ))}
        </div>
        <Pagination>
          <PaginationContent className='flex flex-row max-lg:justify-between select-none max-lg:w-full lg:gap-4'>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className='border border-beige-500 rounded-[8px] text-preset-4 text-gray-900 hover:bg-beige-500 hover:text-white hover:cursor-pointer'
              />
            </PaginationItem>
            <PaginationItem className='flex gap-2'>
              {pageNumbers.map((page) => (
                <PaginationLink
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-[8px] text-preset-4 hover:bg-beige-500 hover:text-white hover:cursor-pointer ${
                    page === currentPage
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-900 border border-beige-500'
                  }`}>
                  {page}
                </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className='border border-beige-500 rounded-[8px] text-preset-4 text-gray-900 hover:bg-beige-500 hover:text-white hover:cursor-pointer'
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Transactions;
