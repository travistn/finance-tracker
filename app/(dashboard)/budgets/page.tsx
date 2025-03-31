'use client';

import { useEffect } from 'react';

import Budget from '@/components/Budget';
import BudgetForm from '@/components/BudgetForm';
import BudgetsChart from '@/components/BudgetsChart';
import { useBudgetStore } from '@/store/useBudgetStore';

const Budgets = () => {
  const { budgets, fetchBudgets } = useBudgetStore();

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-preset-1 text-gray-900'>Budgets</h1>
        <BudgetForm action='add' title='+ Add New Budget' />
      </div>
      <div className='max-xl:flex max-xl:flex-col gap-6 xl:grid xl:grid-cols-3'>
        {budgets.length !== 0 && (
          <div className='xl:auto-rows-min'>
            <BudgetsChart budgets={budgets} />
          </div>
        )}
        <div className='flex flex-col gap-6 xl:col-start-2 xl:col-end-4'>
          {budgets.map((budget, index) => (
            <Budget budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budgets;
