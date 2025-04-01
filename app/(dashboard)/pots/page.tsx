'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import Pot from '@/components/Pot';
import PotForm from '@/components/PotForm';
import { usePotStore } from '@/store/usePotStore';

const Pots = () => {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>('');
  const { pots, fetchPots } = usePotStore();

  useEffect(() => {
    fetchPots();
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session.user.id) {
      setUserId(session.user.id);
    }
  }, [session, status]);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-preset-1 text-gray-900'>Pots</h1>
        <PotForm action='add' title='+ Add New Pot' userId={userId} />
      </div>
      {pots?.map((pot) => (
        <Pot key={pot._id} pot={pot} />
      ))}
    </div>
  );
};

export default Pots;
