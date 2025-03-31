import Button from './Button';

const Pot = () => {
  const targetAmount = 2000;
  const potAmount = 159;
  const percentageSaved = potAmount / targetAmount;

  return (
    <div className='bg-white flex flex-col gap-8 px-5 py-6 rounded-[12px] md:px-6'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <div className='bg-green w-4 h-4 rounded-full' />
          <h2 className='text-preset-2 text-gray-900'>Savings</h2>
        </div>
        <img
          src='/assets/images/icon-ellipsis.svg'
          alt='ellipsis-icon'
          className='h-[5px] select-none hover:cursor-pointer'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <span className='flex items-center justify-between'>
          <p className='text-preset-4 text-gray-500'>Total Saved</p>
          <p className='text-preset-1 text-gray-900'>
            {potAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </span>
        <div className='flex flex-col gap-[13px]'>
          <div className='h-2 bg-beige-100 rounded-[4px]'>
            <div
              style={{ width: `${percentageSaved >= 100 ? 100 : percentageSaved * 100}%` }}
              className='h-2 rounded-[4px] bg-green'
            />
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-preset-5-bold text-gray-500'>
              {percentageSaved.toLocaleString('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className='text-preset-5 text-gray-500'>
              {targetAmount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
        <div className='flex justify-between gap-4'>
          <Button variant='secondary' className='flex-1'>
            + Add Money
          </Button>
          <Button variant='secondary' className='flex-1'>
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pot;
