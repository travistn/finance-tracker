import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Dropdown from './Dropdown';
import Button from './Button';
import { dropdownCategories, themes } from '../constants/data.json';
import { ThemeType, ColorType } from '@/types';
import { useBudgetStore } from '@/store/useBudgetStore';

interface BudgetFormProps {
  action: string;
}

const getColor = (color: string) => {
  return (
    <div className='flex items-center gap-3'>
      <div className={`w-[16px] h-[16px] rounded-full ${themes[color as keyof ThemeType]}`} />
      <p>{color}</p>
    </div>
  );
};

const BudgetForm = ({ action }: BudgetFormProps) => {
  const { createBudget, colors } = useBudgetStore();

  const [budgetFormData, setBudgetFormData] = useState({
    category: 'Bills',
    maximum: '',
    theme: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '' || /^[0-9]+$/.test(value)) {
      setBudgetFormData((prevData) => ({
        ...prevData,
        maximum: e.target.value,
      }));

      setError('');
    } else {
      setError('Only numbers are allowed');
    }
  };

  useEffect(() => {
    const firstAvailableColor = colors.find((color) => !color.used)?.name || '';

    setBudgetFormData((prevData) => ({
      ...prevData,
      theme: firstAvailableColor,
    }));
  }, [colors]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add New Budget</Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-5 px-5 py-6 bg-white rounded-[12px] md:px-8'>
        <DialogHeader className='flex flex-row justify-between'>
          <DialogTitle className='text-gray-900 text-left text-[20px] leading-[1.2] md:text-[32px]'>{`${
            action === 'add' ? 'Add New Budget' : 'Edit Budget'
          }`}</DialogTitle>
          <DialogClose asChild>
            <img
              src='/assets/images/icon-close-modal.svg'
              className='hover:cursor-pointer hover:opacity-80'
            />
          </DialogClose>
        </DialogHeader>
        <DialogDescription className='text-gray-500 leading-[1.5]'>
          {action === 'add'
            ? 'Choose a category to set a spending budget. These categories can help you monitor spending.'
            : 'As your budgets change, feel free to update your spending limits.'}
        </DialogDescription>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-preset-5-bold text-gray-500'>Budget Category</label>
            <Dropdown
              dropdownTrigger={budgetFormData.category}
              dropdownMenuItems={dropdownCategories.slice(1)}
              onClick={(e) =>
                setBudgetFormData((prevData) => ({
                  ...prevData,
                  category: e.target.id,
                }))
              }
            />
          </div>
          <div className='flex flex-col gap-1 relative'>
            <label className='text-preset-5-bold text-gray-500'>Maximum Spending</label>
            <input
              placeholder='$ 1000'
              value={budgetFormData.maximum}
              onChange={handleChange}
              className={`border border-beige-500 rounded-[8px] px-5 py-3 ${
                error ? 'outline-red' : ''
              }`}
            />
            {error && (
              <p className='text-preset-5 text-gray-500 absolute -bottom-6 right-0'>{error}</p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-preset-5-bold text-gray-500'>Color Tag</label>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-4 px-5 py-3 rounded-[8px] border border-beige-500 text-preset-4 text-gray-900 select-none capitalize hover:cursor-pointer`}>
                {getColor(budgetFormData.theme)}
                <img
                  src='/assets/images/icon-caret-down.svg'
                  alt='dropdown-arrow'
                  className='ml-auto'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='min-w-[var(--radix-popper-anchor-width)]'>
                {colors.map((color: ColorType, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      disabled={color.used}
                      onClick={(e) =>
                        setBudgetFormData((prevData) => ({
                          ...prevData,
                          theme: e.currentTarget.id,
                        }))
                      }
                      id={color.name}
                      className='text-gray-900 text-preset-4 capitalize hover:cursor-pointer'>
                      {
                        <div className='w-full flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <div
                              className={`w-[16px] h-[16px] rounded-full ${
                                themes[color.name as keyof ThemeType]
                              } ${color.used ? 'opacity-50' : ''}`}
                            />
                            <p>{color.name}</p>
                          </div>
                          {color.used && (
                            <p className='text-preset-5 text-gray-500'>Already Used</p>
                          )}
                          {color.name === budgetFormData.theme ? (
                            <img src='/assets/images/icon-selected.svg' />
                          ) : (
                            ''
                          )}
                        </div>
                      }
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
        <DialogFooter>
          <Button
            onClick={() =>
              createBudget({ ...budgetFormData, maximum: Number(budgetFormData.maximum) })
            }
            className='w-full'>
            {action === 'add' ? 'Add Budget' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetForm;
