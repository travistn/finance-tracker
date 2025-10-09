'use client';

const Overview = () => {
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
    </div>
  );
};

export default Overview;
