'use client';

import { useSession } from 'next-auth/react';

const Overview = () => {
  const { data: session } = useSession();

  return <div></div>;
};

export default Overview;
