'use client';

import { useEffect, useState } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import Button from './Button';
import { themes, colors } from '../constants/data.json';
import { ThemeType } from '@/types';
import { usePotStore } from '@/store/usePotStore';

interface PotFormProps {
  action: string;
  title: string;
  userId: string | undefined;
}

const getColor = (color: string) => {
  return (
    <div className='flex items-center gap-3'>
      <div className={`w-[16px] h-[16px] rounded-full ${themes[color as keyof ThemeType]}`} />
      <p>{color}</p>
    </div>
  );
};

const PotForm = ({ action, title, userId }: PotFormProps) => {
  const { createPot } = usePotStore();

  const [potFormData, setPotFormData] = useState({
    name: '',
    target: '',
    theme: 'green',
  });

  const [errors, setErrors] = useState({
    name: '',
    target: '',
  });

  const validateInputs = (name: string, value: string) => {
    let error = '';

    if (name === 'name' && value.length < 3) {
      error = 'Name must be at least 3 characters';
    }

    if (name === 'target' && !/^[0-9]+$/.test(value)) {
      error = 'Only numbers are allowed';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setPotFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateInputs(name, value);
  };

  const handleSubmit = () => {
    if (action === 'add') {
      createPot({ ...potFormData, target: Number(potFormData.target), userId: userId ?? '' });
    }
  };

  useEffect(() => {
    if (userId) {
      setPotFormData((prev) => ({ ...prev, userId }));
    }
  }, [userId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{title}</Button>
      </DialogTrigger>
      <DialogContent className='bg-white flex flex-col gap-5 px-5 py-6 rounded-[12px] md:p-8'>
        <DialogHeader className='flex flex-row justify-between'>
          <DialogTitle className='text-[20px] leading-[1.2] text-gray-900 md:text-[32px]'>
            {action === 'add' ? 'Add New Pot' : 'Edit Pot'}
          </DialogTitle>
          <DialogClose asChild>
            <img
              src='/assets/images/icon-close-modal.svg'
              className='hover:cursor-pointer hover:opacity-80'
            />
          </DialogClose>
        </DialogHeader>
        <DialogDescription className='leading-[1.5] text-gray-500'>
          {action === 'add'
            ? 'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'
            : 'If your saving targets change, feel free to update your pots.'}
        </DialogDescription>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1 relative'>
            <label className='text-preset-5-bold text-gray-500'>Pot Name</label>
            <input
              name='name'
              value={potFormData.name}
              onChange={handleChange}
              placeholder='e.g. Rainy Days'
              className={`border border-beige-500 rounded-[8px] px-5 py-3 ${
                errors.name ? 'border-red outline-red' : ''
              }`}
            />
            {errors.name && (
              <p className='text-preset-5 text-gray-500 absolute -bottom-6 right-0'>
                {errors.name}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-1 relative'>
            <label className='text-preset-5-bold text-gray-500'>Target</label>
            <input
              name='target'
              value={potFormData.target}
              onChange={handleChange}
              placeholder='$ 2000'
              className={`border border-beige-500 rounded-[8px] px-5 py-3 ${
                errors.target ? 'border-red outline-red' : ''
              }`}
            />
            {errors.target && (
              <p className='text-preset-5 text-gray-500 absolute -bottom-6 right-0'>
                {errors.target}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-preset-5-bold text-gray-500'>Theme</label>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center gap-4 px-5 py-3 rounded-[8px] border border-beige-500 text-preset-4 text-gray-900 select-none capitalize hover:cursor-pointer'>
                {getColor(potFormData.theme)}
                <img
                  src='/assets/images/icon-caret-down.svg'
                  alt='dropdown-arrow'
                  className='ml-auto'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='min-w-[var(--radix-popper-anchor-width)]'>
                {colors.map((color, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      id={color}
                      onClick={(e) =>
                        setPotFormData((prevData) => ({
                          ...prevData,
                          theme: e.currentTarget.id,
                        }))
                      }
                      className='text-gray-900 text-preset-4 capitalize hover:cursor-pointer'>
                      <div className='w-full flex items-center'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={`w-4 h-4 rounded-full ${themes[color as keyof ThemeType]}`}
                          />
                          <p>{color}</p>
                        </div>
                      </div>
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
          <Button onClick={handleSubmit} className='w-full'>
            {action === 'add' ? 'Add Pot' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PotForm;
