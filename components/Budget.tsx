import { BudgetType } from '@/types';

interface BudgetProps {
  budget: BudgetType;
}

interface ThemeVariants {
  green: string;
  yellow: string;
  cyan: string;
  navy: string;
}

const Budget = ({ budget }: BudgetProps) => {
  const budgetSpent = 25;
  const budgetRemaining = budget.maximum - budgetSpent;
  const percentageSpent = (budgetSpent / budget.maximum) * 100;

  const themeVariants = {
    green: 'bg-green',
    yellow: 'bg-yellow',
    cyan: 'bg-cyan',
    navy: 'bg-navy',
  };

  return (
    <div className='bg-white rounded-[12px] px-5 py-6 flex flex-col items-start gap-5 md:p-8'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <div
            className={`w-4 h-4 rounded-full ${themeVariants[budget.theme as keyof ThemeVariants]}`}
          />
          <h2 className='text-preset-2 text-gray-900'>{budget.category}</h2>
        </div>
        <img
          src='/assets/images/icon-ellipsis.svg'
          alt='ellipsis-icon'
          className='hover:cursor-pointer h-[5px]'
        />
      </div>
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-preset-4 text-gray-500'>Maximum of ${budget.maximum} </p>
        <div className='bg-beige-100 rounded-[4px] p-1 h-[32px]'>
          <div
            style={{ width: `${percentageSpent >= 100 ? 100 : percentageSpent}%` }}
            className={`rounded-[4px] h-[24px] ${
              themeVariants[budget.theme as keyof ThemeVariants]
            }`}
          />
        </div>
        <div className='flex gap-4'>
          <div className='flex gap-4 flex-1'>
            <div
              className={`w-1 rounded-[8px] ${themeVariants[budget.theme as keyof ThemeVariants]}`}
            />
            <div className='flex flex-col gap-1'>
              <p className='text-preset-5 text-gray-500'>Spent</p>
              <p className='text-preset-4-bold text-gray-900'>
                {budgetSpent.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            </div>
          </div>
          <div className='flex gap-4 flex-1'>
            <div className='w-1 rounded-[8px] bg-beige-100' />
            <div className='flex flex-col gap-1'>
              <p className='text-preset-5 text-gray-500'>Remaining</p>
              <p className='text-preset-4-bold text-gray-900'>
                {budgetRemaining <= 0
                  ? '$0'
                  : budgetRemaining.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
