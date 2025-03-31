'use client';

import Pot from '@/components/Pot';
import PotForm from '@/components/PotForm';

const Pots = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-preset-1 text-gray-900'>Pots</h1>
        <PotForm action='add' title='+ Add New Pot' />
      </div>
      <Pot />
    </div>
  );
};

export default Pots;
