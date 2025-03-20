'use client';

import Button from '@/components/Button';
import Budget from '@/components/Budget';
import { budgets } from '../../../constants/data.json';

const Budgets = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-preset-1 text-gray-900'>Budgets</h1>
        <Button>+ Add New Budget</Button>
      </div>
      {budgets.map((budget, index) => (
        <Budget budget={budget} key={index} />
      ))}
    </div>
  );
};

export default Budgets;
