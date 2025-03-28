import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { BudgetType } from '@/types';
import { useBudgetStore } from '@/store/useBudgetStore';

interface DeleteDialogProps {
  budget?: BudgetType;
}

const DeleteDialog = ({ budget }: DeleteDialogProps) => {
  const { deleteBudget } = useBudgetStore();

  const handleDelete = () => {
    if (budget) {
      if (!budget || !budget._id) {
        console.error('Budget ID is missing or invalid');
        return;
      }
      deleteBudget(budget._id);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className='text-preset-4 text-red hover:cursor-pointer hover:opacity-85'
        asChild>
        <p className='text-preset-4 text-red hover:cursor-pointer hover:opacity-85'>
          {`Delete ${budget ? 'Budget' : ''}`}
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent className='flex flex-col gap-5 px-5 py-6 md:p-8'>
        <AlertDialogHeader className='flex flex-col gap-3'>
          <AlertDialogTitle className='text-[20px] text-gray-900 text-left leading-[1.2] md:text-[32px]'>{`Delete ${
            budget ? `'${budget.category}'` : ''
          }?`}</AlertDialogTitle>
          <AlertDialogDescription className='text-left text-preset-4 text-gray-500'>
            Are you sure you want to delete this budget? This action cannot be reversed, and all the
            data inside it will be removed forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-6 max-md:gap-4'>
          <AlertDialogCancel className='hover:cursor-pointer flex-1'>
            No, I want to go back
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-red hover:bg-red/85 hover:cursor-pointer flex-1'>
            Yes, Confirm Deletion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
