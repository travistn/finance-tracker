import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import Button from './Button';
import { PotType } from '@/types';
import { usePotStore } from '@/store/usePotStore';

interface PotTransactionDialogProps {
  action: string;
  title: string;
  pot: PotType;
}

const PotTransactionDialog = ({ action, title, pot }: PotTransactionDialogProps) => {
  const { updatePotAmount } = usePotStore();

  const [amount, setAmount] = useState<number>(pot.amount ?? 0);
  const [transactionAmount, setTransactionAmount] = useState<number | ''>('');
  const percentageSaved = amount / pot.target;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : Number(value);

    setTransactionAmount(value === '' ? '' : numValue);

    setAmount(
      action === 'add' ? (pot.amount ?? 0) + numValue : Math.max((pot.amount ?? 0) - numValue, 0)
    );
  };

  const handleSubmit = () => {
    if (action === 'add') {
      updatePotAmount(pot._id!, amount);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {action === 'add' ? (
          <Button variant='secondary' className='flex-1'>
            {title}
          </Button>
        ) : (
          <Button variant='secondary' className='flex-1'>
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-5'>
        <DialogHeader className='flex flex-row justify-between'>
          <DialogTitle className='text-[20px] leading-[1.2] text-gray-900 font-bold md:text-[32px]'>
            {action === 'add' ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`}
          </DialogTitle>
          <DialogClose>
            <img
              src='/assets/images/icon-close-modal.svg'
              className='hover:cursor-pointer hover:opacity-80'
            />
          </DialogClose>
        </DialogHeader>
        <DialogDescription className='text-left text-[14px] leading-[1.5]'>
          {action === 'add'
            ? 'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance'
            : 'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.'}
        </DialogDescription>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <p className='text-preset-4 text-gray-500'>New Amount</p>
            <p className='text-preset-1 text-gray-900'>
              {amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>
          <div className='flex flex-col gap-[13px]'>
            <div className='bg-beige-100 h-2 rounded-[8px]'></div>
            <div className='flex items-center justify-between'>
              <p
                className={`text-preset-5-bold ${pot.amount! < amount ? 'text-green' : ''} ${
                  pot.amount! > amount ? 'text-red' : ''
                }`}>
                {percentageSaved.toLocaleString('en-US', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className='text-preset-5 text-gray-500'>
                Target of{' '}
                {amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-preset-5-bold text-gray-500'>{`Amount to ${
            action === 'add' ? 'Add' : 'Withdraw'
          }`}</label>
          <input
            type='number'
            placeholder='$'
            value={transactionAmount}
            onChange={handleInputChange}
            className='border border-beige-500 rounded-[8px] px-5 py-3'
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className='w-full'>
            {action === 'add' ? 'Confirm Addition' : 'Confirm Withdrawal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PotTransactionDialog;
