import { BudgetType, ThemeType } from '@/types';
import { themes } from '../constants/data.json';
import { useTransactionStore } from '@/store/useTransactionStore';

interface BudgetsChartProps {
  budgets: BudgetType[];
}

const BudgetsChart = ({ budgets }: BudgetsChartProps) => {
  const { transactions } = useTransactionStore();

  return (
    <div className='flex flex-col justify-center gap-8 px-5 py-6 bg-white rounded-[12px] md:p-8 md:flex-row'>
      <div className='flex flex-col items-start gap-6'>
        <h2 className='text-preset-2 text-gray-900'>Spending Summary</h2>
        {budgets.map((budget) => {
          const filteredTransactions = transactions.filter(
            (transaction) => transaction.category === budget.category
          );

          const budgetSpent = Math.abs(
            filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
          );
          return (
            <div key={budget._id} className='w-full'>
              <div className='flex flex-row'>
                <div className='flex gap-4'>
                  <div className={`w-1 rounded-[8px] ${themes[budget.theme as keyof ThemeType]}`} />
                  <p className='flex-1 text-preset-4 text-gray-500'>{budget.category}</p>
                </div>
                <span className='flex-1 flex items-center justify-end gap-2'>
                  <p className='text-preset-3 text-gray-900'>
                    {budgetSpent.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </p>
                  <p className='text-preset-5 text-gray-500'>{`of ${budget.maximum.toLocaleString(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD',
                    }
                  )}`}</p>
                </span>
              </div>
              <div className='border-b-1 border-gray-100 mt-4' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetsChart;
