import { Label, Pie, PieChart } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { BudgetType, ThemeType } from '@/types';
import { themes } from '../constants/data.json';
import { useTransactionStore } from '@/store/useTransactionStore';
import React from 'react';

interface BudgetsChartProps {
  budgets: BudgetType[];
}

const BudgetsChart = ({ budgets }: BudgetsChartProps) => {
  const { transactions } = useTransactionStore();

  const chartData = budgets.map((budget) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.category === budget.category
    );

    const budgetSpent = Math.abs(
      filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    );

    return {
      category: budget.category,
      spent: budgetSpent,
      fill: `var(--color-${themes[budget.theme as keyof ThemeType].slice(3)})`,
    };
  });

  const chartConfig: ChartConfig = budgets.reduce((config, budget) => {
    config[budget.category] = {
      label: budget.category,
      color: `var(--color-${themes[budget.theme as keyof ThemeType].slice(3)})`,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <div className='flex flex-col justify-center gap-8 px-5 py-6 bg-white rounded-[12px] md:p-8 md:flex-row xl:flex-col'>
      <ChartContainer
        config={chartConfig}
        className='mx-auto aspect-square min-h-[280px] max-h-[280px] flex-1'>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey='spent'
            nameKey='category'
            innerRadius={80}
            outerRadius={93}
            startAngle={90}
            endAngle={-270}
            opacity={0.6}
          />
          <Pie
            data={chartData}
            dataKey='spent'
            nameKey='category'
            innerRadius={93}
            outerRadius={120}
            startAngle={90}
            endAngle={-270}
            strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-3xl font-bold'>
                        {`$${Math.abs(chartData.reduce((acc, budget) => acc + budget.spent, 0))}`}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 32}
                        className='fill-muted-foreground'>
                        of $1000 limit
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className='flex flex-col items-start gap-6 flex-1'>
        <h2 className='text-preset-2 text-gray-900'>Spending Summary</h2>
        {budgets.map((budget, index) => {
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
              <div
                className={`border-b-1 border-gray-100 mt-4 ${
                  index === budgets.length - 1 ? 'hidden' : ''
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetsChart;
