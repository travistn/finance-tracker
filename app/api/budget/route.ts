import { NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import Budget from '@/models/Budget';

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { budgetMaximum, category, theme } = body.budgetFormData;
    const newBudget = new Budget({ category, theme, maximum: budgetMaximum });

    await newBudget.save();
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create a budget' }, { status: 400 });
  }
};
