import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import connectToDatabase from '@/lib/mongoose';
import Transaction from '@/models/Transaction';

export const GET = async () => {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    const transactions = await Transaction.find({ userId: session?.user.id });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get transactions' }, { status: 400 });
  }
};
