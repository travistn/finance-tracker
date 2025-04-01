import { Dialog, DialogTrigger } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import Button from './Button';
import { PotType, ThemeType } from '@/types';
import { themes } from '../constants/data.json';
import PotForm from './PotForm';

interface PotProps {
  pot: PotType;
}

const Pot = ({ pot }: PotProps) => {
  const potAmount = 159;
  const percentageSaved = potAmount / pot.target;

  return (
    <div className='bg-white flex flex-col gap-8 px-5 py-6 rounded-[12px] md:px-6'>
      <div className='flex justify-between items-center relative'>
        <div className='flex items-center gap-4'>
          <div className={`w-4 h-4 rounded-full ${themes[pot.theme as keyof ThemeType]}`} />
          <h2 className='text-preset-2 text-gray-900'>{pot.name}</h2>
        </div>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src='/assets/images/icon-ellipsis.svg'
                alt='ellipsis-icon'
                className='h-[5px] select-none hover:cursor-pointer'
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white flex flex-col rounded-[8px] shadow-2xl px-5 py-3 select-none absolute right-[-11] top-2 min-w-[135px]'>
              <DialogTrigger asChild>
                <PotForm action='edit' title='Edit Pot' pot={pot} />
              </DialogTrigger>
              <DropdownMenuSeparator className='my-3'>
                <DialogTrigger asChild>Delete</DialogTrigger>
              </DropdownMenuSeparator>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
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
              style={{ width: `${Math.min(percentageSaved, 1) * 100}%` }}
              className={`h-2 rounded-[4px] ${themes[pot.theme as keyof ThemeType]}`}
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
              {pot.target.toLocaleString('en-US', {
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
