import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Dropdown from './Dropdown';
import { dropdownCategories, colors, themes } from '../constants/data.json';
import { ThemeType } from '@/types';

interface BudgetFormProps {
  action: string;
}

const BudgetForm = ({ action }: BudgetFormProps) => {
  const [category, setCategory] = useState('Bills');
  const [colorTag, setColorTag] = useState('green');

  const getColor = (color: string) => {
    const theme = themes[color as keyof ThemeType];
    return (
      <div className='flex items-center gap-3'>
        <div className={`w-[16px] h-[16px] rounded-full ${theme}`} />
        <p>{color}</p>
      </div>
    );
  };

  return (
    <form className='flex flex-col gap-5 px-5 py-6 bg-white rounded-[12px] md:px-8'>
      <div className='flex justify-between'>
        <h2 className='text-preset-2 text-gray-900'>{`${
          action === 'add' ? 'Add New Budget' : 'Edit Budget'
        }`}</h2>
        <img src={'/assets/images/icon-close-modal.svg'} />
      </div>
      <p className='text-preset-4 text-gray-500'>
        {action === 'add'
          ? 'Choose a category to set a spending budget. These categories can help you monitor spending.'
          : 'As your budgets change, feel free to update your spending limits.'}
      </p>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='text-preset-5-bold text-gray-500'>Budget Category</label>
          <Dropdown
            dropdownTrigger={category}
            dropdownMenuItems={dropdownCategories.slice(1)}
            onClick={(e) => setCategory(e.target.id)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-preset-5-bold text-gray-500'>Maximum Spending</label>
          <input
            placeholder='$   e.g. 2000'
            className='border border-beige-500 rounded-[8px] px-5 py-3'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-preset-5-bold text-gray-500'>Color Tag</label>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-4 px-5 py-3 rounded-[8px] border border-beige-500 text-preset-4 text-gray-900 select-none capitalize hover:cursor-pointer`}>
              {getColor(colorTag)}
              <img
                src={'/assets/images/icon-caret-down.svg'}
                alt='dropdown-arrow'
                className='ml-auto'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-[var(--radix-popper-anchor-width)]'>
              {colors.map((color, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={(e: any) => setColorTag(e.target.id)}
                    id={color}
                    className={`text-gray-900 capitalize hover:cursor-pointer ${
                      color === colorTag ? 'text-preset-4-bold' : 'text-preset-4'
                    }`}>
                    {getColor(color)}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator
                    className={`${index + 1 === colors.length ? 'hidden' : ''}`}
                  />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </form>
  );
};

export default BudgetForm;
