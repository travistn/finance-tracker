'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import logo from '../../public/assets/images/logo-large.svg';
import authentication_illustration from '../../public/assets/images/illustration-authentication.svg';
import show_password_icon from '../../public/assets/images/icon-show-password.svg';
import hide_password_icon from '../../public/assets/images/icon-hide-password.svg';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = '';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const validateInputs = (name: string, value: string) => {
    let error = '';

    if (name === 'username' && value.length < 3) {
      error = 'Name must be at least 3 characters';
    }

    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Enter a valid email address';
    }

    if (name === 'password' && value.length < 8) {
      error = 'Password must be at least 8 characters';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateInputs(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    Object.keys(formData).forEach((key) =>
      validateInputs(key, formData[key as keyof typeof formData])
    );

    if (!errors.username && !errors.email && !errors.password) {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            formData,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Account successfully created!');

          router.push('/login');
        } else if (data.error) {
          alert('Email already in use. Please use another email.');

          setErrors((prevErrors) => ({
            ...prevErrors,
            email: data.error,
          }));
        }
      } catch (error) {
        console.error('Failed to create user', error);
      }
    }
  };

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
          <form
            onSubmit={handleSubmit}
            className='px-5 py-6 md:p-8 flex flex-col gap-8 bg-white rounded-xl'>
            <h1 className='text-gray-900 text-preset-1'>Sign Up</h1>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-4 relative'>
                <label className='text-preset-5-bold text-gray-500'>Name</label>
                <input
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  className={`border border-beige-500 rounded-lg px-5 py-3 ${
                    errors.username ? 'border-red' : ''
                  }`}
                />
                {errors.username && (
                  <p className={`text-preset-5 text-gray-500 absolute -bottom-6 right-0`}>
                    {errors.username}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-4 relative'>
                <label className='text-preset-5-bold text-gray-500'>Email</label>
                <input
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`border border-beige-500 rounded-lg px-5 py-3 ${
                    errors.email ? 'border-red' : ''
                  }`}
                />
                {errors.email && (
                  <p className={`text-preset-5 text-gray-500 absolute -bottom-6 right-0`}>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-4 relative'>
                <label className='text-preset-5-bold text-gray-500'>Create Password</label>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`border border-beige-500 rounded-lg px-5 py-3 ${
                    errors.password ? 'border-red' : ''
                  }`}
                />
                <Image
                  src={showPassword ? hide_password_icon : show_password_icon}
                  alt={showPassword ? 'hide-password' : 'show-password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute bottom-5 right-5 hover:cursor-pointer'
                />
                {errors.password && (
                  <p className='text-preset-5 text-gray-500 text-right absolute -bottom-6 right-0'>
                    {errors.password}
                  </p>
                )}
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
