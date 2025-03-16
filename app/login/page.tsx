'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import logo from '../../public/assets/images/logo-large.svg';
import authentication_illustration from '../../public/assets/images/illustration-authentication.svg';
import show_password_icon from '../../public/assets/images/icon-show-password.svg';
import hide_password_icon from '../../public/assets/images/icon-hide-password.svg';
import google_icon from '../../public/assets/images/google-icon.svg';

const Login = () => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (!result?.error) {
        router.push('/overview');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: 'guest',
        password: '',
      });

      if (!result?.error) {
        router.push('/overview');
      }
    } catch (error) {
      console.log('Failed to log in', error);
    }
  };

  useEffect(() => {
    if (session) {
      router.push('/overview');
    }
  }, [session, router]);

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
            onSubmit={handleLogin}
            className='px-5 py-6 md:p-8 flex flex-col gap-8 bg-white rounded-xl'>
            <h1 className='text-gray-900 text-preset-1'>Login</h1>
            <div className='flex flex-col gap-4'>
              <label className='text-preset-5-bold text-gray-500'>Email</label>
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='border border-beige-500 rounded-lg px-5 py-3'
              />
              <div className='flex flex-col gap-4 relative'>
                <label className='text-preset-5-bold text-gray-500'>Password</label>
                <input
                  name='password'
                  value={formData.password}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  className='border border-beige-500 rounded-lg px-5 py-3'></input>
                <Image
                  src={showPassword ? hide_password_icon : show_password_icon}
                  alt={showPassword ? 'hide-password' : 'show-password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute bottom-5 right-5 hover:cursor-pointer'
                />
              </div>
            </div>
            <Button type='submit'>Login</Button>
            <Button
              onClick={() => signIn('google', { callbackUrl: '/overview' })}
              variant='secondary'>
              <div className='flex-row-center gap-1'>
                Login with Google
                <Image src={google_icon} alt='google-icon' className='w-[17px]' />
              </div>
            </Button>
            <div className='flex flex-col gap-4'>
              <span className='flex-row-center gap-2'>
                <p className='text-preset-4 text-gray-500'>Need to create an account?</p>
                <Link
                  href='/signup'
                  className='text-preset-4-bold text-gray-900 underline underline-offset-4 cursor-pointer'>
                  Sign Up
                </Link>
              </span>
              <span className='flex-row-center gap-2'>
                <p className='text-preset-4 text-gray-500'>Or try out the app with a </p>
                <p
                  onClick={handleGuestLogin}
                  className='text-preset-4-bold text-gray-900 underline underline-offset-4 cursor-pointer'>
                  Guest Account
                </p>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
