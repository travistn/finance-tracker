import User from '@/models/User';
import Budget from '@/models/Budget';
import Transaction from '@/models/Transaction';
import Pot from '@/models/Pot';

export const deleteUserData = async (userId: string) => {
  await Promise.all([
    Budget.deleteMany({ userId }),
    Transaction.deleteMany({ userId }),
    Pot.deleteMany({ userId }),
  ]);
  await User.findByIdAndDelete(userId);
};
