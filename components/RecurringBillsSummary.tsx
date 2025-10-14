import { useRecurringBillsStore } from '@/store/useRecurringBillsStore';

const RecurringBillsSummary = () => {
  const { recurringBills } = useRecurringBillsStore();

  return (
    <div className='flex flex-col gap-5 bg-white p-5 rounded-[12px] max-xl:flex-1'>
      <h2 className='text-preset-3 text-gray-900'>Summary</h2>
      <div className='flex flex-col'>
        <span className='flex justify-between'>
          <p className='text-preset-5 text-gray-500'>Paid Bills</p>
          {recurringBills.paidLength > 0 && (
            <p className='text-preset-5-bold text-gray-900'>{`${
              recurringBills.paidLength
            } (${recurringBills.paid.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })})`}</p>
          )}
        </span>
        <div className='border-b-1 border-gray-100 my-4' />
        <span className='flex justify-between'>
          <p className='text-preset-5 text-gray-500'>Total Upcoming</p>
          {recurringBills.upcomingLength > 0 && (
            <p className='text-preset-5-bold text-gray-900'>{`${
              recurringBills.upcomingLength
            } (${recurringBills.upcoming.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })})`}</p>
          )}
        </span>
        <div className='border-b-1 border-gray-100 my-4' />
        <span className='flex justify-between'>
          <p className='text-preset-5 text-red'>Due Soon</p>
          {recurringBills.dueSoonLength > 0 && (
            <p className='text-preset-5-bold text-red'>{`${
              recurringBills.dueSoonLength
            } (${recurringBills.dueSoon.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })})`}</p>
          )}
        </span>
      </div>
    </div>
  );
};

export default RecurringBillsSummary;
