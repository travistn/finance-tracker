import User from '@/models/User';
import { deleteUserData } from './deleteUserData';

export const cleanupExpiredGuests = async () => {
  const expiredUsers = await User.find({ expireAt: { $lte: new Date() } });

  for (const user of expiredUsers) {
    await deleteUserData(user._id);
  }
};
