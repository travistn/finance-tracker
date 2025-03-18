import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownProps {
  dropdownTrigger: string;
  dropdownMenuItems: string[];
  className?: string;
  onClick?: (e: any) => void;
}

const Dropdown = ({ dropdownTrigger, dropdownMenuItems, className, onClick }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-4 px-5 py-3 rounded-[8px] border border-beige-500 text-preset-4 text-gray-900 select-none hover:cursor-pointer ${className}`}>
        {dropdownTrigger}
        <img src={'/assets/images/icon-caret-down.svg'} alt='dropdown-arrow' className='ml-auto' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownMenuItems.map((item, index) => (
          <div key={index}>
            <DropdownMenuItem
              onClick={onClick}
              id={item}
              className={`text-gray-900 hover:cursor-pointer ${
                item === dropdownTrigger ? 'text-preset-4-bold' : 'text-preset-4'
              }`}>
              {item}
            </DropdownMenuItem>
            <DropdownMenuSeparator
              className={`${index + 1 === dropdownMenuItems.length ? 'hidden' : ''}`}
            />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
