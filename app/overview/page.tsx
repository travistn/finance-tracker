'use client';

import { useSession } from 'next-auth/react';

import Sidebar from '@/components/Sidebar';

const Overview = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className='fixed max-xl:bottom-0 w-full flex flex-col xl:flex-row xl:h-screen'>
        <Sidebar />
      </div>
    </div>
  );
};

export default Overview;
