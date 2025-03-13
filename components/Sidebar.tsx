import Link from 'next/link';

const navIcons = ['overview', 'transactions', 'budgets', 'pots', 'recurring-bills'];

const Sidebar = () => {
  return (
    <div className='bg-gray-900 flex flex-col px-4 pt-2 max-xl:rounded-t-lg max-xl:px-10 xl:rounded-r-2xl xl:gap-6 xl:pb-6 xl:items-start xl:relative'>
      <img src={'/assets/images/logo-large.svg'} alt='logo' className='max-xl:hidden px-8 py-10' />
      <div className='flex flex-row justify-between items-center md:gap-10.5 xl:flex-col xl:items-start xl:gap-1 xl:pr-6'>
        {navIcons.map((icon) => (
          <Link
            href='/'
            key={icon}
            className='flex flex-col items-center gap-2 pt-2 pb-3 md:flex-1 xl:flex-row xl:gap-4 xl:px-8 xl:py-4 hover:bg-gray-50 xl:min-w-full'>
            <img src={`/assets/images/icon-nav-${icon}.svg`} alt={`nav-${icon}-icon`} />
            <p className='text-preset-5-bold text-gray-300 capitalize max-md:hidden'>
              {icon.split('-').join(' ')}
            </p>
          </Link>
        ))}
      </div>
      <div className='max-xl:hidden flex items-center gap-4 px-8 pt-4 pb-10 absolute bottom-0'>
        <img src={'/assets/images/icon-minimize-menu.svg'} />
        <p className='text-preset-3 text-gray-300'>Minimize Menu</p>
      </div>
    </div>
  );
};

export default Sidebar;
