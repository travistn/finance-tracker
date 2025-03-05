import Image from 'next/image';

import logo from '../../public/assets/images/logo-large.svg';
import Button from '@/components/Button';

const Login = () => {
  return (
    <div className='h-screen flex-col'>
      <div className='bg-gray-900 flex-row-center px-10 py-6 rounded-b-lg lg:hidden'>
        <Image src={logo} alt='logo' />
      </div>
      <div className='px-4 py-6 my-auto md:px-10 md:py-8'>
        <form className='px-5 py-6 md:p-8 flex-col gap-8 bg-white rounded-xl'>
          <h1 className='text-gray-900 text-preset-1'>Login</h1>
          <div className='flex-col gap-4'>
            <label className='text-preset-5-bold text-gray-500'>Email</label>
            <input className='border border-beige-500 rounded-lg px-5 py-3' />
            <label className='text-preset-5-bold text-gray-500'>Password</label>
            <input className='border border-beige-500 rounded-lg px-5 py-3' />
          </div>
          <Button type='submit'>Login</Button>
          <span className='flex-row-center gap-2'>
            <p className='text-preset-4 text-gray-500'>Need to create an account?</p>
            <p className='text-preset-4-bold text-gray-900 underline underline-offset-4 cursor-pointer'>
              Sign Up
            </p>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
