const RecurringBillsSummary = () => {
  return (
    <div className='flex flex-col gap-5 bg-white p-5 rounded-[12px] max-xl:flex-1'>
      <h2 className='text-preset-3 text-gray-900'>Summary</h2>
      <div className='flex flex-col'>
        <span className='flex justify-between'>
          <p className='text-preset-5 text-gray-500'>Paid Bills</p>
          <p className='text-preset-5-bold text-gray-900'>{'2 ($320.00)'}</p>
        </span>
        <div className='border-b-1 border-gray-100 my-4' />
        <span className='flex justify-between'>
          <p className='text-preset-5 text-gray-500'>Total UpComing</p>
          <p className='text-preset-5-bold text-gray-900'>{'2 ($320.00)'}</p>
        </span>
        <div className='border-b-1 border-gray-100 my-4' />
        <span className='flex justify-between'>
          <p className='text-preset-5 text-red'>Due Soon</p>
          <p className='text-preset-5-bold text-red'>{'2 ($320.00)'}</p>
        </span>
      </div>
    </div>
  );
};

export default RecurringBillsSummary;
