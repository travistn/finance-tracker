'use client';

import { useSession } from 'next-auth/react';

const Overview = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
};

export default Overview;
