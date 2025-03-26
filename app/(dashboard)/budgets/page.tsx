'use client';

import { useEffect } from 'react';

import Budget from '@/components/Budget';
import BudgetForm from '@/components/BudgetForm';
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
        <BudgetForm action='add' />
      </div>
      {budgets.map((budget, index) => (
        <Budget budget={budget} key={index} />
      ))}
    </div>
  );
};

export default Budgets;
