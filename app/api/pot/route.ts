import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import connectToDatabase from '@/lib/mongoose';
import Pot from '@/models/Pot';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const GET = async () => {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    const pots = await Pot.find({ userId: session?.user.id });

    return NextResponse.json(pots, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get pots' }, { status: 400 });
  }
};

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
