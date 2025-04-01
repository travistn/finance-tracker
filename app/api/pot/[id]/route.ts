import { NextRequest, NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import Pot from '@/models/Pot';

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { id, name, target, theme } = await req.json();

    const updatedPot = await Pot.findByIdAndUpdate(
      id,
      {
        name,
        target,
        theme,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPot) {
      return NextResponse.json({ success: false, message: 'Pot not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPot }, { status: 200 });
  } catch (error) {
    console.error;
    return NextResponse.json({ error: 'Failed to edit a pot' }, { status: 400 });
  }
};
