import { NextRequest, NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import Budget from '@/models/Budget';

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { id, category, maximum, theme } = await req.json();

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      {
        category,
        maximum,
        theme,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBudget) {
      return NextResponse.json({ success: false, message: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedBudget }, { status: 200 });
  } catch (error) {
    console.error;
    return NextResponse.json({ error: 'Failed to edit a budget' }, { status: 400 });
  }
};
