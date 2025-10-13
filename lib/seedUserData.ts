import Budget from '@/models/Budget';

export const seedUserData = async (userId: string) => {
  await Promise.all([
    Budget.insertMany([
      {
        _id: userId,
        category: 'Bills',
        maximum: 750,
        theme: 'cyan',
      },
      {
        _id: userId,
        category: 'Dining Out',
        maximum: 500,
        theme: 'yellow',
      },
      {
        _id: userId,
        category: 'Personal Care',
        maximum: 200,
        theme: 'navy',
      },
      {
        _id: userId,
        category: 'Education',
        maximum: 300,
        theme: 'red',
      },
    ]),
  ]);
};
