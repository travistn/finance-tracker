'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import logo from '../../public/assets/images/logo-large.svg';
import authentication_illustration from '../../public/assets/images/illustration-authentication.svg';
import show_password_icon from '../../public/assets/images/icon-show-password.svg';
import hide_password_icon from '../../public/assets/images/icon-hide-password.svg';

const Signup = () => {
  const [inputType, setInputType] = useState('password');

  return (
    <>
      <div className='bg-gray-900 flex items-center justify-center px-10 py-6 rounded-b-lg xl:hidden'>
        <Image src={logo} alt='logo' />
      </div>
      <div className='flex flex-col lg:flex-row xl:items-center max-xl:h-screen max-xl:justify-center'>
        <div className='min-w-fit p-5 hidden relative xl:flex'>
          <Image
            src={authentication_illustration}
            alt='authentication-illustration'
            className='rounded-xl'
          />
          <div className='absolute p-10 flex flex-col justify-between h-full'>
            <Image src={logo} alt='logo' />
            <div className='flex flex-col gap-6 mb-10'>
              <p className='text-preset-1 text-white pr-16'>
                Keep track of your money and save for your future
              </p>
              <p className='text-preset-4 text-white'>
                Personal finance app puts you in control of your spending. Track transactions, set
                budgets, and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
        <div className='w-full px-4 py-6 md:px-26 md:py-8 xl:px-30 3xl:px-60'>
          <form className='px-5 py-6 md:p-8 flex flex-col gap-8 bg-white rounded-xl'>
            <h1 className='text-gray-900 text-preset-1'>Sign Up</h1>
            <div className='flex flex-col gap-4'>
              <label className='text-preset-5-bold text-gray-500'>Name</label>
              <input className='border border-beige-500 rounded-lg px-5 py-3' />
              <label className='text-preset-5-bold text-gray-500'>Email</label>
              <input className='border border-beige-500 rounded-lg px-5 py-3' />
              <div className='flex flex-col gap-4 relative'>
                <label className='text-preset-5-bold text-gray-500'>Create Password</label>
                <input
                  type={inputType}
                  className='border border-beige-500 rounded-lg px-5 py-3'></input>
                <Image
                  src={inputType === 'password' ? show_password_icon : hide_password_icon}
                  alt='show-password'
                  onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                  className='absolute bottom-5 right-5 hover:cursor-pointer'
                />
              </div>
            </div>
            <Button type='submit'>Create Account</Button>
            <span className='flex-row-center gap-2'>
              <p className='text-preset-4 text-gray-500'>Already have an account?</p>
              <Link
                href='/login'
                className='text-preset-4-bold text-gray-900 underline underline-offset-4 cursor-pointer'>
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
