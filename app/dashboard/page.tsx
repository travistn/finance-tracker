'use client';

import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();

  return <div>Dashboard</div>;
};

export default Dashboard;
