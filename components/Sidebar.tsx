import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

import Icons from '../constants/Icons';

const menuItems = [
  { name: 'overview', path: '/overview' },
  { name: 'transactions', path: '/transactions' },
  { name: 'budgets', path: '/budgets' },
  { name: 'pots', path: '/pots' },
  { name: 'recurring-bills', path: '/recurring-bills' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [minimizeMenu, setMinimizeMenu] = useState(false);

  return (
    <motion.div
      animate={{ width: minimizeMenu ? 80 : '' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className='bg-gray-900 flex flex-col pt-2 max-xl:rounded-t-lg max-xl:px-10 xl:rounded-r-2xl xl:gap-6 xl:pb-6 xl:items-start'>
      <img
        src={`/assets/images/logo-${!minimizeMenu ? 'large' : 'small'}.svg`}
        alt='logo'
        className='max-xl:hidden px-8 py-10 hover:cursor-pointer'
        onClick={() => router.push('/overview')}
      />
      <div
        className={`flex flex-row justify-between items-center md:gap-10.5 xl:flex-col xl:items-start xl:gap-1 ${
          minimizeMenu ? 'xl:pr-2' : 'xl:pr-6'
        }`}>
        {menuItems.map((item) => (
          <div key={item.name} className='group/sidebar w-full'>
            <Link
              href={item.path}
              className={`flex flex-col items-center gap-2 pt-2 pb-3 flex-1 max-xl:rounded-t-lg max-xl:border-b-4 xl:flex-row xl:gap-4 xl:pl-6 xl:py-4 xl:rounded-r-xl xl:border-l-4 transition ease-in-out duration-300 ${
                pathname === item.path
                  ? 'bg-beige-100 border-green'
                  : 'group-hover/sidebar:xl:bg-beige-100 group-hover/sidebar:xl:border-green'
              } ${minimizeMenu ? 'xl:pr-6' : 'xl:pr-20'}`}>
              <div
                role='img'
                aria-label={`nav-${item.name}-icon`}
                className={`text-gray-300 ${
                  pathname === item.path ? 'text-green' : 'group-hover/sidebar:text-green'
                }`}>
                {Icons[item.name as keyof typeof Icons]}
              </div>
              <p
                className={`text-preset-5-bold text-gray-300 capitalize truncate max-md:hidden ${
                  pathname === item.path ? 'text-gray-900' : 'group-hover/sidebar:xl:text-gray-900'
                } ${minimizeMenu ? 'xl:hidden' : ''}`}>
                {item.name.split('-').join(' ')}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div
        className='max-xl:hidden flex items-center gap-4 px-8 pt-4 pb-10 absolute bottom-0 select-none hover:cursor-pointer'
        onClick={() => setMinimizeMenu(!minimizeMenu)}>
        <img
          src={'/assets/images/icon-minimize-menu.svg'}
          alt='minimize-menu'
          className={`${minimizeMenu ? 'scale-x-[-1]' : ''}`}
        />
        <p className='text-preset-3 text-gray-300'>{minimizeMenu ? '' : 'Minimize Menu'}</p>
      </div>
    </motion.div>
  );
};

export default Sidebar;
