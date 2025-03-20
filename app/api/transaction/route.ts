import { NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import Transaction from '@/models/Transaction';

export const GET = async (req: any, res: any) => {
  try {
    await connectToDatabase();

    const transactions = await Transaction.find();

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get transactions' }, { status: 400 });
  }
};
