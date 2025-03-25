'use client';

import Budget from '@/components/Budget';
import BudgetForm from '@/components/BudgetForm';
import { budgets } from '../../../constants/data.json';

const Budgets = () => {
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
