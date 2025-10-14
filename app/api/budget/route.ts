import { NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import Budget from '@/models/Budget';

export const GET = async () => {
  try {
    await connectToDatabase();

    const budgets = await Budget.find();
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get budgets' }, { status: 400 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { category, maximum, theme, userId } = body.budget;
    const newBudget = new Budget({ category, maximum, theme, userId });

    await newBudget.save();
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create a budget' }, { status: 400 });
  }
};
