'use client';

import { useEffect } from 'react';

import { useTransactionStore } from '@/store/useTransactionStore';

const Overview = () => {
  const { setTransactions } = useTransactionStore();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transaction', {
          method: 'GET',
        });

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, [setTransactions]);

  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
};

export default Overview;
