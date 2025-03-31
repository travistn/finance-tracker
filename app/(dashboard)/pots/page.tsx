import Button from '@/components/Button';
import Pot from '@/components/Pot';

const Pots = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-preset-1 text-gray-900'>Pots</h1>
        <Button>+ Add New Pot</Button>
      </div>
      <Pot />
    </div>
  );
};

export default Pots;
