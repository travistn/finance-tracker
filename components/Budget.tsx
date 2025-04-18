import { Fragment, useState } from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogTrigger } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import BudgetForm from './BudgetForm';
import DeleteDialog from './DeleteDialog';
import { BudgetType, ThemeType } from '@/types';
import { useTransactionStore } from '@/store/useTransactionStore';
import { themes } from '../constants/data.json';

interface BudgetProps {
  budget: BudgetType;
}

const Budget = ({ budget }: BudgetProps) => {
  const [seeAll, setSeeAll] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { transactions } = useTransactionStore();

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.category === budget.category
  );

  const budgetSpent = Math.abs(
    filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
  );
  const budgetRemaining = budget.maximum - budgetSpent;
  const percentageSpent = (budgetSpent / budget.maximum) * 100;

  return (
    <div className='bg-white rounded-[12px] px-5 py-6 flex flex-col items-start gap-5 md:p-8'>
      <div className='w-full flex justify-between items-center relative'>
        <div className='flex items-center gap-4'>
          <div className={`w-4 h-4 rounded-full ${themes[budget.theme as keyof ThemeType]}`} />
          <h2 className='text-preset-2 text-gray-900'>{budget.category}</h2>
        </div>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src='/assets/images/icon-ellipsis.svg'
                alt='ellipsis-icon'
                onClick={() => setOpenMenu(!openMenu)}
                className='h-[5px] select-none hover:cursor-pointer'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white flex flex-col rounded-[8px] shadow-2xl px-5 py-3 select-none absolute right-[-11] top-2 min-w-[135px]'>
              <DialogTrigger asChild>
                <BudgetForm action='edit' title='Edit Budget' budget={budget} />
              </DialogTrigger>
              <DropdownMenuSeparator className='my-3' />
              <DialogTrigger asChild>
                <DeleteDialog budget={budget} />
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-preset-4 text-gray-500'>Maximum of ${budget.maximum} </p>
        <div className='bg-beige-100 rounded-[4px] p-1 h-[32px]'>
          <div
            style={{ width: `${percentageSpent >= 100 ? 100 : percentageSpent}%` }}
            className={`rounded-[4px] h-[24px] ${themes[budget.theme as keyof ThemeType]}`}
          />
        </div>
        <div className='flex gap-4'>
          <div className='flex gap-4 flex-1'>
            <div className={`w-1 rounded-[8px] ${themes[budget.theme as keyof ThemeType]}`} />
            <div className='flex flex-col gap-1'>
              <p className='text-preset-5 text-gray-500'>Spent</p>
              <p className='text-preset-4-bold text-gray-900'>
                {budgetSpent.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            </div>
          </div>
          <div className='flex gap-4 flex-1'>
            <div className='w-1 rounded-[8px] bg-beige-100' />
            <div className='flex flex-col gap-1'>
              <p className='text-preset-5 text-gray-500'>Remaining</p>
              <p className='text-preset-4-bold text-gray-900'>
                {budgetRemaining <= 0
                  ? '$0'
                  : budgetRemaining.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className='bg-beige-100 p-4 flex flex-col gap-5 rounded-[12px] w-full'>
        <div className='flex items-center justify-between'>
          <h3 className='text-preset-3 text-gray-900'>Latest Spending</h3>
          <span
            onClick={() => setSeeAll(!seeAll)}
            className='flex items-center gap-3 text-preset-4 text-gray-500 select-none hover:cursor-pointer'>
            See All
            <img
              src={'/assets/images/icon-caret-right.svg'}
              className={`${seeAll ? 'rotate-90' : ''}`}
            />
          </span>
        </div>
        <div className='flex flex-col'>
          {(seeAll ? filteredTransactions : filteredTransactions.slice(0, 3)).map(
            (transaction, index) => (
              <Fragment key={index}>
                <div key={index} className='flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={transaction.avatar}
                      alt='avatar'
                      className='max-md:hidden w-[32px] h-[32px] rounded-full'
                    />
                    <p className='text-preset-5-bold text-gray-900'>{transaction.name}</p>
                  </div>
                  <div className='flex flex-col gap-1 text-right'>
                    <p className='text-preset-5-bold text-gray-900'>
                      {transaction.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
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
                <div
                  className={`border-b-1 border-gray-500 my-4 opacity-15 ${
                    index === filteredTransactions.length - 1 ? 'hidden' : ''
                  }`}
                />
              </Fragment>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Budget;
