'use client';

import { useEffect } from 'react';

import Pot from '@/components/Pot';
import PotForm from '@/components/PotForm';
import { usePotStore } from '@/store/usePotStore';

const Pots = () => {
  const { pots, fetchPots } = usePotStore();

  useEffect(() => {
    fetchPots();
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-preset-1 text-gray-900'>Pots</h1>
        <PotForm action='add' title='+ Add New Pot' />
      </div>
      <div className='flex flex-col gap-6 xl:grid grid-cols-2'>
        {pots?.map((pot) => (
          <Pot key={pot._id} pot={pot} />
        ))}
      </div>
    </div>
  );
};

export default Pots;
