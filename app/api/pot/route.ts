import { NextResponse } from 'next/server';

import connectToDatabase from '@/lib/mongoose';
import Pot from '@/models/Pot';

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { name, target, theme, userId } = body.pot;

    const newPot = new Pot({ name, target, theme, userId });

    await newPot.save();
    return NextResponse.json(newPot, { status: 201 });
  } catch (error) {
    console.error;
    return NextResponse.json({ error: 'Failed to create a pot' }, { status: 400 });
  }
};
