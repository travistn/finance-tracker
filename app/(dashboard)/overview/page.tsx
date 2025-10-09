'use client';

import Link from 'next/link';

import { usePotStore } from '@/store/usePotStore';
import { themes } from '../../../constants/data.json';
import { ThemeType } from '@/types';

const Overview = () => {
  const { pots } = usePotStore();

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-preset-1 text-gray-900'>Overview</h1>
      <div className='flex flex-col gap-3 md:flex-row md:gap-8 md:[&>*]:flex-1'>
        <div className='flex flex-col gap-3 p-5 rounded-[12px] bg-gray-900'>
          <h2 className='text-preset-4 text-white/90'>Current Balance</h2>
          <p className='text-preset-1 text-white'>$4,836.00</p>
        </div>
        <div className='flex flex-col gap-3 p-5 rounded-[12px] bg-white'>
          <h2 className='text-preset-4 text-gray-500'>Income</h2>
          <p className='text-preset-1 text-gray-900'>$3,814.25</p>
        </div>
        <div className='flex flex-col gap-3 p-5 rounded-[12px] bg-white'>
          <h2 className='text-preset-4 text-gray-500'>Expenses</h2>
          <p className='text-preset-1 text-gray-900'>$1,700.50</p>
        </div>
      </div>
      <div className='flex flex-col gap-5 px-5 py-6 rounded-[12px] bg-white md:p-8'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-preset-2 text-gray-900'>Pots</h2>
          <Link
            href={'/pots'}
            className='flex flex-row items-center gap-3 hover:cursor-pointer hover:opacity-70'>
            <p className='text-preset-4 text-gray-500'>See Details</p>
            <img src='/assets/images/icon-caret-right.svg' alt='right-arrow' />
          </Link>
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <div className='flex items-center gap-4 p-4 bg-beige-100 rounded-[12px] md:flex-5/12'>
            <img src='/assets/images/icon-pot.svg' alt='pot-icon' />
            <div className='flex flex-col gap-[11px]'>
              <p className='text-preset-4 text-gray-500'>Total Saved</p>
              <p className='text-preset-1 text-gray-900'>
                {pots
                  .reduce((sum, pot) => sum + (pot?.amount ?? 0), 0)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
              </p>
            </div>
          </div>
          <div className='grid gap-4 grid-cols-2 md:flex-7/12'>
            {pots.length > 0 &&
              pots.map((pot, index) => (
                <div key={index} className='flex flex-row gap-4'>
                  <div
                    className={`w-[4px] h-full rounded-[8px] ${
                      themes[pot.theme as keyof ThemeType]
                    }`}
                  />
                  <div className='flex flex-col gap-1'>
                    <p className='text-preset-5 text-gray-500'>{pot.name}</p>
                    <p className='text-preset-4-bold text-gray-900'>
                      {pot.amount?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
